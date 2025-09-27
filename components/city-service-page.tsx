"use client"

import Link from "next/link"
import { useMemo } from "react"
import Script from "next/script"
import { SITE_NAME, SITE_URL, SITE_PHONE, SITE_HOURS } from "@/lib/site"
import { cn } from "@/lib/utils"
import { type UtahCity } from "@/lib/utah-cities"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cityContentByName } from "@/lib/city-content"

type CityServicePageProps = {
  city: UtahCity
  service: "property-management" | "buy-sell" | "loans"
}

export function CityServicePage({ city, service }: CityServicePageProps) {
  const headline = useMemo(() => {
    if (service === "property-management") return `#1 Choice for ${city.name} Property Management`
    if (service === "buy-sell") return `Buy or Sell Property in ${city.name}, Utah`
    return `Home Loans and Mortgage Options in ${city.name}, Utah`
  }, [city.name, service])

  const ctaHref = useMemo(() => {
    if (service === "property-management") return "/contact"
    if (service === "buy-sell") return "/contact"
    return "/loans/conventional"
  }, [service])

  const ctaText = useMemo(() => {
    if (service === "property-management") return "Get a Free Rental Analysis"
    if (service === "buy-sell") return "Talk to a Local Agent"
    return "Get Pre-Qualified"
  }, [service])

  const businessType = service === "property-management" ? "LocalBusiness" : service === "buy-sell" ? "LocalBusiness" : "LocalBusiness"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": businessType,
    name: SITE_NAME,
    areaServed: city.name + ", UT",
    url: typeof window === "undefined" ? SITE_URL : window.location.href,
    telephone: SITE_PHONE,
    openingHours: SITE_HOURS,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "UT",
      addressCountry: "US",
    },
    sameAs: [
      "https://ondorealestate.com",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buy & Sell Representation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Loans" } },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <Script id="city-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl">
            {headline}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cityContentByName[city.name]?.overview && (
            <p>{cityContentByName[city.name]?.overview}</p>
          )}
          <p>
            {service === "property-management" && (
              <>
                Our full-service property management in {city.name}, Utah covers marketing,
                tenant screening, rent collection, maintenance coordination, owner reporting,
                and legal compliance. We tailor plans for single-family homes, townhomes,
                condos, and small multi-family units across ZIP codes {city.zips.join(", ")}. 
              </>
            )}
            {service === "buy-sell" && (
              <>
                Work with experienced agents who know the {city.name} neighborhoods and
                schools. We provide data-driven pricing, professional marketing, and smooth
                contract-to-close coordination for buyers and sellers.
              </>
            )}
            {service === "loans" && (
              <>
                Explore competitive mortgage programs for {city.name}: conventional, FHA,
                VA, USDA, jumbo, and temporary buydowns. Get rate options and payment
                scenarios aligned to your goals.
              </>
            )}
          </p>

          <Link href={ctaHref}>
            <Button size="lg" className="mt-2">{ctaText}</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us in {city.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-6">
              <li>Local market expertise across ZIPs {city.zips.join(", ")}</li>
              <li>Transparent pricing and detailed owner/borrower dashboards</li>
              <li>Fast communication and proactive support</li>
              <li>Modern marketing, screening, and analytics</li>
              {cityContentByName[city.name]?.highlights?.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We serve the entire {city.name} area and surrounding communities in Utah County/Davis/Salt Lake County, including all listed ZIP codes.
            </p>
            {cityContentByName[city.name]?.neighborhoods && (
              <>
                <p className="mt-2 font-medium">Key Neighborhoods</p>
                <ul className="list-disc pl-6">
                  {cityContentByName[city.name]!.neighborhoods!.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cityContentByName[city.name]?.faq?.map((f) => (
            <div key={f.q}>
              <p className="font-medium">{f.q}</p>
              <p>{f.a}</p>
            </div>
          ))}
          <div>
            <p className="font-medium">How quickly can you start?</p>
            <p>Most services can begin within 48–72 hours after onboarding.</p>
          </div>
          <div>
            <p className="font-medium">Do you offer discounts for multiple properties?</p>
            <p>Yes, volume pricing is available. Contact us for a tailored quote.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CityServicePage


