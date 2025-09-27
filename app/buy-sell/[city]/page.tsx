import { CityServicePage } from "@/components/city-service-page"
import { findCityBySlug, allCitySlugs } from "@/lib/utah-cities"
import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"

type Params = { city: string }

export function generateStaticParams(): Params[] {
  return allCitySlugs.map((city) => ({ city }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = findCityBySlug(params.city)
  const cityName = city?.name ?? params.city
  const title = `Buy & Sell Homes in ${cityName}, Utah | ${SITE_NAME}`
  const description = `Top local agents in ${cityName}. Expert pricing, marketing, and smooth closings for buyers and sellers.`
  const canonical = `${SITE_URL}/buy-sell/${params.city}/`
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical } }
}

export default function Page({ params }: { params: Params }) {
  const city = findCityBySlug(params.city)
  if (!city) return <div className="container mx-auto px-4 py-10">City not found.</div>
  return (
    <>
      <SEO
        title={`Buy & Sell Homes in ${city.name}, Utah | ${SITE_NAME}`}
        description={`Top local agents in ${city.name}. Expert pricing, marketing, and smooth closings for buyers and sellers.`}
        pathname={`/buy-sell/${params.city}/`}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Buy & Sell", url: `${SITE_URL}/buy-sell/` },
          { name: city.name, url: `${SITE_URL}/buy-sell/${params.city}/` },
        ])}
      />
      <CityServicePage city={city} service="buy-sell" />
    </>
  )
}


