import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd, generateFAQJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_EMAILS } from "@/lib/site"

const faqItems = [
  {
    question: "How do I apply for a property?",
    answer:
      'You can apply for a property by clicking the "View Details" button on any property listing. This will open an application form where you can provide your information. Once submitted, a property manager will review your application and contact you within 1-2 business days.',
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "For a complete rental application, you'll typically need proof of income (pay stubs, tax returns, or bank statements), photo ID, references from previous landlords, and authorization for a credit and background check. Having these documents ready will speed up your application process.",
  },
  {
    question: "How much is the security deposit?",
    answer:
      "Security deposits typically equal one month's rent, but may vary based on the property and your application details. The exact amount will be specified in your lease agreement. Security deposits are fully refundable at the end of your lease, minus any charges for damages beyond normal wear and tear.",
  },
  {
    question: "How do I report maintenance issues?",
    answer:
      "You can report maintenance issues through our tenant portal, by email, or by phone for emergencies. Our maintenance team responds to emergency requests within 24 hours and non-emergency requests within 2-3 business days. We provide 24/7 emergency maintenance support for issues like water leaks, heating failures, or security concerns.",
  },
  {
    question: "Can I have pets in my rental?",
    answer:
      "Pet policies vary by property. Properties that allow pets typically require an additional pet deposit and/or monthly pet rent. Breed and size restrictions may apply. Service animals are accommodated according to fair housing laws and are exempt from pet fees.",
  },
  {
    question: "What services do you offer property owners?",
    answer:
      "We offer comprehensive property management services including tenant screening and placement, rent collection, property maintenance, financial reporting, legal compliance, and property marketing. We can customize our services based on your specific needs and property requirements.",
  },
  {
    question: "How do you screen potential tenants?",
    answer:
      "Our thorough screening process includes credit checks, criminal background checks, employment verification, income verification (requiring income of 3x the monthly rent), rental history verification, and personal references. This comprehensive approach helps us find reliable, responsible tenants for your property.",
  },
  {
    question: "What are your management fees?",
    answer:
      "Our management fees typically range from 7-10% of monthly collected rent, depending on the property type, size, and services required. We also charge a leasing fee of 50-75% of the first month's rent for new tenant placement. We don't get paid unless you get paid, aligning our interests with yours.",
  },
  {
    question: "How do you handle maintenance and repairs?",
    answer:
      "We have a network of licensed, insured, and vetted contractors who provide quality work at reasonable rates. For minor repairs (typically under $500), we handle them without owner approval to ensure prompt service. For larger repairs, we consult with you, provide estimates, and proceed with your approval.",
  },
  {
    question: "How often will I receive statements and payments?",
    answer:
      "Property owners receive detailed monthly statements showing all income and expenses. Rent payments, minus management fees and any maintenance costs, are directly deposited to your bank account by the 15th of each month. You'll also receive annual statements for tax purposes and have 24/7 access to your property's financial information through our owner portal.",
  },
]

export default function FAQPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "FAQ", url: `${SITE_URL}/faq` },
  ])

  const faqJsonLd = generateFAQJsonLd(faqItems)

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="FAQs | Property Management & Rentals"
        description="Find answers to common questions about our property management services and renting with Ondo Real Estate."
        pathname="/faq"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={[breadcrumbJsonLd, faqJsonLd]}
      />
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our property management and rental services"
      />

      <main className="flex-1 py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">For Tenants</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-white">How do I apply for a property?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    You can apply for a property by clicking the "View Details" button on any property listing. This
                    will open an application form where you can provide your information. Once submitted, a property
                    manager will review your application and contact you within 1-2 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-white">What documents do I need to apply?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    For a complete rental application, you'll typically need proof of income (pay stubs, tax returns, or
                    bank statements), photo ID, references from previous landlords, and authorization for a credit and
                    background check. Having these documents ready will speed up your application process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-white">How much is the security deposit?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Security deposits typically equal one month's rent, but may vary based on the property and your
                    application details. The exact amount will be specified in your lease agreement. Security deposits
                    are fully refundable at the end of your lease, minus any charges for damages beyond normal wear and
                    tear.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-white">How do I report maintenance issues?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    You can report maintenance issues through our tenant portal, by email, or by phone for emergencies.
                    Our maintenance team responds to emergency requests within 24 hours and non-emergency requests
                    within 2-3 business days. We provide 24/7 emergency maintenance support for issues like water leaks,
                    heating failures, or security concerns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-white">Can I have pets in my rental?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Pet policies vary by property. Properties that allow pets typically require an additional pet
                    deposit and/or monthly pet rent. Breed and size restrictions may apply. Service animals are
                    accommodated according to fair housing laws and are exempt from pet fees.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">For Property Owners</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="owner-1">
                  <AccordionTrigger className="text-white">What services do you offer property owners?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We offer comprehensive property management services including tenant screening and placement, rent
                    collection, property maintenance, financial reporting, legal compliance, and property marketing. We
                    can customize our services based on your specific needs and property requirements.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-2">
                  <AccordionTrigger className="text-white">How do you screen potential tenants?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Our thorough screening process includes credit checks, criminal background checks, employment
                    verification, income verification (requiring income of 3x the monthly rent), rental history
                    verification, and personal references. This comprehensive approach helps us find reliable,
                    responsible tenants for your property.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-3">
                  <AccordionTrigger className="text-white">What are your management fees?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Our management fees typically range from 7-10% of monthly collected rent, depending on the property
                    type, size, and services required. We also charge a leasing fee of 50-75% of the first month's rent
                    for new tenant placement. We don't get paid unless you get paid, aligning our interests with yours.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-4">
                  <AccordionTrigger className="text-white">How do you handle maintenance and repairs?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We have a network of licensed, insured, and vetted contractors who provide quality work at
                    reasonable rates. For minor repairs (typically under $500), we handle them without owner approval to
                    ensure prompt service. For larger repairs, we consult with you, provide estimates, and proceed with
                    your approval.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-5">
                  <AccordionTrigger className="text-white">How often will I receive statements and payments?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Property owners receive detailed monthly statements showing all income and expenses. Rent payments,
                    minus management fees and any maintenance costs, are directly deposited to your bank account by the
                    15th of each month. You'll also receive annual statements for tax purposes and have 24/7 access to
                    your property's financial information through our owner portal.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-muted/20 rounded-lg p-8 md:p-12 border border-border">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Have another question?
              </h3>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our team is here to help. Send us an email or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${SITE_EMAILS.info}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:opacity-90 transition-colors duration-200"
                >
                  Send us an email
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-background hover:bg-muted transition-colors duration-200"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer rendered globally in RootLayout */}
    </div>
  )
}
