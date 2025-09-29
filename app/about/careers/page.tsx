import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, Clock, Users, Heart, Briefcase, Award, GraduationCap, DollarSign } from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Property Manager",
      location: "Salt Lake City, UT",
      type: "Full-time",
      department: "Property Management",
      description: "Manage a portfolio of rental properties, coordinate maintenance, and ensure tenant satisfaction.",
      requirements: ["3+ years property management experience", "Utah real estate license preferred", "Strong communication skills"],
      benefits: ["Health insurance", "401k matching", "Flexible PTO", "Professional development"]
    },
    {
      title: "Leasing Specialist",
      location: "Lehi, UT",
      type: "Full-time",
      department: "Leasing",
      description: "Help prospective tenants find their perfect home and guide them through the application process.",
      requirements: ["1+ years sales experience", "Customer service background", "Real estate knowledge preferred"],
      benefits: ["Commission structure", "Health insurance", "401k matching", "Career growth opportunities"]
    },
    {
      title: "Maintenance Coordinator",
      location: "Provo, UT",
      type: "Full-time",
      department: "Maintenance",
      description: "Coordinate maintenance requests, manage vendor relationships, and ensure properties are well-maintained.",
      requirements: ["2+ years maintenance coordination", "Vendor management experience", "Problem-solving skills"],
      benefits: ["Health insurance", "401k matching", "Company vehicle", "Tool allowance"]
    },
    {
      title: "Marketing Coordinator",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      description: "Develop and execute marketing strategies to attract property owners and tenants.",
      requirements: ["2+ years marketing experience", "Social media expertise", "Content creation skills"],
      benefits: ["Health insurance", "401k matching", "Remote work", "Creative freedom"]
    }
  ]

  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness programs"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Financial Security",
      description: "Competitive salaries, 401k matching, and performance bonuses"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-orange-500" />,
      title: "Professional Growth",
      description: "Training programs, conference attendance, and career advancement opportunities"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Great Culture",
      description: "Collaborative team environment with regular team building activities"
    }
  ]

  const values = [
    "Integrity in all our dealings",
    "Innovation in property management",
    "Excellence in customer service",
    "Community involvement and support"
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Careers at OnDo Real Estate | Join Our Team"
        description="Join OnDo Real Estate and help us provide exceptional property management services across Utah. View open positions and benefits."
        pathname="/about/careers"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
          { name: "Careers", url: `${SITE_URL}/about/careers` },
        ])}
      />
      <PageBanner
        title="Join Our Team"
        subtitle="Build your career with Utah's leading property management company"
        backgroundImage="/modern-office-building.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work at OnDo Real Estate?</h2>
            <p className="text-xl text-muted-foreground">
              We're building the future of property management in Utah, and we need passionate people to help us get there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{position.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {position.type}
                            </div>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{position.department}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {position.benefits.map((benefit, benIndex) => (
                            <li key={benIndex}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/contact">Apply Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See Your Perfect Role?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Send Resume</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-xl mb-8">
              These core values guide everything we do and shape our company culture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
