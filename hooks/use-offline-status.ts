"use client"

import { useEffect, useState } from "react"

interface OfflineStatus {
  isOnline: boolean
  isOffline: boolean
}

export function useOfflineStatus(): OfflineStatus {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return
    }

    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return {
    isOnline,
    isOffline: !isOnline,
  }
}
