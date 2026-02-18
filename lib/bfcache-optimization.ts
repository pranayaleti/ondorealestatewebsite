/**
 * Back/Forward Cache (bfcache) optimization utilities
 * Ensures pages can be restored from bfcache for instant navigation.
 *
 * Rules:
 * - Use pagehide (with event.persisted) for cleanup or analytics; avoid beforeunload/unload.
 * - Use pageshow with event.persisted === true to detect bfcache restore and re-initialize.
 * - For sending data on exit, use visibilitychange, pagehide, or sendBeacon in pagehide —
 *   never rely on beforeunload/unload (they break bfcache and are unreliable).
 * - Avoid: unload listeners, Cache API during unload, closing WebSockets in unload,
 *   or setting history.state right before navigation.
 */

type BfcacheRestoreCallback = () => void
const restoreCallbacks: Set<BfcacheRestoreCallback> = new Set()
const pagehideCallbacks: Set<() => void> = new Set()
let pagehideListenerAttached = false

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

  // Pagehide: run lightweight callbacks only (e.g. sendBeacon). No heavy work or storage.
  function handlePagehide() {
    pagehideCallbacks.forEach((cb) => {
      try {
        cb()
      } catch (_) {
        // ignore so one callback does not break others
      }
    })
  }
  if (!pagehideListenerAttached) {
    pagehideListenerAttached = true
    window.addEventListener("pagehide", handlePagehide, { passive: true })
  }
}

/**
 * Register a callback to run when the page is hidden (pagehide).
 * Use for sending analytics via sendBeacon only; keep the callback lightweight
 * so the page stays bfcache-eligible. Returns an unregister function.
 */
export function onPagehide(callback: () => void): () => void {
  pagehideCallbacks.add(callback)
  if (typeof window !== "undefined" && !pagehideListenerAttached) {
    initBfcacheOptimization()
  }
  return () => {
    pagehideCallbacks.delete(callback)
  }
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

/**
 * Send a beacon on pagehide. Use for analytics or last-event flush without blocking bfcache.
 * Keeps the callback minimal (only sendBeacon); do not do heavy work or storage here.
 */
export function sendBeaconOnPagehide(url: string, payload?: string | Blob): () => void {
  return onPagehide(() => {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      if (payload !== undefined) {
        const blob = typeof payload === "string" ? new Blob([payload], { type: "text/plain" }) : payload
        navigator.sendBeacon(url, blob)
      } else {
        navigator.sendBeacon(url)
      }
    }
  })
}

