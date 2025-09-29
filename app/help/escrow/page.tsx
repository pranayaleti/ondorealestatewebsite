import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, FileText, Calculator, Phone, Mail, Clock, AlertCircle, CheckCircle } from "lucide-react"

export default function EscrowPage() {
  const escrowSteps = [
    {
      number: 1,
      title: "Opening Escrow",
      description: "Once your offer is accepted, escrow is opened with a neutral third party to hold funds and documents.",
      icon: <FileText className="h-6 w-6" />
    },
    {
      number: 2,
      title: "Deposit Earnest Money",
      description: "Your earnest money deposit is held in escrow as a sign of good faith and commitment to the purchase.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      number: 3,
      title: "Contingency Period",
      description: "During this time, inspections, appraisals, and loan approval are completed. You can back out if issues arise.",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      number: 4,
      title: "Final Walkthrough",
      description: "Inspect the property one final time to ensure it's in the agreed-upon condition.",
      icon: <FileText className="h-6 w-6" />
    },
    {
      number: 5,
      title: "Closing Day",
      description: "Sign all documents, pay closing costs, and receive the keys to your new home.",
      icon: <CheckCircle className="h-6 w-6" />
    }
  ]

  const faqs = [
    {
      question: "What is escrow?",
      answer: "Escrow is a neutral third-party process where funds and documents are held securely until all conditions of the real estate transaction are met. It protects both buyers and sellers during the home buying process."
    },
    {
      question: "How long does escrow typically take?",
      answer: "Escrow typically takes 30-45 days, depending on the complexity of the transaction, loan processing time, and any contingencies that need to be resolved."
    },
    {
      question: "What happens to my earnest money if the deal falls through?",
      answer: "It depends on the reason for cancellation. If you cancel within your contingency periods (inspection, appraisal, loan), you typically get your earnest money back. If you cancel outside these periods, the seller may be entitled to keep it."
    },
    {
      question: "Can I choose my own escrow company?",
      answer: "In Utah, either the buyer or seller can choose the escrow company, but it's typically negotiated during the offer process. Both parties must agree on the choice."
    },
    {
      question: "What are closing costs and who pays them?",
      answer: "Closing costs include various fees like title insurance, escrow fees, loan origination fees, and more. In Utah, these are typically split between buyer and seller, but the exact split is negotiable."
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Escrow Process & Information"
        description="Learn about the escrow process, timeline, and what to expect when buying or selling a home in Utah."
        pathname="/help/escrow"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Help", url: `${SITE_URL}/help` },
          { name: "Escrow", url: `${SITE_URL}/help/escrow` },
        ])}
      />
      <PageBanner
        title="Escrow Process & Information"
        subtitle="Understanding escrow in Utah real estate transactions"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">What is Escrow?</h2>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground">
                Escrow is a crucial part of the real estate transaction process that protects both buyers and sellers by ensuring all conditions are met before funds and property change hands.
              </p>
            </div>

            <div className="space-y-8 mb-12">
              {escrowSteps.map((step, index) => (
                <div key={step.number} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-muted dark:bg-card rounded-full flex items-center justify-center text-primary dark:text-primary font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-8 w-8 bg-muted dark:bg-card rounded-lg flex items-center justify-center text-primary dark:text-primary">
                            {step.icon}
                          </div>
                          <CardTitle className="dark:text-foreground">{step.title}</CardTitle>
                        </div>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted dark:bg-muted rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Key Escrow Terms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 dark:text-foreground">Earnest Money</h4>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    A deposit made by the buyer to show good faith and commitment to the purchase. Typically 1-3% of the purchase price.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 dark:text-foreground">Contingencies</h4>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    Conditions that must be met for the sale to proceed, such as inspection, appraisal, and loan approval.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 dark:text-foreground">Title Insurance</h4>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    Protection against title defects that could affect ownership rights to the property.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 dark:text-foreground">Closing Costs</h4>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    Various fees and expenses associated with finalizing the real estate transaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg dark:text-foreground">{faq.question}</CardTitle>
                      <CardDescription className="text-base">{faq.answer}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Need Help with Your Transaction?</h3>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6">
                Our experienced team can guide you through every step of the escrow process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/calculators/mortgage-payment">Calculate Closing Costs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
