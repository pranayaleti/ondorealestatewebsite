"use client"

import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

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
  return <Component />
}


