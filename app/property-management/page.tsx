import { SITE_SOCIALS } from "@/lib/site"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd, generateServiceJsonLd } from "@/lib/seo"
import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Shield, DollarSign, Users, Building } from "lucide-react"
import Link from "next/link"
import ConsultationCTA from "@/components/ConsultationCTA"

export const metadata: Metadata = {
  title: "Utah Property Management Services | Professional Rental Management",
  description: "Full-service property management in Utah. Tenant screening, rent collection, maintenance, and reporting. Serving Salt Lake City, Lehi, Provo, and surrounding areas.",
  keywords: [
    // Core
    "Utah property management",
    "rental property management",
    "property manager Utah",
    // Services
    "tenant screening Utah",
    "rent collection Utah",
    "maintenance management Utah",
    "owner portal Utah",
    "tenant portal Utah",
    // Geos
    "property management Salt Lake City",
    "Lehi property management",
    "Provo property management",
    "Orem property management",
    "Sandy property management",
    "Draper property management",
  ],
  alternates: {
    canonical: `${SITE_URL}/property-management/`,
  },
  openGraph: {
    title: "Utah Property Management Services | Professional Rental Management",
    description: "Full-service property management in Utah. Tenant screening, rent collection, maintenance, and reporting.",
    url: `${SITE_URL}/property-management/`,
    images: [
      {
        url: `${SITE_URL}/property-manager-meeting.png`,
        width: 1200,
        height: 630,
        alt: "Property management meeting",
      },
    ],
  },
}

const services = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Tenant Screening & Placement",
    description: "Comprehensive background checks, credit analysis, and reference verification to find quality tenants.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Rent Collection & Financial Reporting",
    description: "Automated rent collection, late fee management, and detailed monthly financial reports.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Maintenance & Repairs",
    description: "24/7 emergency response, vendor coordination, and preventive maintenance programs.",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Property Marketing",
    description: "Professional photography, online listings, and marketing strategies to minimize vacancy time.",
  },
]

export default function PropertyManagementPage() {
  return (
    <>
      <SEO
        title="Utah Property Management Services | Professional Rental Management"
        description="Full-service property management in Utah. Tenant screening, rent collection, maintenance, and reporting. Serving Salt Lake City, Lehi, Provo, and surrounding areas."
        pathname="/property-management/"
        image={`${SITE_URL}/property-manager-meeting.png`}
        jsonLd={[
          generateBreadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Utah Property Management Services", url: `${SITE_URL}/property-management/` },
          ]),
          generateServiceJsonLd({
            name: "Utah Property Management",
            description:
              "Tenant placement, rent collection, maintenance coordination, and owner reporting across Utah.",
            serviceType: "Property Management",
            areaServed: "Utah",
          }),
        ]}
      />
      <PageBanner
        title="Utah Property Management Services"
        subtitle="Professional rental property management across the Wasatch Front"
        backgroundImage="/property-manager-meeting.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Property Management Solutions</h2>
            <p className="text-xl text-foreground/70">
              Let us handle the day-to-day management of your rental properties while you enjoy passive income. 
              Our comprehensive services cover everything from tenant placement to maintenance coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 text-primary">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Property Management?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Local Expertise</h4>
                    <p className="text-foreground/70">Deep knowledge of Utah real estate market and local regulations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Technology-Driven</h4>
                    <p className="text-foreground/70">Online portals for owners and tenants with real-time reporting</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Proven Track Record</h4>
                    <p className="text-foreground/70">Over 95% tenant retention rate and 99% on-time rent collection</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">24/7 Support</h4>
                    <p className="text-foreground/70">Round-the-clock emergency response and tenant support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/city-map-with-pin.png"
                alt="Utah property management service areas map showing Salt Lake City, Lehi, Provo, Orem, Sandy, Draper and surrounding communities served by Ondo Real Estate"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ConsultationCTA 
              title="Ready to Maximize Your Rental Income?"
              description="Get a free property management consultation and learn how our services can increase your rental income while reducing your workload."
              variant="card"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Property Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with our property management services and experience the difference professional management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-muted">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/properties">View Our Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service JSON-LD + Business JSON-LD with areaServed and sameAs */}
      <Script id="property-management-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Service'],
          name: 'Property Management Services',
          description: 'Full-service property management in Utah including tenant screening, rent collection, maintenance, and reporting.',
          provider: {
            '@type': ['Organization','LocalBusiness','RealEstateAgent'],
            name: SITE_NAME,
            url: SITE_URL,
            areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
            sameAs: SITE_SOCIALS
          },
          areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
          serviceType: 'Property Management',
          offers: { '@type': 'Offer', description: 'Professional rental property management services' },
        })}
      </Script>
      <Script id="property-management-business-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Organization','LocalBusiness','RealEstateAgent'],
          name: SITE_NAME,
          url: SITE_URL,
          areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
          sameAs: SITE_SOCIALS,
          makesOffer: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Property Management' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Buying' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Selling' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Loans' } }
          ]
        })}
      </Script>

      {/* Centralized FAQs live on /faq */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions about property management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Head to our Help Center for detailed FAQs for owners, tenants, payments, and more.
          </p>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            <Link href="/faq/owner-faqs">View Owner FAQs</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
