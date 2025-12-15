import type { ComponentType } from "react"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd, generateWebApplicationJsonLd } from "@/lib/seo"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import Loading from "@/components/loading"

const slugToComponent: Record<string, ComponentType> = {
  "mortgage-payment": dynamic(() => import("@/pages/calculators/MortgagePaymentCalculator"), { 
    loading: () => <Loading />
  }),
  "affordability": dynamic(() => import("@/pages/calculators/AffordabilityCalculator"), { 
    loading: () => <Loading />
  }),
  "income": dynamic(() => import("@/pages/calculators/IncomeCalculator"), { 
    loading: () => <Loading />
  }),
  "closing-cost": dynamic(() => import("@/pages/calculators/ClosingCostCalculator"), { 
    loading: () => <Loading />
  }),
  "refinance": dynamic(() => import("@/pages/calculators/RefinanceCalculator"), { 
    loading: () => <Loading />
  }),
  "home-sale": dynamic(() => import("@/pages/calculators/HomeSaleCalculator"), { 
    loading: () => <Loading />
  }),
  "buying-power": dynamic(() => import("@/pages/calculators/BuyingPowerCalculator"), { 
    loading: () => <Loading />
  }),
  "temporary-buydown": dynamic(() => import("@/pages/calculators/TemporaryBuydownCalculator"), { 
    loading: () => <Loading />
  }),
  "rent-vs-own": dynamic(() => import("@/pages/calculators/RentVsOwnCalculator"), { 
    loading: () => <Loading />
  }),
  "retirement": dynamic(() => import("@/pages/calculators/RetirementCalculator"), { 
    loading: () => <Loading />
  }),
  "cash-on-cash": dynamic(() => import("@/pages/calculators/CashOnCashCalculator"), { 
    loading: () => <Loading />
  }),
  "cap-rate": dynamic(() => import("@/pages/calculators/CapRateCalculator"), { 
    loading: () => <Loading />
  }),
  "roi": dynamic(() => import("@/pages/calculators/ROICalculator"), { 
    loading: () => <Loading />
  }),
  "grm": dynamic(() => import("@/pages/calculators/GRMCalculator"), { 
    loading: () => <Loading />
  }),
  "dscr": dynamic(() => import("@/pages/calculators/DSCRCalculator"), { 
    loading: () => <Loading />
  }),
  "one-percent-rule": dynamic(() => import("@/pages/calculators/OnePercentRuleCalculator"), { 
    loading: () => <Loading />
  }),
  "fifty-percent-rule": dynamic(() => import("@/pages/calculators/FiftyPercentRuleCalculator"), { 
    loading: () => <Loading />
  }),
}

const calculatorDetails: Record<
  string,
  { name: string; description: string; applicationCategory?: string }
> = {
  "mortgage-payment": {
    name: "Mortgage Payment Calculator",
    description: "Estimate monthly mortgage payments with taxes, insurance, and PMI.",
  },
  affordability: {
    name: "Home Affordability Calculator",
    description: "Estimate what home price fits your income, debts, and expenses.",
  },
  income: {
    name: "Required Income Calculator",
    description: "Calculate the income needed to qualify for your target home price.",
  },
  "closing-cost": {
    name: "Closing Cost Calculator",
    description: "Estimate buyer closing costs, taxes, and prepaid expenses.",
  },
  refinance: {
    name: "Refinance Savings Calculator",
    description: "Model payment changes and break-even timing for a refinance.",
  },
  "home-sale": {
    name: "Home Sale Proceeds Calculator",
    description: "Estimate net proceeds after agent fees, taxes, and payoff.",
  },
  "buying-power": {
    name: "Buying Power Calculator",
    description: "See how rate, down payment, and debts change your buying power.",
  },
  "temporary-buydown": {
    name: "Temporary Buydown Calculator",
    description: "Model 2-1 or 3-2-1 buydown payment relief and total costs.",
  },
  "rent-vs-own": {
    name: "Rent vs Own Calculator",
    description: "Compare long-term costs and equity between renting and owning.",
  },
  retirement: {
    name: "Retirement Savings Calculator",
    description: "Project retirement savings growth and future income needs.",
  },
  "cash-on-cash": {
    name: "Cash-on-Cash Return Calculator",
    description: "Calculate cash-on-cash return for an investment property.",
  },
  "cap-rate": {
    name: "Cap Rate Calculator",
    description: "Compute capitalization rate from NOI and purchase price.",
  },
  roi: {
    name: "ROI Calculator",
    description: "Measure total ROI for a real estate investment with costs.",
  },
  grm: {
    name: "GRM Calculator",
    description: "Calculate gross rent multiplier from price and rent.",
  },
  dscr: {
    name: "DSCR Calculator",
    description: "Estimate debt service coverage ratio for rental financing.",
  },
  "one-percent-rule": {
    name: "1% Rule Calculator",
    description: "Check if a property's rent meets the 1% rule benchmark.",
  },
  "fifty-percent-rule": {
    name: "50% Rule Calculator",
    description: "Estimate expenses quickly using the 50% rental rule.",
  },
}

// Generate static params for all calculator slugs at build time
export async function generateStaticParams() {
  return Object.keys(slugToComponent).map((slug) => ({ slug }))
}

export default async function CalculatorBySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const Component = slugToComponent[slug]
  if (!Component) return notFound()
  const prettyTitle = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
  const detail =
    calculatorDetails[slug] || {
      name: `${prettyTitle} Calculator`,
      description: `Use our ${prettyTitle.toLowerCase()} calculator to plan your Utah real estate decisions.`,
      applicationCategory: "FinancialApplication",
    }
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Calculators", url: `${SITE_URL}/calculators` },
    { name: prettyTitle, url: `${SITE_URL}/calculators/${slug}` },
  ])
  const webAppJsonLd = generateWebApplicationJsonLd({
    name: detail.name,
    description: detail.description,
    url: `${SITE_URL}/calculators/${slug}`,
    applicationCategory: detail.applicationCategory || "FinancialApplication",
    providerName: SITE_NAME,
  })
  const structuredData = [breadcrumbJsonLd, webAppJsonLd].filter(Boolean)
  return (
    <>
      <SEO
        title={`${prettyTitle} Calculator`}
        description={`Use our ${prettyTitle.toLowerCase()} calculator to plan your Utah real estate decisions.`}
        pathname={`/calculators/${slug}`}
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={structuredData}
      />
      <Component />
    </>
  )
}


