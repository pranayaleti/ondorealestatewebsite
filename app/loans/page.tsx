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
import { CheckCircle, DollarSign, Shield, Clock, Users, Home, Calculator } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Utah Home Loans & Mortgages | Conventional, FHA, VA, USDA | Salt Lake City, Lehi, Provo",
  description: "Get pre-approved for Utah home loans including conventional, FHA, VA, and USDA mortgages. Expert loan officers serving Salt Lake City, Lehi, Provo, and surrounding areas.",
  keywords: [
    // Core
    "Utah home loans",
    "Utah mortgages",
    "mortgage lender Utah",
    "mortgage pre-approval Utah",
    "Utah mortgage rates",
    // Programs
    "conventional loans Utah",
    "FHA loans Utah",
    "VA loans Utah",
    "USDA loans Utah",
    "jumbo loans Utah",
    "refinance Utah",
    // Geos
    "Salt Lake City mortgages",
    "Lehi home loans",
    "Provo mortgages",
    "Utah mortgage rates",
  ],
  alternates: {
    canonical: `${SITE_URL}/loans/`,
  },
  openGraph: {
    title: "Utah Home Loans & Mortgages | Conventional, FHA, VA, USDA",
    description: "Get pre-approved for Utah home loans including conventional, FHA, VA, and USDA mortgages.",
    url: `${SITE_URL}/loans/`,
    images: [
      {
        url: `${SITE_URL}/modern-office-building.png`,
        width: 1200,
        height: 630,
        alt: "Utah mortgage and loan services",
      },
    ],
  },
}

const loanTypes = [
  {
    icon: <Home className="h-8 w-8" />,
    title: "Conventional Loans",
    description: "Traditional mortgages with competitive rates for qualified borrowers with good credit.",
    features: ["3% down payment", "No PMI with 20% down", "Flexible terms"],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "FHA Loans",
    description: "Government-backed loans with lower down payment requirements and flexible credit standards.",
    features: ["3.5% down payment", "Lower credit requirements", "Gift funds allowed"],
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "VA Loans",
    description: "Exclusive benefits for veterans, active military, and eligible spouses with no down payment required.",
    features: ["0% down payment", "No PMI required", "Competitive rates"],
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "USDA Loans",
    description: "Rural development loans for eligible properties in designated rural areas with no down payment.",
    features: ["0% down payment", "Low interest rates", "Rural area eligibility"],
  },
]

const faqs = [
  {
    question: "What types of home loans do you offer in Utah?",
    answer: "We offer conventional, FHA, VA, USDA, and jumbo loans. Our loan officers help you find the best program based on your financial situation, property location, and goals.",
  },
  {
    question: "How do I get pre-approved for a mortgage?",
    answer: "Start by completing our online application or contacting our loan officers. We'll review your income, credit, and assets to provide a pre-approval letter that strengthens your buying power.",
  },
  {
    question: "What are current Utah mortgage rates?",
    answer: "Mortgage rates change daily and vary by loan type, credit score, and down payment. Contact our loan officers for current rates and personalized quotes based on your situation.",
  },
  {
    question: "How long does the loan process take?",
    answer: "Typically 30-45 days from application to closing, though this can vary based on loan type and complexity. We work efficiently to meet your timeline and closing date.",
  },
  {
    question: "Do you offer first-time home buyer programs?",
    answer: "Yes, we work with various first-time buyer programs including down payment assistance, low down payment options, and special rate programs available in Utah.",
  },
  {
    question: "Can I refinance my existing Utah mortgage?",
    answer: "Absolutely! We offer rate and term refinancing, cash-out refinancing, and streamline refinancing for FHA and VA loans to help you lower payments or access equity.",
  },
  {
    question: "What down payment do I need?",
    answer: "Conventional loans can start at 3% down, FHA at 3.5%, and VA/USDA may be 0% for eligible borrowers. We’ll confirm your options.",
  },
  {
    question: "How are closing costs calculated?",
    answer: "Expect 2–3% of price for lender/title/prepaids. We can explore seller credits and lender options to reduce cash to close.",
  },
  {
    question: "When does PMI apply and can I remove it?",
    answer: "PMI typically applies to conventional loans with <20% down and can be removed as equity grows per investor rules.",
  },
  {
    question: "I’m self‑employed—what documents are needed?",
    answer: "Usually two years of returns, YTD P&L, and bank statements. Some programs allow alternatives with conditions.",
  },
  {
    question: "Should I buy points or use a temporary buydown?",
    answer: "Points lower the rate for the life of the loan; buydowns reduce payments for 1–3 years. We’ll model both to compare.",
  },
  {
    question: "How long does underwriting take?",
    answer: "Underwriting commonly takes 24–72 hours after a complete file. Clear communication and fast document turnarounds keep things moving.",
  },
]

export default function LoansPage() {
  return (
    <>
      <SEO
        title="Utah Home Loans & Mortgages | Conventional, FHA, VA, USDA"
        description="Get pre-approved for Utah home loans including conventional, FHA, VA, and USDA mortgages."
        pathname="/loans/"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Utah Home Loans & Mortgages", url: `${SITE_URL}/loans/` },
        ])}
      />
      <PageBanner
        title="Utah Home Loans & Mortgages"
        subtitle="Get pre-approved for the best mortgage rates and loan programs across Utah"
        backgroundImage="/modern-office-building.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find the Perfect Loan for Your Utah Home</h2>
            <p className="text-xl text-muted-foreground">
              Our experienced loan officers help you navigate the mortgage process and find the best 
              loan program with competitive rates and terms that fit your financial situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="text-primary mr-4">{loan.icon}</div>
                    <CardTitle className="text-xl">{loan.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">{loan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {loan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Loan Services?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Competitive Rates</h4>
                    <p className="text-muted-foreground">Access to multiple lenders and loan programs for the best rates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Local Expertise</h4>
                    <p className="text-muted-foreground">Deep understanding of Utah real estate market and local programs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Fast Processing</h4>
                    <p className="text-muted-foreground">Streamlined application process with quick pre-approvals and closings</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Personalized Service</h4>
                    <p className="text-muted-foreground">Dedicated loan officer guidance throughout the entire process</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/city-map-with-pin.png"
                alt="Utah mortgage service areas map"
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

      <section className="py-16 bg-orange-600 text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Pre-Approved?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your mortgage application today and get pre-approved for your Utah home purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-card text-primary hover:bg-muted">
              <Link href="/contact">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-foreground hover:bg-card hover:text-primary">
              <Link href="/calculators">Calculate Payment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service JSON-LD + Business JSON-LD */}
      <Script id="loans-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Service'],
          name: 'Home Loan Services',
          description: 'Utah home loans including conventional, FHA, VA, and USDA mortgages with competitive rates.',
          provider: {
            '@type': ['Organization','LocalBusiness','RealEstateAgent'],
            name: SITE_NAME,
            url: SITE_URL,
            areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
            sameAs: SITE_SOCIALS
          },
          areaServed: ['Lehi UT','Salt Lake City UT','Draper UT','Utah County'],
          serviceType: 'Financial Services',
          offers: { '@type': 'Offer', description: 'Professional mortgage and home loan services' },
        })}
      </Script>
      <Script id="loans-business-jsonld" type="application/ld+json" strategy="afterInteractive">
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
      <Script id="loans-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
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
