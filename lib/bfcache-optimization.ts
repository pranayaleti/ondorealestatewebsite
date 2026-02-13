/**
 * Back/Forward Cache (bfcache) optimization utilities
 * Ensures pages can be restored from bfcache for instant navigation.
 * Use pagehide/pageshow (not beforeunload/unload) for bfcache compatibility.
 */

type BfcacheRestoreCallback = () => void
const restoreCallbacks: Set<BfcacheRestoreCallback> = new Set()

/**
 * Register a callback to run when the page is restored from bfcache (pageshow + persisted).
 * Returns an unregister function.
 */
export function registerBfcacheRestoreCallback(callback: BfcacheRestoreCallback): () => void {
  restoreCallbacks.add(callback)
  return () => {
    restoreCallbacks.delete(callback)
  }
}

/**
 * Initialize bfcache optimization.
 * Call this in a useEffect (e.g. from BfcacheProvider) so pages stay bfcache-eligible.
 */
export function initBfcacheOptimization() {
  if (typeof window === "undefined") return

  window.addEventListener(
    "pageshow",
    (event: PageTransitionEvent) => {
      if (event.persisted) {
        restoreCallbacks.forEach((cb) => {
          try {
            cb()
          } catch (_) {
            // ignore so one callback does not break others
          }
        })
      }
    },
    { passive: true }
  )

  // Use pagehide for minimal cleanup only; avoid heavy work or storage that blocks bfcache.
  window.addEventListener(
    "pagehide",
    () => {
      // No heavy cleanup here – keeps page bfcache-eligible.
    },
    { passive: true }
  )
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
  if (typeof window === "undefined") return false
  return "performance" in window && "navigation" in window.performance
}

/**
 * Run a callback when the page becomes hidden (visibilitychange).
 * Use this for flushing analytics or saving state instead of beforeunload/unload,
 * so the page stays bfcache-eligible.
 */
export function onPageHidden(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {}

  const handler = () => {
    if (document.visibilityState === "hidden") callback()
  }
  document.addEventListener("visibilitychange", handler, { passive: true })
  return () => document.removeEventListener("visibilitychange", handler)
}

