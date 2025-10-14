import { PropertiesGridLoading } from "@/components/loading-states"

export default function Loading() {
  return (
    <div className="container py-8">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-2"></div>
          <div className="h-5 w-48 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="h-10 w-[200px] bg-muted animate-pulse rounded"></div>
          <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
        </div>
      </div>

      {/* Properties grid loading */}
      <PropertiesGridLoading count={6} />
    </div>
  )
}
