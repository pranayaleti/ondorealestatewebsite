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
  const title = `Property Management ${params.zip} (${cityName}) | ${SITE_NAME}`
  const description = `Professional property management services across ${params.zip} in ${cityName}, Utah.`
  const canonical = `${SITE_URL}/property-management/zip/${params.zip}/`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  }
}

export default function Page({ params }: { params: Params }) {
  const city = findCityByZip(params.zip)
  if (!city) {
    return <div className="container mx-auto px-4 py-10">Service area not found.</div>
  }
  return (
    <>
      <SEO
        title={`Property Management ${params.zip} (${city.name}) | ${SITE_NAME}`}
        description={`Professional property management services across ${params.zip} in ${city.name}, Utah.`}
        pathname={`/property-management/zip/${params.zip}/`}
        image={`${SITE_URL}/property-manager-meeting.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Property Management", url: `${SITE_URL}/property-management/` },
          { name: `${params.zip} (${city.name})`, url: `${SITE_URL}/property-management/zip/${params.zip}/` },
        ])}
      />
      <CityServicePage city={city} service="property-management" />
    </>
  )
}


