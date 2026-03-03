import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LazyImage } from "@/components/lazy-image"
import { MapPin, TrendingUp, DollarSign } from "lucide-react"
import type { InvestmentOpportunity } from "@/lib/investments-data"

const statusConfig: Record<
  InvestmentOpportunity["status"],
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  open: { label: "Open", variant: "default" },
  "coming-soon": { label: "Coming Soon", variant: "secondary" },
  "fully-funded": { label: "Fully Funded", variant: "outline" },
}

interface InvestmentCardProps {
  opportunity: InvestmentOpportunity
}

export function InvestmentCard({ opportunity }: InvestmentCardProps) {
  const status = statusConfig[opportunity.status]

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <LazyImage
            src={opportunity.image}
            alt={opportunity.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <Badge className="absolute top-2 left-2" variant="secondary">
          {opportunity.assetClass}
        </Badge>
        <Badge className="absolute top-2 right-2" variant={status.variant}>
          {status.label}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight dark:text-foreground">
          {opportunity.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3" />
          {opportunity.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-sm text-foreground/70 mb-3">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            ${opportunity.minInvestment.toLocaleString()} min
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {opportunity.targetReturn} target
          </div>
        </div>

        <p className="text-sm text-foreground/70 dark:text-foreground/70 mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        <div className="mt-auto">
          <Button asChild className="w-full" size="sm">
            <Link href={`/investments/${opportunity.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
