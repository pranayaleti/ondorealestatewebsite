import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import Loading from "@/components/loading"

const slugToComponent: Record<string, any> = {
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
}

export default async function CalculatorBySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const Component = slugToComponent[slug]
  if (!Component) return notFound()
  const prettyTitle = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
  return (
    <>
      <SEO
        title={`${prettyTitle} Calculator`}
        description={`Use our ${prettyTitle.toLowerCase()} calculator to plan your Utah real estate decisions.`}
        pathname={`/calculators/${slug}`}
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Calculators", url: `${SITE_URL}/calculators` },
          { name: prettyTitle, url: `${SITE_URL}/calculators/${slug}` },
        ])}
      />
      <Component />
    </>
  )
}


