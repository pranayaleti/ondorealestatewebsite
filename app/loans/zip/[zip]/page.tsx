import { CityServicePage } from "@/components/city-service-page"
import { findCityByZip, allZips } from "@/lib/utah-cities"
import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"

type Params = { zip: string }

export function generateStaticParams(): Params[] {
  return allZips.map((zip) => ({ zip }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = findCityByZip(params.zip)
  const cityName = city?.name ?? "Utah"
  const title = `Mortgage Lenders ${params.zip} (${cityName}) | ${SITE_NAME}`
  const description = `Loan options and pre-qualification for borrowers in ${params.zip} ${cityName}.`
  const canonical = `${SITE_URL}/loans/zip/${params.zip}/`
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical } }
}

export default function Page({ params }: { params: Params }) {
  const city = findCityByZip(params.zip)
  if (!city) return <div className="container mx-auto px-4 py-10">Service area not found.</div>
  return <CityServicePage city={city} service="loans" />
}


