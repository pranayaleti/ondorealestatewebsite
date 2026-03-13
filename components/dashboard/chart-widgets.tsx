"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const ChartSkeleton = () => (
  <div className="h-[300px] w-full space-y-3 p-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-[260px] w-full" />
  </div>
)

const PropertyTypeDistributionLazy = dynamic(
  () =>
    import("@/components/dashboard/property-type-distribution").then(
      (mod) => mod.PropertyTypeDistribution
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

const PropertyValueDistributionLazy = dynamic(
  () =>
    import("@/components/dashboard/property-value-distribution").then(
      (mod) => mod.PropertyValueDistribution
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

export function PropertyTypeDistribution() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <PropertyTypeDistributionLazy />
    </Suspense>
  )
}

export function PropertyValueDistribution() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <PropertyValueDistributionLazy />
    </Suspense>
  )
}
