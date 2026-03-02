"use client"

import { useEffect, useRef } from "react"

/**
 * Lightweight client component that observes Core Web Vitals via
 * PerformanceObserver and reports them to analytics (GA / sendBeacon).
 *
 * Metrics tracked:
 *  - FCP  (First Contentful Paint)
 *  - LCP  (Largest Contentful Paint)
 *  - FID  (First Input Delay) / INP (Interaction to Next Paint)
 *  - CLS  (Cumulative Layout Shift)
 *  - TTFB (Time to First Byte)
 *
 * Mount once in the root layout. Does not render any DOM.
 */

type VitalName = "FCP" | "LCP" | "FID" | "INP" | "CLS" | "TTFB"

interface VitalEntry {
  name: VitalName
  value: number
  rating: "good" | "needs-improvement" | "poor"
}

const THRESHOLDS: Record<VitalName, [number, number]> = {
  FCP: [1800, 3000],
  LCP: [2500, 4000],
  FID: [100, 300],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  TTFB: [800, 1800],
}

function rate(name: VitalName, value: number): VitalEntry["rating"] {
  const [good, poor] = THRESHOLDS[name]
  if (value <= good) return "good"
  if (value <= poor) return "needs-improvement"
  return "poor"
}

function reportVital(entry: VitalEntry) {
  if (typeof window === "undefined") return

  if (typeof window.gtag === "function") {
    window.gtag("event", entry.name, {
      event_category: "Web Vitals",
      value: Math.round(entry.name === "CLS" ? entry.value * 1000 : entry.value),
      event_label: entry.rating,
      non_interaction: true,
    })
  }
}

export function WebVitalsReporter() {
  const clsRef = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") return

    const observers: PerformanceObserver[] = []

    function observe(
      type: string,
      callback: (entries: PerformanceEntryList) => void,
      opts?: PerformanceObserverInit,
    ) {
      try {
        const po = new PerformanceObserver((list) => callback(list.getEntries()))
        po.observe({ type, buffered: true, ...opts })
        observers.push(po)
      } catch {
        /* unsupported entry type – skip */
      }
    }

    // FCP
    observe("paint", (entries) => {
      const fcp = entries.find((e) => e.name === "first-contentful-paint")
      if (fcp) reportVital({ name: "FCP", value: fcp.startTime, rating: rate("FCP", fcp.startTime) })
    })

    // LCP
    observe("largest-contentful-paint", (entries) => {
      const last = entries[entries.length - 1]
      if (last) reportVital({ name: "LCP", value: last.startTime, rating: rate("LCP", last.startTime) })
    })

    // FID
    observe("first-input", (entries) => {
      const entry = entries[0] as PerformanceEventTiming | undefined
      if (entry) {
        const delay = entry.processingStart - entry.startTime
        reportVital({ name: "FID", value: delay, rating: rate("FID", delay) })
      }
    })

    // INP (Interaction to Next Paint)
    observe("event", (entries) => {
      let maxDuration = 0
      for (const entry of entries as PerformanceEventTiming[]) {
        if (entry.duration > maxDuration) maxDuration = entry.duration
      }
      if (maxDuration > 0) {
        reportVital({ name: "INP", value: maxDuration, rating: rate("INP", maxDuration) })
      }
    }, { type: "event", buffered: true } as PerformanceObserverInit)

    // CLS
    observe("layout-shift", (entries) => {
      for (const entry of entries) {
        if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
          clsRef.current += (entry as unknown as { value: number }).value
        }
      }
      reportVital({ name: "CLS", value: clsRef.current, rating: rate("CLS", clsRef.current) })
    })

    // TTFB
    observe("navigation", (entries) => {
      const nav = entries[0] as PerformanceNavigationTiming | undefined
      if (nav) {
        const ttfb = nav.responseStart - nav.requestStart
        reportVital({ name: "TTFB", value: ttfb, rating: rate("TTFB", ttfb) })
      }
    })

    return () => {
      observers.forEach((po) => po.disconnect())
    }
  }, [])

  return null
}
