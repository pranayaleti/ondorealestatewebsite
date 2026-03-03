"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "ondo-financial-visibility"

export function useFinancialVisibility(defaultVisible = true) {
  const [showValues, setShowValues] = useState(defaultVisible)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setShowValues(stored === "true")
      }
    } catch {
      // Ignore storage errors and fall back to default
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, String(showValues))
    } catch {
      // Ignore storage errors
    }
  }, [showValues])

  const toggle = () => setShowValues((current) => !current)

  return { showValues, toggle }
}

