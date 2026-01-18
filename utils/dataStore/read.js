import fs from "fs";
import path from "path";
import { getDataPath } from "../dataHelper.js";

/**
 * Data Store - Read Operations
 * Single source of truth for all READ operations
 * Never read JSON files directly from components - use these functions
 */

/**
 * Read a JSON file safely
 * @param {string} filePath - Absolute path to JSON file
 * @returns {object|array|null} Parsed JSON or null
 */
export function readJson(filePath) {
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
 * Get all records from master file
 * @param {string} section - Section name (committee, documents, events, etc.)
 * @returns {array} Array of summary records
 */
export function getMasterRecords(section) {
  const masterFile = section === "notices" ? "notice-master.json" : "master.json";
  const masterPath = path.join(getDataPath(section), masterFile);
  return readJson(masterPath) || [];
}

/**
 * Get a single record by ID
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @returns {object|null} Full record or null
 */
export function getRecordById(section, id) {
  const recordPath = path.join(getDataPath(section), `${id}.json`);
  return readJson(recordPath);
}

/**
 * Get multiple records by IDs
 * @param {string} section - Section name
 * @param {array} ids - Array of record IDs
 * @returns {array} Array of records (non-null)
 */
export function getRecordsByIds(section, ids) {
  return ids
    .map((id) => getRecordById(section, id))
    .filter((record) => record !== null);
}

/**
 * Get all records with full details
 * @param {string} section - Section name
 * @returns {array} Array of full records
 */
export function getAllRecords(section) {
  const master = getMasterRecords(section);
  return master
    .map((item) => getRecordById(section, item.id))
    .filter((record) => record !== null);
}

/**
 * Search records by query
 * @param {string} section - Section name
 * @param {function} filterFn - Filter function (record => boolean)
 * @returns {array} Filtered array of records
 */
export function searchRecords(section, filterFn) {
  const records = getAllRecords(section);
  return records.filter(filterFn);
}

/**
 * Get records by category
 * @param {string} section - Section name
 * @param {string} category - Category name
 * @returns {array} Array of records matching category
 */
export function getRecordsByCategory(section, category) {
  return searchRecords(section, (record) => record.category === category);
}

/**
 * Get records by date range
 * @param {string} section - Section name
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {array} Array of records within date range
 */
export function getRecordsByDateRange(section, startDate, endDate) {
  return searchRecords(section, (record) => {
    return record.date >= startDate && record.date <= endDate;
  });
}

/**
 * Get recently deleted records
 * @param {string} section - Section name
 * @returns {array} Array of deleted records
 */
export function getDeletedRecords(section) {
  const deletedDir = path.join(getDataPath(section), "deleted");
  if (!fs.existsSync(deletedDir)) {
    return [];
  }
  
  const files = fs.readdirSync(deletedDir).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => readJson(path.join(deletedDir, file)))
    .filter((record) => record !== null);
}

/**
 * Get paginated records
 * @param {string} section - Section name
 * @param {number} page - Page number (1-based)
 * @param {number} pageSize - Records per page
 * @returns {object} { records, total, page, pageSize, totalPages }
 */
export function getPaginatedRecords(section, page = 1, pageSize = 10) {
  const allRecords = getAllRecords(section);
  const total = allRecords.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const records = allRecords.slice(start, end);
  
  return {
    records,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Check if record exists
 * @param {string} section - Section name
 * @param {string} id - Record ID
 * @returns {boolean} True if record exists
 */
export function recordExists(section, id) {
  const recordPath = path.join(getDataPath(section), `${id}.json`);
  return fs.existsSync(recordPath);
}

/**
 * Get config
 * @returns {object|null} Config object
 */
export function getConfig() {
  const configPath = path.join(process.cwd(), "data", "config", "config.json");
  return readJson(configPath);
}

/**
 * Get users
 * @returns {array} Array of users
 */
export function getUsers() {
  const usersPath = path.join(getDataPath("auth"), "users.json");
  return readJson(usersPath) || [];
}

/**
 * Get user by username
 * @param {string} username - Username
 * @returns {object|null} User object or null
 */
export function getUserByUsername(username) {
  const users = getUsers();
  return users.find((user) => user.username === username) || null;
}

/**
 * Get contact info
 * @returns {object|null} Contact object
 */
export function getContact() {
  const contactPath = path.join(getDataPath("contact"), "contact.json");
  return readJson(contactPath);
}
