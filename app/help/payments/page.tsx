import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreditCard, Calendar, AlertCircle, Phone, Mail, Clock } from "lucide-react"

export default function PaymentQuestionsPage() {
  const paymentMethods = [
    {
      title: "Online Payment Portal",
      description: "Make secure payments 24/7 through our online portal",
      icon: <CreditCard className="h-6 w-6" />,
      features: ["Secure online payments", "Payment history", "Auto-pay setup", "Mobile-friendly"]
    },
    {
      title: "Phone Payments",
      description: "Call our automated payment system or speak with a representative",
      icon: <Phone className="h-6 w-6" />,
      features: ["24/7 automated system", "Live representative", "Quick payment processing", "Confirmation provided"]
    },
    {
      title: "Mail Payments",
      description: "Send payments via mail using the provided payment coupon",
      icon: <Mail className="h-6 w-6" />,
      features: ["Payment coupon required", "Allow 5-7 business days", "Include account number", "Send to correct address"]
    }
  ]

  const faqs = [
    {
      question: "When is my payment due?",
      answer: "Your payment is due on the 1st of each month. You have a 15-day grace period before any late fees are assessed."
    },
    {
      question: "How can I change my payment due date?",
      answer: "Contact our customer service team to discuss changing your payment due date. Some restrictions may apply."
    },
    {
      question: "What happens if I miss a payment?",
      answer: "If you miss a payment, you may be charged a late fee after the grace period. Contact us immediately if you're having trouble making payments."
    },
    {
      question: "Can I make extra payments?",
      answer: "Yes! You can make extra payments at any time. These will be applied to your principal balance, helping you pay off your loan faster."
    },
    {
      question: "How do I set up automatic payments?",
      answer: "You can set up automatic payments through our online portal or by calling customer service. You can choose the payment amount and date."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept checking accounts, savings accounts, and debit cards. Credit card payments may have additional fees."
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Payment Questions & Support"
        description="Learn about payment due dates, methods, auto-pay, and support options for your mortgage payments."
        pathname="/help/payments"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Help", url: `${SITE_URL}/help` },
          { name: "Payments", url: `${SITE_URL}/help/payments` },
        ])}
      />
      <PageBanner
        title="Payment Questions & Support"
        subtitle="Everything you need to know about making your mortgage payments"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">Payment Methods</h2>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground">
                Choose the payment method that works best for you. All methods are secure and convenient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {paymentMethods.map((method, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="h-12 w-12 bg-muted dark:bg-card rounded-lg flex items-center justify-center mb-4">
                      <div className="text-primary dark:text-primary">
                        {method.icon}
                      </div>
                    </div>
                    <CardTitle className="dark:text-foreground">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {method.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground dark:text-muted-foreground flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted dark:bg-yellow-900 rounded-lg p-6 mb-12">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-foreground">Important Payment Information</h3>
                  <ul className="space-y-2 text-muted-foreground dark:text-muted-foreground">
                    <li>• Payments are due on the 1st of each month</li>
                    <li>• 15-day grace period before late fees</li>
                    <li>• Late fees are typically $25-$50</li>
                    <li>• Contact us immediately if you're having payment difficulties</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg dark:text-foreground">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground dark:text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-muted dark:bg-muted rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 dark:text-foreground">Need More Help?</h3>
                <p className="text-muted-foreground dark:text-muted-foreground mb-6">
                  Our customer service team is here to help with any payment questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="tel:1-800-365-4441">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 1-800-365-4441
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="mailto:ondorealestate@gmail.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Us
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-4">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Mon-Fri 5:00 am – 5:00 pm PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
