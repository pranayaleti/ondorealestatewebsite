import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileQuestion, Home, Search, Calculator, Users, Building, ArrowLeft, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import SEO from "@/components/seo"
import { SITE_URL, SITE_PHONE, SITE_EMAILS } from "@/lib/site"
import { generateBreadcrumbJsonLd } from "@/lib/seo"

export default function NotFound() {
  const popularPages = [
    { name: "Properties", href: "/properties", icon: <Building className="h-4 w-4" />, description: "Browse available rentals" },
    { name: "Property Management", href: "/property-management", icon: <Users className="h-4 w-4" />, description: "Professional management services" },
    { name: "Buy a Home", href: "/buy", icon: <Home className="h-4 w-4" />, description: "Find your dream home" },
    { name: "Sell a Home", href: "/sell", icon: <Home className="h-4 w-4" />, description: "Sell your property" },
    { name: "Mortgage Loans", href: "/loans", icon: <Calculator className="h-4 w-4" />, description: "Get pre-approved" },
    { name: "Calculators", href: "/calculators", icon: <Calculator className="h-4 w-4" />, description: "Real estate calculators" },
    { name: "About Us", href: "/about", icon: <Users className="h-4 w-4" />, description: "Learn about our team" },
    { name: "Contact", href: "/contact", icon: <Phone className="h-4 w-4" />, description: "Get in touch" }
  ]

  const quickActions = [
    { name: "Search Properties", href: "/properties", icon: <Search className="h-5 w-5" /> },
    { name: "Calculate Mortgage", href: "/calculators/mortgage-payment", icon: <Calculator className="h-5 w-5" /> },
    { name: "Find Property Management", href: "/property-management", icon: <Building className="h-5 w-5" /> },
    { name: "Get Pre-Approved", href: "/loans", icon: <Home className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-muted p-4">
      <SEO
        title="404 - Page Not Found | OnDo Real Estate"
        description="The page you're looking for doesn't exist. Explore our popular pages and find what you need."
        pathname="/404"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "404", url: `${SITE_URL}/404` },
        ])}
      />
      
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 pt-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">Oops! Page Not Found</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off like a lost property key. 
            Don't worry - we'll help you find what you need!
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Quick Actions</CardTitle>
            <CardDescription className="text-center">Get back on track with these popular options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                    {action.icon}
                    <span className="text-sm font-medium">{action.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Pages */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Popular Pages</CardTitle>
            <CardDescription className="text-center">Explore our most visited sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularPages.map((page, index) => (
                <Link key={index} href={page.href}>
                  <div className="p-4 border rounded-lg hover:bg-primary/5 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{page.icon}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{page.name}</h3>
                        <p className="text-sm text-muted-foreground">{page.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Need Help Finding Something?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Our team is here to help you navigate our services.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Search className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Try Our Search</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Use our search feature to find properties or information.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/search">Search Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Call Us Directly</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Speak with our team for immediate assistance.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`tel:${SITE_PHONE.replace(/[^+\\d]/g, "")}`}>{SITE_PHONE}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Still can't find what you're looking for?</p>
            <p>Email us at <a href={`mailto:${SITE_EMAILS.support}`} className="text-primary hover:underline">{SITE_EMAILS.support}</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
