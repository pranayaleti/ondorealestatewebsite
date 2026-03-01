"use client"

import { useEffect } from "react"
import { flushQueueNow } from "@/lib/pwa/offline-queue"

async function registerServiceWorker(): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

  try {
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    })
  } catch {
    // Service worker registration failure should not break app rendering.
  }
}

async function requestPushPermission(): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) return
  if (Notification.permission !== "default") return

  try {
    await Notification.requestPermission()
  } catch {
    // Ignore push permission errors in unsupported environments.
  }
}

export function PwaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void registerServiceWorker()

    // Retry queue flush whenever connectivity returns.
    const handleOnline = () => {
      void flushQueueNow()
    }

    window.addEventListener("online", handleOnline)
    return () => {
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  useEffect(() => {
    void requestPushPermission()
  }, [])

  return <>{children}</>
}
