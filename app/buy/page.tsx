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
import { CheckCircle, Home, Search, DollarSign, Shield, Users, MapPin } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Buy Homes in Utah | Expert Real Estate Agents | Salt Lake City, Lehi, Provo",
  description: "Find your dream home in Utah with expert real estate agents. Browse homes for sale in Salt Lake City, Lehi, Provo, and surrounding areas. Get pre-approved for a mortgage.",
  keywords: [
    // Core
    "homes for sale Utah",
    "houses for sale Utah",
    "real estate Utah",
    "Utah real estate listings",
    // Buyer intent
    "buy house Utah",
    "Utah home buying",
    "first-time home buyer Utah",
    "down payment assistance Utah",
    "Utah closing costs",
    // Geos
    "Salt Lake City homes for sale",
    "Lehi homes for sale",
    "Provo homes for sale",
    "Orem homes for sale",
    "Sandy homes for sale",
    "Draper homes for sale",
    // Finance
    "mortgage pre-approval Utah",
    "Utah mortgage rates",
  ],
  alternates: {
    canonical: `${SITE_URL}/buy/`,
  },
  openGraph: {
    title: "Buy Homes in Utah | Expert Real Estate Agents",
    description: "Find your dream home in Utah with expert real estate agents. Browse homes for sale across the Wasatch Front.",
    url: `${SITE_URL}/buy/`,
    images: [
      {
        url: `${SITE_URL}/suburban-house-garden.png`,
        width: 1200,
        height: 630,
        alt: "Beautiful Utah home for sale",
      },
    ],
  },
}

const services = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Property Search & Discovery",
    description: "Advanced MLS search tools and personalized property recommendations based on your criteria.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Mortgage Pre-Approval",
    description: "Connect with trusted lenders to get pre-approved and strengthen your buying power.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Negotiation & Contracts",
    description: "Expert negotiation skills to secure the best price and terms for your new home.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Closing Support",
    description: "Complete guidance through inspections, appraisals, and closing process.",
  },
]

const faqs = [
  {
    question: "How do I get started with buying a home in Utah?",
    answer: "Start by getting pre-approved for a mortgage, then work with our agents to define your criteria and search areas. We'll help you navigate the entire process from search to closing.",
  },
  {
    question: "What areas do you serve for home buying?",
    answer: "We serve the entire Wasatch Front including Salt Lake City, Lehi, Provo, Orem, Sandy, Draper, American Fork, Pleasant Grove, and surrounding Utah communities.",
  },
  {
    question: "Do you help with first-time home buyers?",
    answer: "Absolutely! We specialize in guiding first-time buyers through the entire process, including down payment assistance programs, first-time buyer incentives, and educational resources.",
  },
  {
    question: "What's the current Utah real estate market like?",
    answer: "The Utah market varies by location, but generally offers good value with strong appreciation potential. Our agents provide current market analysis and pricing guidance for your target areas.",
  },
  {
    question: "How much do your real estate services cost for buyers?",
    answer: "Our buyer representation is typically free to you - the seller pays the commission. We're committed to providing excellent service without additional fees to buyers.",
  },
  {
    question: "Can you help with new construction homes?",
    answer: "Yes, we work with both existing homes and new construction. We can help you navigate builder contracts, upgrades, and the construction timeline process.",
  },
  {
    question: "How much should I budget for closing costs?",
    answer: "Plan for roughly 2–3% of the purchase price for lender, title, and prepaid items. We can also negotiate seller credits when appropriate.",
  },
  {
    question: "How do I compete in multiple-offer situations?",
    answer: "We tailor terms like escalation clauses, appraisal gap strategies, timelines, and earnest money while protecting key contingencies.",
  },
  {
    question: "What inspections are recommended?",
    answer: "General home inspection plus specialty inspections as needed (radon, sewer, roof, structural). We coordinate and advise on findings.",
  },
  {
    question: "What is earnest money and is it refundable?",
    answer: "Earnest money is a good-faith deposit applied at closing. It is typically refundable if you cancel within contractual contingency timelines.",
  },
  {
    question: "How long does a typical purchase take?",
    answer: "Most financed purchases close in 30–45 days after acceptance. Cash purchases can close faster depending on title and inspections.",
  },
  {
    question: "Can I buy before I sell my current home?",
    answer: "Yes. We explore bridge loans, HELOCs, or contract terms like leasebacks to align both timelines with minimal risk.",
  },
]

export default function BuyPage() {
  return (
    <>
      <SEO
        title="Buy Homes in Utah | Expert Real Estate Agents"
        description="Find your dream home in Utah with expert real estate agents. Browse homes for sale across the Wasatch Front."
        pathname="/buy/"
        image={`${SITE_URL}/suburban-house-garden.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Buy Homes in Utah", url: `${SITE_URL}/buy/` },
        ])}
      />
      <PageBanner
        title="Buy Homes in Utah"
        subtitle="Find your dream home with expert real estate agents across the Wasatch Front"
        backgroundImage="/suburban-house-garden.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Utah Home Buying Journey Starts Here</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're a first-time buyer or looking to upgrade, our experienced agents will guide you 
              through every step of finding and purchasing your perfect Utah home.
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
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Home Buying Services?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Local Market Expertise</h4>
                    <p className="text-muted-foreground">Deep knowledge of Utah neighborhoods, schools, and market trends</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Advanced Search Tools</h4>
                    <p className="text-muted-foreground">Access to exclusive listings and advanced MLS search capabilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Negotiation Excellence</h4>
                    <p className="text-muted-foreground">Proven track record of securing the best deals for our clients</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Full-Service Support</h4>
                    <p className="text-muted-foreground">Complete guidance from initial search through closing and beyond</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/modern-townhouse-garage.png"
                alt="Modern Utah townhouse for sale"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600 text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Utah Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your home buying journey with expert guidance and local market knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-card text-primary hover:bg-muted">
              <Link href="/contact">Start Your Search</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-foreground hover:bg-card hover:text-primary">
              <Link href="/properties">Browse Listings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service JSON-LD + Business JSON-LD */}
      <Script id="buy-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Service'],
          name: 'Home Buying Services',
          description: 'Expert real estate agents helping buyers find and purchase homes in Utah.',
          provider: {
            '@type': ['Organization','LocalBusiness','RealEstateAgent'],
            name: SITE_NAME,
            url: SITE_URL,
            areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
            sameAs: SITE_SOCIALS
          },
          areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
          serviceType: 'Real Estate Sales',
          offers: { '@type': 'Offer', description: 'Professional home buying representation and guidance' },
        })}
      </Script>
      <Script id="buy-business-jsonld" type="application/ld+json" strategy="afterInteractive">
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
      <Script id="buy-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
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
