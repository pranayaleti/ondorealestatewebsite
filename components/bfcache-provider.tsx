"use client"

import { useEffect } from "react"
import { initBfcacheOptimization, registerBfcacheRestoreCallback } from "@/lib/bfcache-optimization"

/**
 * Client component that initializes bfcache optimization and restores state
 * when the page is restored from back-forward cache (pageshow with persisted).
 * Mount once in root layout so all pages benefit from bfcache-friendly behavior.
 */
export function BfcacheProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    initBfcacheOptimization()

    const unregister = registerBfcacheRestoreCallback(() => {
      // Re-initialize after bfcache restore: timers, focus, scroll are usually
      // preserved by the browser; we only run minimal app-level refresh if needed.
      if (typeof window !== "undefined" && window.document.visibilityState === "visible") {
        // Optional: trigger a soft refresh of visible UI (e.g. refresh stale data)
        window.dispatchEvent(new CustomEvent("bfcache-restore"))
      }
    })

    return () => {
      unregister()
    }
  }, [])

  return <>{children}</>
}
