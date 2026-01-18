/**
 * Image Path Utility
 * Routes image paths based on environment mode (demo/prod)
 */

/**
 * Get the image path based on current mode
 * @param {string} relativePath - Relative path from images folder (e.g., 'general/hero-image.png')
 * @param {string} mode - Optional mode override ('demo' or 'prod'). If not provided, reads from config or env
 * @returns {string} Full image path
 */
export function getImagePath(relativePath, mode = null) {
  // Remove leading slash if present
  const cleanPath = relativePath.replace(/^\/+/, '');
  
  // Determine mode: explicit param > env variable > default to demo
  const imageMode = mode || process.env.NEXT_PUBLIC_MODE || 'demo';
  
  // Return full path
  return `/images/${imageMode}/${cleanPath}`;
}

/**
 * Get mode from config (client-side usage)
 * Call this once and pass mode to getImagePath for better performance
 * @param {object} config - Config object from API
 * @returns {string} 'demo' or 'prod'
 */
export function getModeFromConfig(config) {
  return config?.mode === 'prod' ? 'prod' : 'demo';
}

/**
 * Image categories for easier management
 */
export const IMAGE_CATEGORIES = {
  GENERAL: 'general',
  COMMUNITY: 'community',
  FACILITIES: 'facilities',
  EVENTS: 'events',
  GALLERY: 'gallery',
  DOCUMENTS: 'documents'
};

/**
 * Get categorized image path
 * @param {string} category - Category from IMAGE_CATEGORIES
 * @param {string} filename - Image filename
 * @param {string} mode - Optional mode ('demo' or 'prod')
 * @returns {string} Full image path
 */
export function getCategorizedImagePath(category, filename, mode = null) {
  return getImagePath(`${category}/${filename}`, mode);
}

/**
 * Validate image path exists (for admin upload confirmation)
 * @param {string} path - Full image path
 * @returns {Promise<boolean>} True if image exists
 */
export async function validateImageExists(path) {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Get fallback image if primary image fails
 * @param {string} primaryPath - Primary image path
 * @param {string} fallbackPath - Fallback image path
 * @returns {string} Primary or fallback path
 */
export function getImageWithFallback(primaryPath, fallbackPath = '/images/demo/general/placeholder.png') {
  return primaryPath || fallbackPath;
}
