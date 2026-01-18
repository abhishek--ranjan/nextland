import fs from "fs";
import path from "path";

/**
 * Schema Utilities for Data Validation and Record Creation
 * Provides schema-based record creation and validation
 */

/**
 * Get schema for a specific entity type
 * @param {string} entityType - Entity type (notice, document, event, etc.)
 * @returns {object|null} Schema object or null if not found
 */
export function getSchema(entityType) {
  try {
    const schemaPath = path.join(process.cwd(), "data", "schemas", `${entityType}.json`);
    if (!fs.existsSync(schemaPath)) {
      console.warn(`Schema not found for: ${entityType}`);
      return null;
    }
    const schemaContent = fs.readFileSync(schemaPath, "utf8");
    return JSON.parse(schemaContent);
  } catch (error) {
    console.error(`Error reading schema for ${entityType}:`, error);
    return null;
  }
}

/**
 * Create a new record from schema with provided data
 * @param {string} entityType - Entity type (notice, document, event, etc.)
 * @param {object} data - Data to merge with schema
 * @returns {object} Merged record with schema defaults
 */
export function createFromSchema(entityType, data = {}) {
  const schema = getSchema(entityType);
  if (!schema) {
    // Fallback: return data as-is if no schema found
    return data;
  }

  // Deep merge: schema provides defaults, data overrides
  const record = { ...schema };
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      record[key] = data[key];
    }
  });

  // Auto-generate timestamps if not provided
  const now = new Date().toISOString();
  if (record.createdAt !== undefined && !record.createdAt) {
    record.createdAt = now;
  }
  if (record.updatedAt !== undefined && !record.updatedAt) {
    record.updatedAt = now;
  }

  return record;
}

/**
 * Validate a record against its schema
 * @param {string} entityType - Entity type
 * @param {object} record - Record to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
export function validateRecord(entityType, record) {
  const schema = getSchema(entityType);
  if (!schema) {
    return { valid: true, errors: [] }; // No schema = no validation
  }

  const errors = [];

  // Check for required fields (fields that are not null/undefined in schema)
  Object.keys(schema).forEach(key => {
    // Skip validation for optional fields (null in schema)
    if (schema[key] === null) {
      return;
    }

    // Check if required field exists and is not empty
    if (record[key] === undefined || record[key] === null || record[key] === '') {
      errors.push(`Missing required field: ${key}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get required fields from schema
 * @param {string} entityType - Entity type
 * @returns {string[]} Array of required field names
 */
export function getRequiredFields(entityType) {
  const schema = getSchema(entityType);
  if (!schema) {
    return [];
  }

  return Object.keys(schema).filter(key => schema[key] !== null);
}

/**
 * Sanitize record by removing fields not in schema
 * @param {string} entityType - Entity type
 * @param {object} record - Record to sanitize
 * @returns {object} Sanitized record
 */
export function sanitizeRecord(entityType, record) {
  const schema = getSchema(entityType);
  if (!schema) {
    return record; // No schema = return as-is
  }

  const sanitized = {};
  Object.keys(schema).forEach(key => {
    if (record[key] !== undefined) {
      sanitized[key] = record[key];
    }
  });

  return sanitized;
}
