// Audit log utilities for tracking admin actions

import fs from 'fs';
import path from 'path';

const AUDIT_DIR = path.join(process.cwd(), 'data', 'audit');
const AUDIT_FILE = path.join(AUDIT_DIR, 'audit-log.json');

// Ensure audit directory exists
function ensureAuditDir() {
  if (!fs.existsSync(AUDIT_DIR)) {
    fs.mkdirSync(AUDIT_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUDIT_FILE)) {
    fs.writeFileSync(AUDIT_FILE, JSON.stringify({ logs: [] }, null, 2));
  }
}

/**
 * Log an admin action
 */
export function logAction({ user, action, entity, entityId, details = {} }) {
  try {
    ensureAuditDir();
    
    const auditData = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf-8'));
    
    const logEntry = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      action, // e.g., 'notice.create', 'document.update', 'event.archive'
      entity, // e.g., 'notice', 'document', 'event'
      entityId, // e.g., 'NOT-20260117120000'
      details
    };
    
    auditData.logs.unshift(logEntry);
    
    // Keep only last 1000 logs
    if (auditData.logs.length > 1000) {
      auditData.logs = auditData.logs.slice(0, 1000);
    }
    
    fs.writeFileSync(AUDIT_FILE, JSON.stringify(auditData, null, 2));
    
    return logEntry;
  } catch (error) {
    console.error('Audit log error:', error);
    return null;
  }
}

/**
 * Get recent audit logs
 */
export function getRecentLogs(limit = 10) {
  try {
    ensureAuditDir();
    const auditData = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf-8'));
    return auditData.logs.slice(0, limit);
  } catch (error) {
    console.error('Error reading audit logs:', error);
    return [];
  }
}

/**
 * Get logs filtered by criteria
 */
export function getLogsByFilter({ user, action, entity, startDate, endDate, limit = 50 }) {
  try {
    ensureAuditDir();
    const auditData = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf-8'));
    
    let filtered = auditData.logs;
    
    if (user) {
      filtered = filtered.filter(log => log.user.id === user);
    }
    
    if (action) {
      filtered = filtered.filter(log => log.action === action);
    }
    
    if (entity) {
      filtered = filtered.filter(log => log.entity === entity);
    }
    
    if (startDate) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(startDate));
    }
    
    if (endDate) {
      filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(endDate));
    }
    
    return filtered.slice(0, limit);
  } catch (error) {
    console.error('Error filtering audit logs:', error);
    return [];
  }
}

/**
 * Get action label for display
 */
export function getActionLabel(action) {
  const labels = {
    'notice.create': 'Created Notice',
    'notice.update': 'Updated Notice',
    'notice.archive': 'Archived Notice',
    'notice.restore': 'Restored Notice',
    'document.create': 'Uploaded Document',
    'document.update': 'Updated Document',
    'document.archive': 'Archived Document',
    'event.create': 'Created Event',
    'event.update': 'Updated Event',
    'event.archive': 'Archived Event',
    'gallery.create': 'Created Album',
    'gallery.update': 'Updated Album',
    'gallery.addPhotos': 'Added Photos',
    'gallery.removePhoto': 'Removed Photo',
    'committee.create': 'Added Committee Member',
    'committee.update': 'Updated Committee Member',
    'committee.archive': 'Removed Committee Member',
    'contact.update': 'Updated Contact Info',
    'settings.update': 'Updated Settings',
    'demo.reset': 'Reset Demo Data'
  };
  
  return labels[action] || action;
}
