// Client-safe audit log utilities (no fs access)

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

/**
 * Format timestamp for display
 */
export function formatLogTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

/**
 * Get action icon
 */
export function getActionIcon(action) {
  if (action.includes('create')) return '➕';
  if (action.includes('update')) return '✏️';
  if (action.includes('archive')) return '🗄️';
  if (action.includes('restore')) return '♻️';
  if (action.includes('delete')) return '🗑️';
  return '📝';
}
