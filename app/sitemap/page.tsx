import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building, Users, Calculator, FileText, Phone, MapPin, Search } from "lucide-react"

export default function SitemapPage() {
  const siteSections = [
    {
      title: "Main Services",
      icon: <Building className="h-5 w-5" />,
      links: [
        { name: "Properties", href: "/properties", description: "Browse available rental properties" },
        { name: "Property Management", href: "/property-management", description: "Professional property management services" },
        { name: "Buy a Home", href: "/buy", description: "Find your dream home" },
        { name: "Sell a Home", href: "/sell", description: "Sell your property" },
        { name: "Mortgage Loans", href: "/loans", description: "Get pre-approved for a mortgage" }
      ]
    },
    {
      title: "About Us",
      icon: <Users className="h-5 w-5" />,
      links: [
        { name: "About Ondo Real Estate", href: "/about", description: "Learn about our company and mission" },
        { name: "Our Team", href: "/about/team", description: "Meet our experienced professionals" },
        { name: "Careers", href: "/about/careers", description: "Join our team" },
        { name: "Testimonials", href: "/about/testimonials", description: "What our clients say" },
        { name: "Company History", href: "/about/history", description: "Our journey and milestones" }
      ]
    },
    {
      title: "Tools & Resources",
      icon: <Calculator className="h-5 w-5" />,
      links: [
        { name: "Mortgage Calculator", href: "/calculators/mortgage-payment", description: "Calculate your monthly payment" },
        { name: "Affordability Calculator", href: "/calculators/affordability", description: "See what you can afford" },
        { name: "Refinance Calculator", href: "/calculators/refinance", description: "Calculate refinancing savings" },
        { name: "Home Sale Calculator", href: "/calculators/home-sale", description: "Estimate your home sale proceeds" },
        { name: "All Calculators", href: "/calculators", description: "Complete list of real estate tools" }
      ]
    },
    {
      title: "Information",
      icon: <FileText className="h-5 w-5" />,
      links: [
        { name: "Why Utah", href: "/why-utah", description: "Why choose Utah for real estate" },
        { name: "FAQ", href: "/faq", description: "Frequently asked questions" },
        { name: "Blog", href: "/blog", description: "Real estate insights and tips" },
        { name: "Search Properties", href: "/search", description: "Advanced property search" }
      ]
    },
    {
      title: "Legal & Support",
      icon: <Phone className="h-5 w-5" />,
      links: [
        { name: "Contact Us", href: "/contact", description: "Get in touch with our team" },
        { name: "Privacy Policy", href: "/privacy-policy", description: "How we protect your data" },
        { name: "Terms of Service", href: "/terms-of-service", description: "Terms and conditions" },
        { name: "Accessibility", href: "/accessibility", description: "Our accessibility commitment" }
      ]
    },
    {
      title: "Location-Based Services",
      icon: <MapPin className="h-5 w-5" />,
      links: [
        { name: "Salt Lake City", href: "/property-management/salt-lake-city", description: "Services in Salt Lake City" },
        { name: "Lehi", href: "/property-management/lehi", description: "Services in Lehi" },
        { name: "Provo", href: "/property-management/provo", description: "Services in Provo" },
        { name: "Draper", href: "/property-management/draper", description: "Services in Draper" }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-background dark:bg-transparent">
      <SEO
        title="Sitemap | Ondo Real Estate"
        description="Complete sitemap of Ondo Real Estate website. Find all our pages, services, and resources in one place."
        pathname="/sitemap"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Sitemap", url: `${SITE_URL}/sitemap` },
        ])}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Site Map</h1>
            <p className="text-xl text-foreground/70">
              Find everything you need on our website. Browse by category or use our search feature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="border-b border-gray-100 pb-2 last:border-b-0">
                        <Link 
                          href={link.href}
                          className="block hover:text-primary transition-colors"
                        >
                          <h3 className="font-semibold text-sm mb-1">{link.name}</h3>
                          <p className="text-xs text-foreground/70">{link.description}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-3">
                  <Search className="h-6 w-6" />
                  Can't Find What You're Looking For?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-6">
                  Use our search feature or contact us directly for personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/search">Search Our Site</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
