/**
 * Data Store - Single Service Layer
 * Central export point for all data operations
 * 
 * NEVER write JSON files directly from components
 * ALWAYS use these functions for data operations
 */

// Read operations
export {
  readJson,
  getMasterRecords,
  getRecordById,
  getRecordsByIds,
  getAllRecords,
  searchRecords,
  getRecordsByCategory,
  getRecordsByDateRange,
  getDeletedRecords,
  getPaginatedRecords,
  recordExists,
  getConfig,
  getUsers,
  getUserByUsername,
  getContact,
} from "./read.js";

// Write operations
export {
  createRecord,
  updateRecord,
  bulkCreateRecords,
  updateConfig,
  updateContact,
  upsertUser,
  deleteUser,
} from "./write.js";

// Delete operations
export {
  deleteRecord,
  permanentlyDeleteRecord,
  restoreRecord,
  bulkDeleteRecords,
  cleanupOldDeletedRecords,
} from "./delete.js";

// Audit operations
export {
  logAudit,
  getAuditLogs,
  getRecordAuditHistory,
  getAuditLogsByUser,
  getAuditLogsByAction,
  getAuditLogsByDateRange,
  getAuditSummary,
  archiveOldAuditLogs,
  clearAuditLogs,
} from "./audit.js";

// Schema operations
export {
  getSchema,
  createFromSchema,
  validateRecord,
  getRequiredFields,
  sanitizeRecord,
} from "./schema.js";
