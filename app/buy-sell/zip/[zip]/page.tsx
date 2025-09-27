import { CityServicePage } from "@/components/city-service-page"
import { findCityByZip, allZips } from "@/lib/utah-cities"
import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"

type Params = { zip: string }

export function generateStaticParams(): Params[] {
  return allZips.map((zip) => ({ zip }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = findCityByZip(params.zip)
  const cityName = city?.name ?? "Utah"
  const title = `Real Estate Agents ${params.zip} (${cityName}) | ${SITE_NAME}`
  const description = `Buy or sell a home in ${cityName} ${params.zip}. Local expertise and full-service support.`
  const canonical = `${SITE_URL}/buy-sell/zip/${params.zip}/`
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical } }
}

export default function Page({ params }: { params: Params }) {
  const city = findCityByZip(params.zip)
  if (!city) return <div className="container mx-auto px-4 py-10">Service area not found.</div>
  return (
    <>
      <SEO
        title={`Real Estate Agents ${params.zip} (${city.name}) | ${SITE_NAME}`}
        description={`Buy or sell a home in ${city.name} ${params.zip}. Local expertise and full-service support.`}
        pathname={`/buy-sell/zip/${params.zip}/`}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Buy & Sell", url: `${SITE_URL}/buy-sell/` },
          { name: `${params.zip} (${city.name})`, url: `${SITE_URL}/buy-sell/zip/${params.zip}/` },
        ])}
      />
      <CityServicePage city={city} service="buy-sell" />
    </>
  )
}


