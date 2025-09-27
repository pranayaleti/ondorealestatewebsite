import { CityServicePage } from "@/components/city-service-page"
import { findCityBySlug, allCitySlugs } from "@/lib/utah-cities"
import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"

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
  return <CityServicePage city={city} service="buy-sell" />
}


