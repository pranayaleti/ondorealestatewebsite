"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function PortalClientOnly({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
