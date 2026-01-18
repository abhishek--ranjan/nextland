import fs from "fs";
import path from "path";

/**
 * Data Helper Utility for Nextland CMS
 * Handles mode-based data loading (demo vs production)
 */

/**
 * Get the current mode from config
 * @returns {string} "demo" or "production"
 */
export function getDataMode() {
  try {
    const configPath = path.join(process.cwd(), "data", "config", "config.json");
    if (!fs.existsSync(configPath)) {
      return "demo"; // Default to demo if no config exists
    }
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    // Support both "production" and "prod" modes
    const mode = config.mode;
    if (mode === "production" || mode === "prod") {
      return "prod"; // Always use "prod" folder
    }
    return "demo";
  } catch (error) {
    console.error("Error reading config:", error);
    return "demo";
  }
}

/**
 * Get the base data path based on current mode
 * @param {string} section - Section name (auth, committee, documents, etc.)
 * @returns {string} Absolute path to the data folder
 */
export function getDataPath(section = "") {
  const mode = getDataMode();
  const basePath = path.join(process.cwd(), "data", mode);
  return section ? path.join(basePath, section) : basePath;
}

/**
 * Get the config file path
 * @returns {string} Absolute path to config.json
 */
export function getConfigPath() {
  return path.join(process.cwd(), "data", "config", "config.json");
}

/**
 * Read a JSON file with error handling
 * @param {string} filePath - Absolute path to the JSON file
 * @returns {object|array|null} Parsed JSON or null if error
 */
export function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Write a JSON file with error handling
 * @param {string} filePath - Absolute path to the JSON file
 * @param {object|array} data - Data to write
 * @returns {boolean} Success status
 */
export function writeJsonFile(filePath, data) {
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
 * Get master file for a section
 * @param {string} section - Section name (committee, documents, events, etc.)
 * @returns {array} Array of records or empty array
 */
export function getMaster(section) {
  const masterFile = section === "notices" ? "notice-master.json" : "master.json";
  const masterPath = path.join(getDataPath(section), masterFile);
  return readJsonFile(masterPath) || [];
}

/**
 * Get a single record by ID
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @returns {object|null} Record or null
 */
export function getRecord(section, id) {
  const recordPath = path.join(getDataPath(section), `${id}.json`);
  return readJsonFile(recordPath);
}

/**
 * Save a record
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} data - Record data
 * @returns {boolean} Success status
 */
export function saveRecord(section, id, data) {
  const recordPath = path.join(getDataPath(section), `${id}.json`);
  return writeJsonFile(recordPath, data);
}

/**
 * Update master file
 * @param {string} section - Section name
 * @param {array} records - Array of records
 * @returns {boolean} Success status
 */
export function updateMaster(section, records) {
  const masterFile = section === "notices" ? "notice-master.json" : "master.json";
  const masterPath = path.join(getDataPath(section), masterFile);
  return writeJsonFile(masterPath, records);
}

/**
 * Delete a record (soft delete)
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @param {object} deletedBy - User info who deleted
 * @returns {boolean} Success status
 */
export function deleteRecord(section, id, deletedBy = {}) {
  try {
    // Get the record
    const record = getRecord(section, id);
    if (!record) return false;

    // Add deletion metadata
    const deletedRecord = {
      ...record,
      deletedAt: new Date().toISOString(),
      deletedBy: deletedBy,
    };

    // Move to deleted folder
    const deletedPath = path.join(getDataPath(section), "deleted", `${id}.json`);
    writeJsonFile(deletedPath, deletedRecord);

    // Remove from master
    const master = getMaster(section);
    const updatedMaster = master.filter((item) => item.id !== id);
    updateMaster(section, updatedMaster);

    // Delete the original file
    const recordPath = path.join(getDataPath(section), `${id}.json`);
    if (fs.existsSync(recordPath)) {
      fs.unlinkSync(recordPath);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting record ${id}:`, error);
    return false;
  }
}

/**
 * Generate a unique ID for a section
 * @param {string} prefix - Prefix (EVT, DOC, COM, etc.)
 * @returns {string} Unique ID
 */
export function generateId(prefix) {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:T]/g, "")
    .slice(0, 14); // YYYYMMDDHHMMSS
  return `${prefix}-${timestamp}`;
}

/**
 * Check if setup is complete
 * @returns {boolean} True if setup exists, false otherwise
 */
export function isSetupComplete() {
  const config = readJsonFile(getConfigPath());
  return config && config.societyName && config.mode === "production";
}
