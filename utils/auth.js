// Simple session management utilities for admin authentication

// In-memory session store (for demo/development)
// In production, use a proper session store (Redis, database, etc.)
const sessions = new Map();

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

/**
 * Create a new session for a user
 */
export function createSession(userId, userData) {
  const sessionId = generateSessionId();
  const session = {
    id: sessionId,
    userId,
    userData,
    createdAt: Date.now(),
    lastActivity: Date.now(),
  };
  
  sessions.set(sessionId, session);
  return sessionId;
}

/**
 * Validate and refresh a session
 */
export function validateSession(sessionId) {
  const session = sessions.get(sessionId);
  
  if (!session) {
    return null;
  }
  
  // Check if session has expired
  const now = Date.now();
  if (now - session.lastActivity > SESSION_TIMEOUT) {
    sessions.delete(sessionId);
    return null;
  }
  
  // Refresh session activity
  session.lastActivity = now;
  sessions.set(sessionId, session);
  
  return session;
}

/**
 * Destroy a session (logout)
 */
export function destroySession(sessionId) {
  sessions.delete(sessionId);
}

/**
 * Generate a random session ID
 */
function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Verify user credentials (simple demo implementation)
 * In production, hash passwords and use proper authentication
 */
export function verifyCredentials(email, password) {
  // Demo credentials (in production, query database and verify hashed password)
  const adminUsers = [
    { id: 'admin1', email: 'admin@nextland.org', password: 'admin123', role: 'admin', name: 'Admin User' },
    { id: 'editor1', email: 'editor@nextland.org', password: 'editor123', role: 'editor', name: 'Editor User' }
  ];
  
  const user = adminUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Don't return password
    const { password: _, ...userData } = user;
    return userData;
  }
  
  return null;
}

/**
 * Check if user has required role
 */
export function hasRole(session, requiredRole) {
  if (!session || !session.userData) {
    return false;
  }
  
  const userRole = session.userData.role;
  
  // Admin has all permissions
  if (userRole === 'admin') {
    return true;
  }
  
  // Check specific role
  return userRole === requiredRole;
}
