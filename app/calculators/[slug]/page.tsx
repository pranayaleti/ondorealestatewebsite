"use client"

import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

const slugToComponent: Record<string, any> = {
  "mortgage-payment": dynamic(() => import("@/pages/calculators/MortgagePaymentCalculator"), { ssr: false }),
  "affordability": dynamic(() => import("@/pages/calculators/AffordabilityCalculator"), { ssr: false }),
  "income": dynamic(() => import("@/pages/calculators/IncomeCalculator"), { ssr: false }),
  "closing-cost": dynamic(() => import("@/pages/calculators/ClosingCostCalculator"), { ssr: false }),
  "refinance": dynamic(() => import("@/pages/calculators/RefinanceCalculator"), { ssr: false }),
  "home-sale": dynamic(() => import("@/pages/calculators/HomeSaleCalculator"), { ssr: false }),
  "buying-power": dynamic(() => import("@/pages/calculators/BuyingPowerCalculator"), { ssr: false }),
  "temporary-buydown": dynamic(() => import("@/pages/calculators/TemporaryBuydownCalculator"), { ssr: false }),
  "rent-vs-own": dynamic(() => import("@/pages/calculators/RentVsOwnCalculator"), { ssr: false }),
  "retirement": dynamic(() => import("@/pages/calculators/RetirementCalculator"), { ssr: false }),
}

export default function CalculatorBySlugPage({ params }: { params: { slug: string } }) {
  const Component = slugToComponent[params.slug]
  if (!Component) return notFound()
  const prettyTitle = params.slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
  return (
    <>
      <SEO
        title={`${prettyTitle} Calculator`}
        description={`Use our ${prettyTitle.toLowerCase()} calculator to plan your Utah real estate decisions.`}
        pathname={`/calculators/${params.slug}`}
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Calculators", url: `${SITE_URL}/calculators` },
          { name: prettyTitle, url: `${SITE_URL}/calculators/${params.slug}` },
        ])}
      />
      <Component />
    </>
  )
}


