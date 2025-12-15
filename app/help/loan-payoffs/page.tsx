import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_PHONE } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calculator, FileText, Phone, Mail, Clock, CheckCircle, DollarSign, AlertCircle } from "lucide-react"

export default function LoanPayoffsPage() {
  const payoffMethods = [
    {
      title: "Full Payoff",
      description: "Pay off the entire remaining balance of your loan at once.",
      icon: <DollarSign className="h-6 w-6" />,
      benefits: ["Complete ownership", "No more monthly payments", "Interest savings"],
      considerations: ["Large lump sum required", "Opportunity cost of capital"]
    },
    {
      title: "Partial Payoff",
      description: "Make an extra payment toward your principal balance.",
      icon: <Calculator className="h-6 w-6" />,
      benefits: ["Reduced interest", "Faster payoff", "Flexible amount"],
      considerations: ["Still have monthly payments", "May have prepayment penalties"]
    },
    {
      title: "Refinance",
      description: "Replace your current loan with a new one, often with better terms.",
      icon: <FileText className="h-6 w-6" />,
      benefits: ["Lower interest rate", "Different loan terms", "Cash-out option"],
      considerations: ["Closing costs", "New qualification required", "Rate environment"]
    }
  ]

  const payoffSteps = [
    {
      number: 1,
      title: "Request Payoff Quote",
      description: "Contact us to get an official payoff statement with the exact amount needed and valid dates."
    },
    {
      number: 2,
      title: "Review Terms",
      description: "Check for any prepayment penalties, interest calculations, and payoff validity period."
    },
    {
      number: 3,
      title: "Arrange Funds",
      description: "Ensure you have the necessary funds available, including any additional fees or costs."
    },
    {
      number: 4,
      title: "Submit Payment",
      description: "Make the payoff payment before the quote expiration date to ensure accuracy."
    },
    {
      number: 5,
      title: "Receive Confirmation",
      description: "Get official confirmation that your loan has been paid in full and lien released."
    }
  ]

  const faqs = [
    {
      question: "How do I get a payoff quote?",
      answer: "Contact our loan servicing department by phone, email, or through your online account. We'll provide an official payoff statement with the exact amount and validity period."
    },
    {
      question: "How long is a payoff quote valid?",
      answer: "Payoff quotes are typically valid for 10-15 business days. After this period, you'll need to request a new quote as interest accrues daily."
    },
    {
      question: "Are there prepayment penalties?",
      answer: "This depends on your specific loan terms. Some loans have prepayment penalties, especially in the first few years. We'll include any penalties in your payoff quote."
    },
    {
      question: "Can I make a partial payoff?",
      answer: "Yes, you can make extra principal payments at any time. This reduces your total interest and can help pay off your loan faster."
    },
    {
      question: "What happens after I pay off my loan?",
      answer: "We'll process the payoff, release the lien on your property, and send you a satisfaction of mortgage document. You'll also receive a final statement."
    },
    {
      question: "Can I pay off my loan online?",
      answer: "Yes, you can make payments through our online portal. For full payoffs, we recommend contacting us first to ensure you have the correct amount."
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Loan Payoff Information & Process"
        description="Learn how to pay off your mortgage loan, get payoff quotes, and understand the payoff process in Utah."
        pathname="/help/loan-payoffs"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Help", url: `${SITE_URL}/help` },
          { name: "Loan Payoffs", url: `${SITE_URL}/help/loan-payoffs` },
        ])}
      />
      <PageBanner
        title="Loan Payoff Information"
        subtitle="Everything you need to know about paying off your mortgage"
      />

      <section className="py-16 bg-background dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">Pay Off Your Loan</h2>
              <p className="text-lg text-foreground/70 dark:text-foreground/70">
                Whether you're ready to pay off your entire loan or want to make extra payments, we're here to help you through the process.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Payoff Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {payoffMethods.map((method, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-muted dark:bg-card rounded-lg flex items-center justify-center text-primary dark:text-primary">
                          {method.icon}
                        </div>
                        <CardTitle className="dark:text-foreground">{method.title}</CardTitle>
                      </div>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300 mb-2">Benefits:</p>
                          <ul className="text-sm text-foreground/70 dark:text-foreground/70 space-y-1">
                            {method.benefits.map((benefit, idx) => (
                              <li key={idx}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300 mb-2">Considerations:</p>
                          <ul className="text-sm text-foreground/70 dark:text-foreground/70 space-y-1">
                            {method.considerations.map((consideration, idx) => (
                              <li key={idx}>• {consideration}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">How to Pay Off Your Loan</h3>
              <div className="space-y-6">
                {payoffSteps.map((step, index) => (
                  <div key={step.number} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-muted dark:bg-card rounded-full flex items-center justify-center text-primary dark:text-primary font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Card>
                        <CardHeader>
                          <CardTitle className="dark:text-foreground">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted dark:bg-card/20 rounded-lg p-8 mb-12">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary dark:text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-4 dark:text-foreground">Important Payoff Information</h3>
                  <ul className="space-y-2 text-foreground dark:text-gray-300">
                    <li>• Payoff quotes are valid for 10-15 business days</li>
                    <li>• Interest accrues daily, so timing matters</li>
                    <li>• Check for prepayment penalties before paying off</li>
                    <li>• Ensure you have the exact amount including all fees</li>
                    <li>• Keep records of all payoff transactions</li>
                    <li>• Contact us if you have questions about the process</li>
                  </ul>
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
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Ready to Pay Off Your Loan?</h3>
              <p className="text-lg text-foreground/70 dark:text-foreground/70 mb-6">
                Get a payoff quote or speak with our team about your options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Request Payoff Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/calculators/mortgage-payment">Calculate Savings</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`tel:${SITE_PHONE.replace(/[^+\\d]/g, "")}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call {SITE_PHONE}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
