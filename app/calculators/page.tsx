import CalculatorsPage from "./CalculatorsPage"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export default function CalculatorsIndexPage() {
  return (
    <>
      <SEO
        title="Mortgage & Affordability Calculators"
        description="Use our mortgage payment, affordability, and refinance calculators to plan your Utah home purchase or refinance."
        pathname="/calculators"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Calculators", url: `${SITE_URL}/calculators` },
        ])}
      />
      <CalculatorsPage />
    </>
  )
}


