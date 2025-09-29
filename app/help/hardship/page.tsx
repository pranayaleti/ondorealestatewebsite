import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Phone, FileText, Clock, AlertCircle, CheckCircle, Shield } from "lucide-react"

export default function HardshipPage() {
  const hardshipTypes = [
    {
      title: "Job Loss or Reduced Income",
      description: "Temporary or permanent loss of employment affecting your ability to make mortgage payments.",
      icon: <AlertCircle className="h-6 w-6" />,
      options: ["Forbearance", "Loan modification", "Payment reduction"]
    },
    {
      title: "Medical Emergency",
      description: "Unexpected medical expenses or illness that impacts your financial situation.",
      icon: <Heart className="h-6 w-6" />,
      options: ["Forbearance", "Payment deferral", "Loan modification"]
    },
    {
      title: "Divorce or Separation",
      description: "Changes in household income due to divorce, separation, or death of a co-borrower.",
      icon: <Shield className="h-6 w-6" />,
      options: ["Loan assumption", "Refinance", "Loan modification"]
    },
    {
      title: "Natural Disaster",
      description: "Property damage or displacement due to natural disasters like floods, fires, or earthquakes.",
      icon: <AlertCircle className="h-6 w-6" />,
      options: ["Forbearance", "Payment deferral", "Insurance assistance"]
    }
  ]

  const assistanceOptions = [
    {
      title: "Forbearance",
      description: "Temporarily pause or reduce your mortgage payments for a specific period.",
      duration: "3-12 months typically",
      requirements: "Documented hardship, ability to resume payments",
      icon: <Clock className="h-6 w-6" />
    },
    {
      title: "Loan Modification",
      description: "Permanently change the terms of your loan to make payments more affordable.",
      duration: "Permanent change",
      requirements: "Long-term hardship, income verification",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Payment Deferral",
      description: "Add missed payments to the end of your loan term.",
      duration: "Varies by situation",
      requirements: "Temporary hardship, ability to resume payments",
      icon: <CheckCircle className="h-6 w-6" />
    }
  ]

  const steps = [
    {
      number: 1,
      title: "Contact Us Immediately",
      description: "Don't wait until you're behind on payments. The sooner you reach out, the more options we have to help."
    },
    {
      number: 2,
      title: "Document Your Hardship",
      description: "Gather documentation such as pay stubs, medical bills, unemployment benefits, or other proof of hardship."
    },
    {
      number: 3,
      title: "Complete Application",
      description: "Fill out our hardship assistance application with all required documentation and information."
    },
    {
      number: 4,
      title: "Review Process",
      description: "We'll review your application and work with you to find the best solution for your situation."
    },
    {
      number: 5,
      title: "Implementation",
      description: "Once approved, we'll implement the assistance program and provide ongoing support."
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Hardship Assistance Programs"
        description="Get help with mortgage payments during financial hardship. Learn about forbearance, loan modification, and other assistance options."
        pathname="/help/hardship"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Help", url: `${SITE_URL}/help` },
          { name: "Hardship Assistance", url: `${SITE_URL}/help/hardship` },
        ])}
      />
      <PageBanner
        title="Hardship Assistance Programs"
        subtitle="We're here to help during difficult financial times"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">You're Not Alone</h2>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground">
                Life can bring unexpected challenges. We offer several assistance programs to help you through difficult times and keep you in your home.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Common Hardship Situations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hardshipTypes.map((hardship, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-red-100 dark:bg-card rounded-lg flex items-center justify-center text-destructive dark:text-destructive">
                          {hardship.icon}
                        </div>
                        <CardTitle className="dark:text-foreground">{hardship.title}</CardTitle>
                      </div>
                      <CardDescription>{hardship.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground dark:text-gray-300">Available Options:</p>
                        <ul className="text-sm text-muted-foreground dark:text-muted-foreground space-y-1">
                          {hardship.options.map((option, idx) => (
                            <li key={idx}>• {option}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Assistance Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assistanceOptions.map((option, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-muted dark:bg-card rounded-lg flex items-center justify-center text-primary dark:text-primary">
                          {option.icon}
                        </div>
                        <CardTitle className="dark:text-foreground">{option.title}</CardTitle>
                      </div>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300">Duration:</p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">{option.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300">Requirements:</p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">{option.requirements}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">How to Apply for Assistance</h3>
              <div className="space-y-6">
                {steps.map((step, index) => (
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
                <AlertCircle className="h-6 w-6 text-destructive dark:text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-4 dark:text-foreground">Important Information</h3>
                  <ul className="space-y-2 text-foreground dark:text-gray-300">
                    <li>• Contact us as soon as you anticipate difficulty making payments</li>
                    <li>• Continue making payments until your assistance is approved</li>
                    <li>• Keep all documentation related to your hardship</li>
                    <li>• Respond promptly to any requests for additional information</li>
                    <li>• Stay in communication with your loan servicer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Ready to Get Help?</h3>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6">
                Our compassionate team is here to help you find the right solution for your situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Us Today</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:+15551234567">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (555) 123-4567
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
