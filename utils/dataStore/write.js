import fs from "fs";
import path from "path";
import { getDataPath } from "../dataHelper.js";
import { getMasterRecords } from "./read.js";
import { logAudit } from "./audit.js";

/**
 * Data Store - Write Operations
 * Single source of truth for all WRITE operations
 * Never write JSON files directly from components - use these functions
 */

/**
 * Write JSON file safely
 * @param {string} filePath - Absolute path to JSON file
 * @param {object|array} data - Data to write
 * @returns {boolean} Success status
 */
function writeJson(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

/**
 * Update master file
 * @param {string} section - Section name
 * @param {array} records - Array of summary records
 * @returns {boolean} Success status
 */
function updateMaster(section, records) {
  const masterFile = section === "notices" ? "notice-master.json" : "master.json";
  const masterPath = path.join(getDataPath(section), masterFile);
  return writeJson(masterPath, records);
}

/**
 * Create a new record
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} data - Record data
 * @param {object} user - User who created the record
 * @returns {boolean} Success status
 */
export function createRecord(section, id, data, user = {}) {
  try {
    // Add metadata
    const record = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      createdBy: user.username || "system",
      updatedAt: new Date().toISOString(),
      updatedBy: user.username || "system",
    };

    // Write full record
    const recordPath = path.join(getDataPath(section), `${id}.json`);
    if (!writeJson(recordPath, record)) {
      return false;
    }

    // Update master with summary
    const master = getMasterRecords(section);
    const summary = extractSummary(section, record);
    master.push(summary);
    updateMaster(section, master);

    // Log audit
    logAudit({
      action: "CREATE",
      section,
      recordId: id,
      user: user.username || "system",
      timestamp: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error(`Error creating record ${id}:`, error);
    return false;
  }
}

/**
 * Update an existing record
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} updates - Updates to apply
 * @param {object} user - User who updated the record
 * @returns {boolean} Success status
 */
export function updateRecord(section, id, updates, user = {}) {
  try {
    const recordPath = path.join(getDataPath(section), `${id}.json`);
    const existing = JSON.parse(fs.readFileSync(recordPath, "utf8"));

    // Merge updates
    const updated = {
      ...existing,
      ...updates,
      id, // Ensure ID doesn't change
      createdAt: existing.createdAt, // Preserve creation time
      createdBy: existing.createdBy, // Preserve creator
      updatedAt: new Date().toISOString(),
      updatedBy: user.username || "system",
    };

    // Write updated record
    if (!writeJson(recordPath, updated)) {
      return false;
    }

    // Update master
    const master = getMasterRecords(section);
    const index = master.findIndex((item) => item.id === id);
    if (index !== -1) {
      master[index] = extractSummary(section, updated);
      updateMaster(section, master);
    }

    // Log audit
    logAudit({
      action: "UPDATE",
      section,
      recordId: id,
      user: user.username || "system",
      timestamp: new Date().toISOString(),
      changes: Object.keys(updates),
    });

    return true;
  } catch (error) {
    console.error(`Error updating record ${id}:`, error);
    return false;
  }
}

/**
 * Bulk create records
 * @param {string} section - Section name
 * @param {array} records - Array of records with id and data
 * @param {object} user - User who created the records
 * @returns {object} { success: number, failed: number }
 */
export function bulkCreateRecords(section, records, user = {}) {
  let success = 0;
  let failed = 0;

  records.forEach(({ id, data }) => {
    if (createRecord(section, id, data, user)) {
      success++;
    } else {
      failed++;
    }
  });

  return { success, failed };
}

/**
 * Update config
 * @param {object} updates - Config updates
 * @param {object} user - User who updated config
 * @returns {boolean} Success status
 */
export function updateConfig(updates, user = {}) {
  try {
    const configPath = path.join(process.cwd(), "data", "config", "config.json");
    const existing = JSON.parse(fs.readFileSync(configPath, "utf8"));

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const success = writeJson(configPath, updated);

    if (success) {
      logAudit({
        action: "UPDATE_CONFIG",
        user: user.username || "system",
        timestamp: new Date().toISOString(),
        changes: Object.keys(updates),
      });
    }

    return success;
  } catch (error) {
    console.error("Error updating config:", error);
    return false;
  }
}

/**
 * Extract summary from full record
 * @param {string} section - Section name
 * @param {object} record - Full record
 * @returns {object} Summary object
 */
function extractSummary(section, record) {
  const base = {
    id: record.id,
    title: record.title || record.name || record.designation,
    date: record.date,
  };

  // Section-specific fields
  if (section === "committee") {
    return {
      id: record.id,
      designation: record.designation,
      name: record.name,
      term: record.term,
    };
  }

  if (section === "events" || section === "documents" || section === "notices") {
    return {
      ...base,
      category: record.category,
    };
  }

  if (section === "gallery") {
    return {
      id: record.id,
      title: record.title,
      date: record.date,
    };
  }

  return base;
}

/**
 * Update contact info
 * @param {object} updates - Contact updates
 * @param {object} user - User who updated contact
 * @returns {boolean} Success status
 */
export function updateContact(updates, user = {}) {
  try {
    const contactPath = path.join(getDataPath("contact"), "contact.json");
    const success = writeJson(contactPath, updates);

    if (success) {
      logAudit({
        action: "UPDATE_CONTACT",
        user: user.username || "system",
        timestamp: new Date().toISOString(),
      });
    }

    return success;
  } catch (error) {
    console.error("Error updating contact:", error);
    return false;
  }
}

/**
 * Create or update a user
 * @param {object} userData - User data (username, email, passwordHash, role)
 * @param {object} currentUser - User performing the operation
 * @returns {boolean} Success status
 */
export function upsertUser(userData, currentUser = {}) {
  try {
    const usersPath = path.join(getDataPath("auth"), "users.json");
    const existingUsers = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");

    // Check if user exists
    const userIndex = existingUsers.findIndex((u) => u.username === userData.username);

    if (userIndex !== -1) {
      // Update existing user
      existingUsers[userIndex] = {
        ...existingUsers[userIndex],
        ...userData,
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Create new user
      existingUsers.push({
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
      });
    }

    const success = writeJson(usersPath, existingUsers);

    if (success) {
      logAudit({
        action: userIndex !== -1 ? "UPDATE_USER" : "CREATE_USER",
        user: currentUser.username || "system",
        targetUser: userData.username,
        timestamp: new Date().toISOString(),
      });
    }

    return success;
  } catch (error) {
    console.error("Error upserting user:", error);
    return false;
  }
}

/**
 * Delete a user
 * @param {string} username - Username to delete
 * @param {object} currentUser - User performing the operation
 * @returns {boolean} Success status
 */
export function deleteUser(username, currentUser = {}) {
  try {
    const usersPath = path.join(getDataPath("auth"), "users.json");
    const existingUsers = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");

    const updatedUsers = existingUsers.filter((u) => u.username !== username);

    if (updatedUsers.length === existingUsers.length) {
      // User not found
      return false;
    }

    const success = writeJson(usersPath, updatedUsers);

    if (success) {
      logAudit({
        action: "DELETE_USER",
        user: currentUser.username || "system",
        targetUser: username,
        timestamp: new Date().toISOString(),
      });
    }

    return success;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}
