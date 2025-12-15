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
import { CheckCircle, Camera, Users, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import ConsultationCTA from "@/components/ConsultationCTA"

export const metadata: Metadata = {
  title: "Sell Your Utah Home | Expert Real Estate Agents | Salt Lake City, Lehi, Provo",
  description: "Sell your Utah home for top dollar with expert real estate agents. Professional marketing, pricing strategy, and negotiation. Serving Salt Lake City, Lehi, Provo, and surrounding areas.",
  keywords: [
    // Seller intent
    "sell house Utah",
    "home valuation Utah",
    "list my home Utah",
    "sell my house fast Utah",
    // Core
    "real estate Utah",
    "Utah real estate agents",
    // Geos
    "Salt Lake City real estate agents",
    "Lehi real estate agents",
    "Provo real estate agents",
    // Services
    "professional home staging Utah",
    "real estate marketing Utah",
    "CMA Utah",
  ],
  alternates: {
    canonical: `${SITE_URL}/sell/`,
  },
  openGraph: {
    title: "Sell Your Utah Home | Expert Real Estate Agents",
    description: "Sell your Utah home for top dollar with expert real estate agents. Professional marketing and pricing strategy.",
    url: `${SITE_URL}/sell/`,
    images: [
      {
        url: `${SITE_URL}/modern-apartment-balcony.png`,
        width: 1200,
        height: 630,
        alt: "Beautiful Utah home for sale",
      },
    ],
  },
}

const services = [
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Market Analysis & Pricing",
    description: "Comprehensive market analysis to price your home competitively and maximize your return.",
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Professional Marketing",
    description: "High-quality photography, virtual tours, and multi-channel marketing to attract qualified buyers.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Buyer Showings & Open Houses",
    description: "Coordinated showings and strategic open houses to showcase your home's best features.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Negotiation & Closing",
    description: "Expert negotiation skills to secure the best offers and guide you through the closing process.",
  },
]

const faqs = [
  {
    question: "How do you determine the right price for my home?",
    answer: "We conduct a comprehensive comparative market analysis (CMA) using recent sales data, current market conditions, and your home's unique features to determine the optimal listing price for maximum return.",
  },
  {
    question: "What areas do you serve for home selling?",
    answer: "We serve the entire Wasatch Front including Salt Lake City, Lehi, Provo, Orem, Sandy, Draper, American Fork, Pleasant Grove, and surrounding Utah communities.",
  },
  {
    question: "How long does it typically take to sell a home in Utah?",
    answer: "The average time on market varies by location and price point, but well-priced homes in good condition typically sell within 30-60 days. Our marketing strategies help accelerate the selling process.",
  },
  {
    question: "What marketing strategies do you use?",
    answer: "We use professional photography, virtual tours, MLS listings, social media marketing, targeted online advertising, and traditional marketing methods to reach the widest pool of qualified buyers.",
  },
  {
    question: "Do you help with home staging and preparation?",
    answer: "Yes, we provide staging recommendations and can connect you with professional stagers. We also offer guidance on repairs, improvements, and decluttering to maximize your home's appeal.",
  },
  {
    question: "What are your commission rates?",
    answer: "Our commission rates are competitive and vary based on the services provided. We offer flexible pricing options and always provide transparent, upfront information about all costs.",
  },
  {
    question: "How should I prepare my home before listing?",
    answer: "Declutter, deep clean, complete minor repairs, refresh paint where needed, and enhance curb appeal. We provide a customized prep checklist.",
  },
  {
    question: "Do you recommend staging?",
    answer: "Yes—professional staging or light styling often increases buyer interest and sale price. We offer tailored recommendations and vendor referrals.",
  },
  {
    question: "How do showings and open houses work?",
    answer: "We coordinate private showings and strategic open houses aligned to buyer traffic patterns, with feedback shared through your client portal.",
  },
  {
    question: "What happens after we receive an offer?",
    answer: "We review terms (price, financing, appraisal, concessions, timelines) and negotiate for strongest net and certainty to close.",
  },
  {
    question: "Who pays for repairs after inspection?",
    answer: "It’s negotiable. We recommend focusing on health/safety and major systems. Credits, repairs, or warranties can resolve concerns efficiently.",
  },
  {
    question: "How long is a typical listing period?",
    answer: "Most listings run 60–90 days to cover market exposure and seasonal patterns. We review performance every two weeks and adjust strategy.",
  },
  {
    question: "Can I cancel the listing?",
    answer: "We believe in flexible, performance-driven agreements. If expectations aren’t met, we discuss options and next steps transparently.",
  },
]

export default function SellPage() {
  return (
    <>
      <SEO
        title="Sell Your Utah Home | Expert Real Estate Agents"
        description="Sell your Utah home for top dollar with expert real estate agents. Professional marketing and pricing strategy."
        pathname="/sell/"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={[
          generateBreadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Sell Your Utah Home", url: `${SITE_URL}/sell/` },
          ]),
          generateServiceJsonLd({
            name: "Utah home selling services",
            description: "Pricing strategy, marketing, and negotiations to sell Utah homes faster.",
            serviceType: "Home Selling",
            areaServed: "Utah",
          }),
        ]}
      />
      <PageBanner
        title="Sell Your Utah Home"
        subtitle="Get top dollar for your home with expert real estate agents across the Wasatch Front"
        backgroundImage="/modern-apartment-balcony.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Maximize Your Home's Value</h2>
            <p className="text-xl text-foreground/70">
              Our proven selling strategies and local market expertise help you get the best price 
              for your Utah home while minimizing stress and time on market.
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
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Home Selling Services?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Proven Results</h4>
                    <p className="text-foreground/70">Consistently achieve above-market prices with faster sales times</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Local Market Mastery</h4>
                    <p className="text-foreground/70">Deep understanding of Utah market trends and buyer preferences</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Professional Marketing</h4>
                    <p className="text-foreground/70">High-quality photography, virtual tours, and multi-channel marketing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Stress-Free Process</h4>
                    <p className="text-foreground/70">Complete guidance and support throughout the entire selling process</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/modern-office-building.png"
                alt="Professional OnDo Real Estate office building in Utah representing expert home selling services"
                className="w-full h-full object-cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
              title="Ready to Sell Your Utah Home?"
              description="Get a free home valuation and expert selling strategy from our Utah real estate professionals. Learn how to maximize your home's value and selling potential."
              variant="card"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Utah Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free home valuation and discover how we can help you sell for top dollar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-background text-primary hover:bg-muted">
              <Link href="/contact">Get Free Valuation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-foreground hover:bg-background hover:text-primary">
              <Link href="/properties">View Market Trends</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service JSON-LD + Business JSON-LD */}
      <Script id="sell-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Service'],
          name: 'Home Selling Services',
          description: 'Expert real estate agents helping sellers maximize their home value in Utah.',
          provider: {
            '@type': ['Organization','LocalBusiness','RealEstateAgent'],
            name: SITE_NAME,
            url: SITE_URL,
            areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
            sameAs: SITE_SOCIALS
          },
          areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
          serviceType: 'Real Estate Sales',
          offers: { '@type': 'Offer', description: 'Professional home selling representation and marketing' },
        })}
      </Script>
      <Script id="sell-business-jsonld" type="application/ld+json" strategy="afterInteractive">
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
      <Script id="sell-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
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
