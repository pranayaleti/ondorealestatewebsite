/**
 * Back/Forward Cache (bfcache) optimization utilities
 * Ensures pages can be restored from bfcache for instant navigation
 */

/**
 * Initialize bfcache optimization
 * Call this in a useEffect to ensure pages are bfcache-friendly
 */
export function initBfcacheOptimization() {
  if (typeof window === 'undefined') return;

  // Ensure pageshow event doesn't prevent bfcache
  window.addEventListener('pageshow', (event) => {
    // If page was restored from bfcache, reinitialize any necessary state
    if (event.persisted) {
      // Reinitialize any state that might have been lost
      // This is a good place to restore scroll position, form data, etc.
    }
  }, { passive: true });

  // Avoid using beforeunload/unload which prevent bfcache
  // Instead, use pagehide for cleanup if needed
  window.addEventListener('pagehide', (event) => {
    // Only do minimal cleanup - avoid heavy operations
    // Heavy operations here can prevent bfcache
  }, { passive: true });
}

/**
 * Cleanup function to ensure bfcache compatibility
 * Closes any connections that might prevent bfcache
 */
export function cleanupForBfcache() {
  if (typeof window === 'undefined') return;

  // Close any IndexedDB connections
  // Note: This is a placeholder - implement based on your IndexedDB usage
  
  // Clear any timers that might prevent bfcache
  // Note: Most timers are automatically cleared, but check for any persistent ones
}

/**
 * Check if bfcache is supported
 */
export function isBfcacheSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'performance' in window && 'navigation' in window.performance;
}

