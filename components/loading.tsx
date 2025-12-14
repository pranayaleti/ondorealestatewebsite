import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-10 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Hero section skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto mb-8" />
          <div className="flex justify-center gap-4 mb-8">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>

        {/* Content sections skeleton */}
        <div className="space-y-16">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-8">
              <Skeleton className="h-8 w-64 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((card) => (
                  <div key={card} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}