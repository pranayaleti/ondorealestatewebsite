import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HelpCircle, Phone, Mail, MessageCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_PHONE, SITE_EMAILS } from "@/lib/site"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What services does OnDo Real Estate provide?",
          answer: "We provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, property marketing, financial reporting, and legal compliance management."
        },
        {
          question: "What areas do you serve?",
          answer: "We currently serve the greater Salt Lake City area, including Salt Lake City, Holladay, Midvale, Magna, and surrounding communities. We're continuously expanding to new areas."
        },
        {
          question: "How do I get started with your services?",
          answer: `Getting started is easy! Contact us through our website, call us at ${SITE_PHONE}, or email us at ${SITE_EMAILS.primary}. We'll schedule a consultation to discuss your needs.`
        }
      ]
    },
    {
      title: "For Property Owners",
      questions: [
        {
          question: "What are your management fees?",
          answer: "Our management fees typically range from 7-10% of monthly rent, depending on the property type and services required. We also charge a leasing fee of 50-75% of the first month's rent when placing a new tenant."
        },
        {
          question: "How do you screen tenants?",
          answer: "We conduct comprehensive tenant screening including credit checks, employment verification, rental history, and background checks. We use industry-standard criteria to ensure we place qualified tenants."
        },
        {
          question: "How often do you inspect properties?",
          answer: "We conduct move-in, move-out, and regular quarterly inspections. We also perform drive-by inspections monthly and full interior inspections annually."
        },
        {
          question: "How do you handle maintenance requests?",
          answer: "We have a 24/7 maintenance hotline and coordinate with licensed contractors. Emergency repairs are addressed immediately, while routine maintenance is scheduled efficiently."
        }
      ]
    },
    {
      title: "For Tenants",
      questions: [
        {
          question: "How do I apply for a rental property?",
          answer: "You can apply online through our website or contact us directly. We'll provide you with an application form and guide you through the process. There's a $40-50 application fee per adult."
        },
        {
          question: "What are your pet policies?",
          answer: "Pet policies vary by property. Some properties are pet-friendly with additional pet deposits and monthly pet rent. We'll discuss specific policies when you view a property."
        },
        {
          question: "How do I pay rent?",
          answer: "We offer multiple payment options including online payments through our portal, automatic bank transfers, and traditional check payments. Online payments are the most convenient and secure option."
        },
        {
          question: "What should I do if I have a maintenance issue?",
          answer: `Contact us immediately through our 24/7 maintenance hotline at ${SITE_PHONE} or submit a request through our online portal. We'll dispatch a qualified technician to address the issue.`
        }
      ]
    },
    {
      title: "Financial & Legal",
      questions: [
        {
          question: "How are security deposits handled?",
          answer: "Security deposits are held in a separate escrow account and returned within 30 days of move-out, minus any deductions for damages beyond normal wear and tear."
        },
        {
          question: "What happens if a tenant doesn't pay rent?",
          answer: "We follow a structured process including late notices, payment plans, and if necessary, legal eviction proceedings. We work with tenants to resolve payment issues whenever possible."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes, we are fully licensed property managers in Utah and carry comprehensive liability and errors & omissions insurance to protect our clients."
        },
        {
          question: "How do you handle legal compliance?",
          answer: "We stay current with all federal, state, and local housing laws including fair housing regulations, landlord-tenant laws, and safety requirements."
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Help Center FAQs"
        description="Answers to general, owner, tenant, and legal questions at Ondo Real Estate."
        pathname="/help/faq"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Help", url: `${SITE_URL}/help` },
          { name: "FAQ", url: `${SITE_URL}/help/faq` },
        ])}
      />
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our property management services"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">Get Your Questions Answered</h2>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground">
                Can't find what you're looking for? Contact us directly and we'll be happy to help.
              </p>
            </div>

            <div className="space-y-8 mb-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-xl font-semibold mb-4 dark:text-foreground flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {category.title}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border border-gray-200 dark:border-border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                          <span className="font-medium dark:text-foreground">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <p className="text-muted-foreground dark:text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="bg-muted dark:bg-muted rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 dark:text-foreground">Still Have Questions?</h3>
                <p className="text-muted-foreground dark:text-muted-foreground mb-6">
                  Our team is here to help with any questions you may have about our services.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardHeader>
                      <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg dark:text-foreground">Call Us</CardTitle>
                      <CardDescription>{SITE_PHONE}</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="text-center">
                    <CardHeader>
                      <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg dark:text-foreground">Email Us</CardTitle>
                      <CardDescription>{SITE_EMAILS.primary}</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="text-center">
                    <CardHeader>
                      <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg dark:text-foreground">Live Chat</CardTitle>
                      <CardDescription>Available 24/7</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className="mt-6">
                  <Button asChild size="lg">
                    <Link href="/contact">Contact Us Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
