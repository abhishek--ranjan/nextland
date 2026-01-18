import fs from "fs";
import path from "path";

/**
 * Data Store - Audit Operations
 * Track all data operations for security and compliance
 */

const AUDIT_LOG_PATH = path.join(process.cwd(), "data", "audit.log");

/**
 * Log an audit entry
 * @param {object} entry - Audit entry
 * @returns {boolean} Success status
 */
export function logAudit(entry) {
  try {
    const timestamp = entry.timestamp || new Date().toISOString();
    const logEntry = {
      timestamp,
      ...entry,
    };

    const logLine = JSON.stringify(logEntry) + "\n";

    // Append to audit log
    fs.appendFileSync(AUDIT_LOG_PATH, logLine, "utf8");

    return true;
  } catch (error) {
    console.error("Error logging audit:", error);
    return false;
  }
}

/**
 * Get audit logs for a specific section
 * @param {string} section - Section name
 * @param {number} limit - Max number of entries to return
 * @returns {array} Array of audit entries
 */
export function getAuditLogs(section = null, limit = 100) {
  try {
    if (!fs.existsSync(AUDIT_LOG_PATH)) {
      return [];
    }

    const content = fs.readFileSync(AUDIT_LOG_PATH, "utf8");
    const lines = content.trim().split("\n").filter((line) => line);

    let entries = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((entry) => entry !== null);

    // Filter by section if provided
    if (section) {
      entries = entries.filter((entry) => entry.section === section);
    }

    // Sort by timestamp (newest first)
    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Limit results
    return entries.slice(0, limit);
  } catch (error) {
    console.error("Error reading audit logs:", error);
    return [];
  }
}

/**
 * Get audit logs for a specific record
 * @param {string} section - Section name
 * @param {string} recordId - Record ID
 * @returns {array} Array of audit entries for the record
 */
export function getRecordAuditHistory(section, recordId) {
  try {
    const allLogs = getAuditLogs(section, 10000);
    return allLogs.filter((entry) => entry.recordId === recordId);
  } catch (error) {
    console.error("Error getting record audit history:", error);
    return [];
  }
}

/**
 * Get audit logs by user
 * @param {string} username - Username
 * @param {number} limit - Max number of entries
 * @returns {array} Array of audit entries by user
 */
export function getAuditLogsByUser(username, limit = 100) {
  try {
    const allLogs = getAuditLogs(null, 10000);
    const userLogs = allLogs.filter((entry) => entry.user === username);
    return userLogs.slice(0, limit);
  } catch (error) {
    console.error("Error getting user audit logs:", error);
    return [];
  }
}

/**
 * Get audit logs by action type
 * @param {string} action - Action type (CREATE, UPDATE, DELETE, etc.)
 * @param {number} limit - Max number of entries
 * @returns {array} Array of audit entries
 */
export function getAuditLogsByAction(action, limit = 100) {
  try {
    const allLogs = getAuditLogs(null, 10000);
    const actionLogs = allLogs.filter((entry) => entry.action === action);
    return actionLogs.slice(0, limit);
  } catch (error) {
    console.error("Error getting action audit logs:", error);
    return [];
  }
}

/**
 * Get audit logs by date range
 * @param {string} startDate - Start date (ISO string)
 * @param {string} endDate - End date (ISO string)
 * @returns {array} Array of audit entries within date range
 */
export function getAuditLogsByDateRange(startDate, endDate) {
  try {
    const allLogs = getAuditLogs(null, 100000);
    return allLogs.filter((entry) => {
      return entry.timestamp >= startDate && entry.timestamp <= endDate;
    });
  } catch (error) {
    console.error("Error getting audit logs by date range:", error);
    return [];
  }
}

/**
 * Get audit summary (counts by action type)
 * @param {string} section - Optional section filter
 * @returns {object} Summary object with counts
 */
export function getAuditSummary(section = null) {
  try {
    const logs = getAuditLogs(section, 100000);
    
    const summary = {
      total: logs.length,
      byAction: {},
      byUser: {},
      bySection: {},
    };

    logs.forEach((entry) => {
      // Count by action
      summary.byAction[entry.action] = (summary.byAction[entry.action] || 0) + 1;
      
      // Count by user
      summary.byUser[entry.user] = (summary.byUser[entry.user] || 0) + 1;
      
      // Count by section
      if (entry.section) {
        summary.bySection[entry.section] = (summary.bySection[entry.section] || 0) + 1;
      }
    });

    return summary;
  } catch (error) {
    console.error("Error getting audit summary:", error);
    return { total: 0, byAction: {}, byUser: {}, bySection: {} };
  }
}

/**
 * Archive old audit logs (move to backup)
 * @param {number} daysOld - Number of days
 * @returns {boolean} Success status
 */
export function archiveOldAuditLogs(daysOld = 90) {
  try {
    if (!fs.existsSync(AUDIT_LOG_PATH)) {
      return true;
    }

    const content = fs.readFileSync(AUDIT_LOG_PATH, "utf8");
    const lines = content.trim().split("\n").filter((line) => line);

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const recentLines = [];
    const archivedLines = [];

    lines.forEach((line) => {
      try {
        const entry = JSON.parse(line);
        if (new Date(entry.timestamp) >= cutoffDate) {
          recentLines.push(line);
        } else {
          archivedLines.push(line);
        }
      } catch {
        // Keep malformed lines in recent
        recentLines.push(line);
      }
    });

    // Write archived logs to backup
    if (archivedLines.length > 0) {
      const archiveDate = new Date().toISOString().split("T")[0];
      const archivePath = path.join(
        process.cwd(),
        "data",
        "backup",
        `audit-${archiveDate}.log`
      );
      
      const archiveDir = path.dirname(archivePath);
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
      }
      
      fs.writeFileSync(archivePath, archivedLines.join("\n") + "\n", "utf8");
    }

    // Write recent logs back to main file
    fs.writeFileSync(AUDIT_LOG_PATH, recentLines.join("\n") + "\n", "utf8");

    return true;
  } catch (error) {
    console.error("Error archiving audit logs:", error);
    return false;
  }
}

/**
 * Clear all audit logs (USE WITH CAUTION)
 * @param {object} user - User who cleared the logs
 * @returns {boolean} Success status
 */
export function clearAuditLogs(user = {}) {
  try {
    // Backup before clearing
    const backupDate = new Date().toISOString().split("T")[0];
    const backupPath = path.join(
      process.cwd(),
      "data",
      "backup",
      `audit-cleared-${backupDate}.log`
    );
    
    if (fs.existsSync(AUDIT_LOG_PATH)) {
      fs.copyFileSync(AUDIT_LOG_PATH, backupPath);
    }

    // Clear the file
    fs.writeFileSync(AUDIT_LOG_PATH, "", "utf8");

    // Log the clearing action
    logAudit({
      action: "CLEAR_AUDIT_LOGS",
      user: user.username || "system",
      timestamp: new Date().toISOString(),
      backupPath,
    });

    return true;
  } catch (error) {
    console.error("Error clearing audit logs:", error);
    return false;
  }
}
