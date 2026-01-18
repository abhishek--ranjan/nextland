import fs from "fs";
import path from "path";
import { getDataPath } from "../dataHelper.js";
import { getMasterRecords, getRecordById } from "./read.js";
import { logAudit } from "./audit.js";

/**
 * Data Store - Delete Operations
 * Single source of truth for all DELETE operations
 * Never delete files directly from components - use these functions
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
 * Soft delete a record (move to deleted folder)
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} user - User who deleted the record
 * @returns {boolean} Success status
 */
export function deleteRecord(section, id, user = {}) {
  try {
    // Get the record
    const record = getRecordById(section, id);
    if (!record) {
      console.error(`Record ${id} not found`);
      return false;
    }

    // Add deletion metadata
    const deletedRecord = {
      ...record,
      deletedAt: new Date().toISOString(),
      deletedBy: user.username || "system",
      deletionReason: user.reason || "",
    };

    // Move to deleted folder
    const deletedPath = path.join(getDataPath(section), "deleted", `${id}.json`);
    if (!writeJson(deletedPath, deletedRecord)) {
      return false;
    }

    // Remove from master
    const master = getMasterRecords(section);
    const updatedMaster = master.filter((item) => item.id !== id);
    updateMaster(section, updatedMaster);

    // Delete the original file
    const recordPath = path.join(getDataPath(section), `${id}.json`);
    if (fs.existsSync(recordPath)) {
      fs.unlinkSync(recordPath);
    }

    // Log audit
    logAudit({
      action: "DELETE",
      section,
      recordId: id,
      user: user.username || "system",
      timestamp: new Date().toISOString(),
      reason: user.reason || "",
    });

    return true;
  } catch (error) {
    console.error(`Error deleting record ${id}:`, error);
    return false;
  }
}

/**
 * Permanently delete a record (hard delete from deleted folder)
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} user - User who permanently deleted the record
 * @returns {boolean} Success status
 */
export function permanentlyDeleteRecord(section, id, user = {}) {
  try {
    const deletedPath = path.join(getDataPath(section), "deleted", `${id}.json`);
    
    if (!fs.existsSync(deletedPath)) {
      console.error(`Deleted record ${id} not found`);
      return false;
    }

    // Read record for audit
    const record = JSON.parse(fs.readFileSync(deletedPath, "utf8"));

    // Delete the file permanently
    fs.unlinkSync(deletedPath);

    // Log audit
    logAudit({
      action: "PERMANENT_DELETE",
      section,
      recordId: id,
      user: user.username || "system",
      timestamp: new Date().toISOString(),
      previouslyDeletedBy: record.deletedBy,
      previouslyDeletedAt: record.deletedAt,
    });

    return true;
  } catch (error) {
    console.error(`Error permanently deleting record ${id}:`, error);
    return false;
  }
}

/**
 * Restore a deleted record
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} user - User who restored the record
 * @returns {boolean} Success status
 */
export function restoreRecord(section, id, user = {}) {
  try {
    const deletedPath = path.join(getDataPath(section), "deleted", `${id}.json`);
    
    if (!fs.existsSync(deletedPath)) {
      console.error(`Deleted record ${id} not found`);
      return false;
    }

    // Read deleted record
    const record = JSON.parse(fs.readFileSync(deletedPath, "utf8"));

    // Remove deletion metadata and add restoration metadata
    const { deletedAt, deletedBy, deletionReason, ...restoredRecord } = record;
    restoredRecord.restoredAt = new Date().toISOString();
    restoredRecord.restoredBy = user.username || "system";

    // Restore to main folder
    const recordPath = path.join(getDataPath(section), `${id}.json`);
    if (!writeJson(recordPath, restoredRecord)) {
      return false;
    }

    // Update master
    const master = getMasterRecords(section);
    const summary = extractSummary(section, restoredRecord);
    master.push(summary);
    updateMaster(section, master);

    // Delete from deleted folder
    fs.unlinkSync(deletedPath);

    // Log audit
    logAudit({
      action: "RESTORE",
      section,
      recordId: id,
      user: user.username || "system",
      timestamp: new Date().toISOString(),
      previouslyDeletedBy: deletedBy,
      previouslyDeletedAt: deletedAt,
    });

    return true;
  } catch (error) {
    console.error(`Error restoring record ${id}:`, error);
    return false;
  }
}

/**
 * Bulk delete records
 * @param {string} section - Section name
 * @param {array} ids - Array of record IDs
 * @param {object} user - User who deleted the records
 * @returns {object} { success: number, failed: number }
 */
export function bulkDeleteRecords(section, ids, user = {}) {
  let success = 0;
  let failed = 0;

  ids.forEach((id) => {
    if (deleteRecord(section, id, user)) {
      success++;
    } else {
      failed++;
    }
  });

  return { success, failed };
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
 * Clean up old deleted records (older than specified days)
 * @param {string} section - Section name
 * @param {number} daysOld - Number of days
 * @param {object} user - User who triggered cleanup
 * @returns {number} Number of records cleaned up
 */
export function cleanupOldDeletedRecords(section, daysOld = 90, user = {}) {
  try {
    const deletedDir = path.join(getDataPath(section), "deleted");
    if (!fs.existsSync(deletedDir)) {
      return 0;
    }

    const files = fs.readdirSync(deletedDir).filter((f) => f.endsWith(".json"));
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    let cleaned = 0;

    files.forEach((file) => {
      const filePath = path.join(deletedDir, file);
      const record = JSON.parse(fs.readFileSync(filePath, "utf8"));
      
      if (new Date(record.deletedAt) < cutoffDate) {
        fs.unlinkSync(filePath);
        cleaned++;
      }
    });

    if (cleaned > 0) {
      logAudit({
        action: "CLEANUP_DELETED",
        section,
        user: user.username || "system",
        timestamp: new Date().toISOString(),
        recordsCleaned: cleaned,
        daysOld,
      });
    }

    return cleaned;
  } catch (error) {
    console.error("Error cleaning up deleted records:", error);
    return 0;
  }
}
