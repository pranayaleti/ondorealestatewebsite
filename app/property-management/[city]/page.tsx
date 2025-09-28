import { CityServicePage } from "@/components/city-service-page"
import { findCityBySlug, allCitySlugs } from "@/lib/utah-cities"
import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"

type Params = Promise<{ city: string }>

export function generateStaticParams(): { city: string }[] {
  return allCitySlugs.map((city) => ({ city }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = findCityBySlug(citySlug)
  const cityName = city?.name ?? params.city
  const title = `${cityName} Property Management | ${SITE_NAME}`
  const description = `Full-service property management in ${cityName}, Utah. Marketing, screening, rent collection, maintenance, and reporting.`
  const canonical = `${SITE_URL}/property-management/${params.city}/`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { city: citySlug } = await params
  const city = findCityBySlug(citySlug)
  if (!city) {
    return <div className="container mx-auto px-4 py-10">City not found.</div>
  }
  return (
    <>
      <SEO
        title={`${city.name} Property Management | ${SITE_NAME}`}
        description={`Full-service property management in ${city.name}, Utah. Marketing, screening, rent collection, maintenance, and reporting.`}
        pathname={`/property-management/${params.city}/`}
        image={`${SITE_URL}/property-manager-meeting.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Property Management", url: `${SITE_URL}/property-management/` },
          { name: city.name, url: `${SITE_URL}/property-management/${params.city}/` },
        ])}
      />
      <CityServicePage city={city} service="property-management" />
    </>
  )
}


