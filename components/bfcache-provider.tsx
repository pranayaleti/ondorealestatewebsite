"use client"

import { useEffect } from "react"
import { initBfcacheOptimization, registerBfcacheRestoreCallback } from "@/lib/bfcache-optimization"

/**
 * Client component that initializes bfcache optimization and restores state
 * when the page is restored from back-forward cache (pageshow with persisted).
 * Mount once in root layout so all pages benefit from bfcache-friendly behavior.
 * Pages can listen for "bfcache-restore" to revalidate data (e.g. refresh lists).
 */
export function BfcacheProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    initBfcacheOptimization()

    const unregister = registerBfcacheRestoreCallback(() => {
      if (typeof window === "undefined") return
      if (process.env.NODE_ENV === "development") {
        // Minimal dev-only log to verify bfcache restore (strip in production)
        window.__bfcacheRestoreCount = (window.__bfcacheRestoreCount ?? 0) + 1
      }
      if (window.document.visibilityState === "visible") {
        window.dispatchEvent(new CustomEvent("bfcache-restore"))
      }
    })

    return () => {
      unregister()
    }
  }, [])

  return <>{children}</>
}
