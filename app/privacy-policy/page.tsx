import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_EMAILS, SITE_PHONE } from "@/lib/site"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Eye, Lock, Database, Mail, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 15, 2024"

  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="h-6 w-6" />,
      content: [
        "Personal information you provide (name, email, phone number, address)",
        "Property information and preferences",
        "Financial information for loan applications and property management",
        "Usage data and analytics from our website",
        "Communication records and correspondence"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="h-6 w-6" />,
      content: [
        "Provide real estate and property management services",
        "Process loan applications and financial transactions",
        "Communicate about properties, services, and updates",
        "Improve our website and services",
        "Comply with legal and regulatory requirements"
      ]
    },
    {
      title: "Information Sharing",
      icon: <Shield className="h-6 w-6" />,
      content: [
        "We do not sell your personal information to third parties",
        "We may share information with trusted service providers",
        "Information may be shared for legal compliance or protection of rights",
        "Aggregated, non-personal data may be used for business purposes"
      ]
    },
    {
      title: "Data Security",
      icon: <Lock className="h-6 w-6" />,
      content: [
        "We use industry-standard encryption and security measures",
        "Access to personal information is restricted to authorized personnel",
        "Regular security audits and updates are performed",
        "Secure data storage and transmission protocols are maintained"
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Privacy Policy | Ondo Real Estate"
        description="Learn how Ondo Real Estate protects your personal information and privacy. Read our comprehensive privacy policy."
        pathname="/privacy-policy"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
        ])}
      />
      <PageBanner
        title="Privacy Policy"
        subtitle="Your privacy and data protection are our top priorities"
        backgroundImage="/modern-office-building.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg text-foreground/70 mb-4">
                Last updated: <strong>{lastUpdated}</strong>
              </p>
              <p className="text-foreground/70">
                This Privacy Policy describes how Ondo Real Estate collects, uses, and protects your personal information 
                when you use our services or visit our website.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-foreground/70">
                    You have the right to access, update, or delete your personal information. You can also opt out of 
                    certain communications from us. To exercise these rights or if you have questions about this policy, 
                    please contact us using the information below.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-foreground/70">{SITE_EMAILS.privacy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm text-foreground/70">{SITE_PHONE}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review 
                  this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h3>
              <p className="text-foreground/70 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
