import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskDisclosure } from "@/components/investments/risk-disclosure"
import { InvestmentInquiryForm } from "@/components/investments/investment-inquiry-form"
import { MOCK_OPPORTUNITIES } from "@/lib/investments-data"
import type { InvestmentOpportunity } from "@/lib/investments-data"
import {
  MapPin,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"

const statusConfig: Record<
  InvestmentOpportunity["status"],
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  open: { label: "Open for Investment", variant: "default" },
  "coming-soon": { label: "Coming Soon", variant: "secondary" },
  "fully-funded": { label: "Fully Funded", variant: "outline" },
}

export function generateStaticParams() {
  return MOCK_OPPORTUNITIES.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const opportunity = MOCK_OPPORTUNITIES.find((o) => o.slug === slug)
  if (!opportunity) return {}

  const title = `${opportunity.title} | Investment Opportunity`
  const description = opportunity.description
  const canonical = `${SITE_URL}/investments/${slug}/`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  }
}

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const opportunity = MOCK_OPPORTUNITIES.find((o) => o.slug === slug)
  if (!opportunity) return notFound()

  const status = statusConfig[opportunity.status]

  return (
    <main className="min-h-screen">
      <SEO
        title={`${opportunity.title} | Investment Opportunity`}
        description={opportunity.description}
        pathname={`/investments/${opportunity.slug}`}
        image={`${SITE_URL}${opportunity.image}`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Investments", url: `${SITE_URL}/investments` },
          { name: "Opportunities", url: `${SITE_URL}/investments/opportunities` },
          { name: opportunity.title, url: `${SITE_URL}/investments/${opportunity.slug}` },
        ])}
      />

      <PageBanner title={opportunity.title} subtitle={opportunity.location} />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back Link */}
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href="/investments/opportunities">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Opportunities
                </Link>
              </Button>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Property Image */}
                <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg">
                  <Image
                    src={opportunity.image}
                    alt={opportunity.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <Badge className="absolute top-4 left-4" variant={status.variant}>
                    {status.label}
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 dark:text-foreground">
                    Property Overview
                  </h2>
                  <p className="text-foreground/70 dark:text-foreground/70 leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>

                {/* Investment Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="dark:text-foreground">Investment Summary</CardTitle>
                    <CardDescription>
                      All figures are projections and subject to change. Not a guarantee of returns.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground/70">Minimum Investment</p>
                          <p className="font-semibold dark:text-foreground">
                            ${opportunity.minInvestment.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground/70">Target Return (Projected)</p>
                          <p className="font-semibold dark:text-foreground">
                            {opportunity.targetReturn}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground/70">Hold Period</p>
                          <p className="font-semibold dark:text-foreground">
                            {opportunity.holdPeriod}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground/70">Distribution Frequency</p>
                          <p className="font-semibold dark:text-foreground">
                            {opportunity.distributionFrequency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground/70">Location</p>
                          <p className="font-semibold dark:text-foreground">
                            {opportunity.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="dark:text-foreground">Investment Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {opportunity.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/70 dark:text-foreground/70">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="dark:text-foreground">Risk Factors</CardTitle>
                    <CardDescription>
                      All investments involve risk. Consider the following before investing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {opportunity.riskFactors.map((risk) => (
                        <li key={risk} className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/70 dark:text-foreground/70">
                            {risk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar: Contact Form */}
              <div>
                <div className="sticky top-24">
                  <InvestmentInquiryForm investmentTitle={opportunity.title} />
                </div>
              </div>
            </div>

            <div className="mt-16">
              <RiskDisclosure />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
