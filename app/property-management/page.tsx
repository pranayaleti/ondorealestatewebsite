import { SITE_SOCIALS } from "@/lib/site"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Shield, DollarSign, Clock, Users, Home, Building } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Utah Property Management Services | Professional Rental Management",
  description: "Full-service property management in Utah. Tenant screening, rent collection, maintenance, and reporting. Serving Salt Lake City, Lehi, Provo, and surrounding areas.",
  keywords: [
    "Utah property management",
    "rental property management",
    "tenant screening Utah",
    "property management Salt Lake City",
    "Lehi property management",
    "Provo property management",
    "rent collection",
    "maintenance management",
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

const faqs = [
  {
    question: "What areas do you serve for property management?",
    answer: "We provide property management services across the Wasatch Front, including Salt Lake City, Lehi, Provo, Orem, Sandy, Draper, and surrounding Utah communities.",
  },
  {
    question: "What percentage do you charge for property management?",
    answer: "Our management fees typically range from 7-10% of monthly rent, depending on property type and services required. We provide transparent pricing with no hidden fees.",
  },
  {
    question: "How do you handle maintenance requests?",
    answer: "We provide 24/7 emergency response, coordinate with trusted local vendors, and offer online maintenance request systems for tenants. All repairs are tracked and reported to property owners.",
  },
  {
    question: "Do you screen tenants thoroughly?",
    answer: "Yes, we conduct comprehensive tenant screening including credit checks, background verification, employment verification, and reference checks to ensure quality tenants.",
  },
  {
    question: "How often do you inspect properties?",
    answer: "We perform regular property inspections quarterly, plus move-in and move-out inspections. Additional inspections can be scheduled as needed.",
  },
  {
    question: "What reporting do you provide to property owners?",
    answer: "Property owners receive detailed monthly financial reports, maintenance summaries, tenant communication logs, and annual property performance analysis.",
  },
  {
    question: "How quickly can you lease my property?",
    answer: "Well-presented, well-priced homes often lease within 7–21 days depending on seasonality and local comps. We share weekly activity updates.",
  },
  {
    question: "What are your management and leasing fees?",
    answer: "Management typically ranges 7–10% of collected rent and leasing is a one-time fee at tenant placement. Portfolio size and property type can adjust pricing.",
  },
  {
    question: "Do you require a maintenance reserve?",
    answer: "We maintain a small operating reserve to cover routine repairs. You approve non-emergency work above your chosen threshold.",
  },
  {
    question: "How do you handle evictions?",
    answer: "We follow Utah law for notices and timelines, coordinate with legal partners, and aim to minimize downtime and costs for owners.",
  },
  {
    question: "Do you allow pets at my property?",
    answer: "Pet policies are your choice. If allowed, we use pet screening, deposits, and pet rent to reduce risk and widen the applicant pool.",
  },
  {
    question: "When do I receive owner payouts?",
    answer: "Owner disbursements are processed monthly after rent clears and expenses are reconciled. Detailed statements are provided in your portal.",
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
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Utah Property Management Services", url: `${SITE_URL}/property-management/` },
        ])}
      />
      <PageBanner
        title="Utah Property Management Services"
        subtitle="Professional rental property management across the Wasatch Front"
        backgroundImage="/property-manager-meeting.png"
      />

      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Property Management Solutions</h2>
            <p className="text-xl text-gray-600">
              Let us handle the day-to-day management of your rental properties while you enjoy passive income. 
              Our comprehensive services cover everything from tenant placement to maintenance coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 text-blue-600">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Property Management?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Local Expertise</h4>
                    <p className="text-gray-600">Deep knowledge of Utah real estate market and local regulations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Technology-Driven</h4>
                    <p className="text-gray-600">Online portals for owners and tenants with real-time reporting</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Proven Track Record</h4>
                    <p className="text-gray-600">Over 95% tenant retention rate and 99% on-time rent collection</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">24/7 Support</h4>
                    <p className="text-gray-600">Round-the-clock emergency response and tenant support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/city-map-with-pin.png"
                alt="Utah property management service areas map"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Property Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with our property management services and experience the difference professional management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-foreground text-blue-600 hover:bg-gray-100">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-foreground hover:bg-foreground hover:text-blue-600">
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

      {/* FAQ JSON-LD */}
      <Script id="property-management-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        })}
      </Script>
    </>
  )
}
