"use client"

import { useEffect } from "react"
import {
  initBfcacheOptimization,
  registerBfcacheRestoreCallback,
  onPagehide,
  cleanupForBfcache,
  restoreAfterBfcache,
} from "@/lib/bfcache-optimization"

/**
 * Client component that initializes bfcache optimization and restores state
 * when the page is restored from back-forward cache (pageshow with persisted).
 * Mount once in root layout so all pages benefit from bfcache-friendly behavior.
 * Pages can listen for "bfcache-restore" to revalidate data (e.g. refresh lists).
 */
export function BfcacheProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    initBfcacheOptimization()

    const unregisterRestore = registerBfcacheRestoreCallback(() => {
      if (typeof window === "undefined") return
      if (process.env.NODE_ENV === "development") {
        const w = window as Window & { __bfcacheRestoreCount?: number }
        w.__bfcacheRestoreCount = (w.__bfcacheRestoreCount ?? 0) + 1
      }
      restoreAfterBfcache()
    })

    const unregisterHide = onPagehide(() => {
      cleanupForBfcache()
    })

    return () => {
      unregisterRestore()
      unregisterHide()
    }
  }, [])

  return <>{children}</>
}
