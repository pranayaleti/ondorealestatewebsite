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
  const title = `Home Loans in ${cityName}, Utah | ${SITE_NAME}`
  const description = `Conventional, FHA, VA, USDA, and jumbo loans serving ${cityName}. Get pre-qualified.`
  const canonical = `${SITE_URL}/loans/${params.city}/`
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical } }
}

export default function Page({ params }: { params: Params }) {
  const city = findCityBySlug(params.city)
  if (!city) return <div className="container mx-auto px-4 py-10">City not found.</div>
  return (
    <>
      <SEO
        title={`Home Loans in ${city.name}, Utah | ${SITE_NAME}`}
        description={`Conventional, FHA, VA, USDA, and jumbo loans serving ${city.name}. Get pre-qualified.`}
        pathname={`/loans/${params.city}/`}
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Loans", url: `${SITE_URL}/loans/` },
          { name: city.name, url: `${SITE_URL}/loans/${params.city}/` },
        ])}
      />
      <CityServicePage city={city} service="loans" />
    </>
  )
}


