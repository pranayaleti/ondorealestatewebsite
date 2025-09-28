"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchForm } from "@/components/search-form"
import { Home, Building, DollarSign, Shield, Star } from "lucide-react"
import { PropertyDetailsModal } from "@/components/property-details-modal"
import { Footer } from "@/components/footer"

// Mock data for featured properties
const featuredProperties = [
  {
    id: 101,
    name: "Modern Downtown Apartment",
    description: "Salt Lake City, UT",
    image: "/modern-apartment-balcony.png",
    bedrooms: 2,
    bathrooms: 2,
    price: 1850,
    shortDescription: "Luxury apartment with balcony and city views, pet-friendly with modern amenities.",
    address: "123 Downtown Ave, Salt Lake City, UT",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 24,
    phone: "(801) 555-1234",
    specialties: ["apartment", "downtown"],
    valueRanges: ["300k-500k"],
    images: [
      "/modern-apartment-balcony.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "12-month minimum lease term with option to renew. $50 application fee per adult.",
    services: ["24/7 maintenance", "Package receiving", "Online rent payment", "Fitness center", "Rooftop lounge"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.downtownapartments.com",
  },
  {
    id: 102,
    name: "Family Home with Garden",
    description: "Holladay, UT",
    image: "/suburban-house-garden.png",
    bedrooms: 3,
    bathrooms: 2.5,
    price: 2400,
    shortDescription: "Spacious family home with fenced backyard, finished basement, and 2-car garage.",
    address: "456 Garden Lane, Holladay, UT",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviewCount: 18,
    phone: "(801) 555-5678",
    specialties: ["single-family", "suburban"],
    valueRanges: ["500k-750k"],
    images: [
      "/suburban-house-garden.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "12-month lease. $45 application fee per adult. Security deposit equal to one month's rent.",
    services: ["Lawn maintenance", "Snow removal", "Pest control", "Annual HVAC service", "24/7 emergency support"],
    fees: "Management fee: 7% of monthly rent. Leasing fee: 75% of first month's rent.",
    availability: "Available in 30 days",
    website: "www.familyhomerentals.com",
  },
  {
    id: 103,
    name: "Modern Townhouse",
    description: "Midvale, UT",
    image: "/modern-townhouse-garage.png",
    bedrooms: 2,
    bathrooms: 1.5,
    price: 1650,
    shortDescription: "Contemporary townhouse with attached garage, open floor plan, and community pool access.",
    address: "789 Modern Way, Midvale, UT",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviewCount: 15,
    phone: "(801) 555-9012",
    specialties: ["townhouse", "modern"],
    valueRanges: ["300k-500k"],
    images: [
      "/modern-townhouse-garage.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "6 or 12-month lease terms. $40 application fee. Security deposit equal to one month's rent.",
    services: ["Community pool maintenance", "Exterior maintenance", "Trash removal", "Snow removal", "HOA management"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.moderntownhomes.com",
  },
]

export default function LandingPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  const handleViewDetails = (propertyId: number) => {
    setSelectedProperty(propertyId)
  }

  const selectedPropertyData = selectedProperty
    ? featuredProperties.find((property) => property.id === selectedProperty)
    : null

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative w-full bg-gradient-to-r from-gray-900 to-gray-800 py-20 md:py-32" role="banner" aria-label="Hero section">
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
          <Image src="/modern-office-building.png" alt="Modern office building representing OnDo Real Estate" fill style={{ objectFit: "cover" }} priority />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Make life easy
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            OnDo Real Estate helps you find the ideal rental home with professional property management services and makes
            your life easier.
          </p>
          <div className="mx-auto max-w-md">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background dark:bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-foreground">How OnDo Real Estate Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-muted p-4 rounded-full mb-4">
                <Home className="h-8 w-8 text-gray-700 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-foreground">1. Find Properties</h3>
              <p className="text-gray-600 dark:text-muted-foreground">
                Enter your ZIP code to browse available rental properties in your area.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-muted p-4 rounded-full mb-4">
                <Building className="h-8 w-8 text-gray-700 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-foreground">2. Schedule Viewings</h3>
              <p className="text-gray-600 dark:text-muted-foreground">
                Tour your favorite properties with our professional property managers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-muted p-4 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-gray-700 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-foreground">3. Move In</h3>
              <p className="text-gray-600 dark:text-muted-foreground">
                Complete your application, sign the lease, and enjoy your new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50 dark:bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-foreground">Featured Rental Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="dark:bg-card">
                <div className="relative h-48 w-full">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={`${property.name} - ${property.description}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="dark:text-foreground">{property.name}</CardTitle>
                  <CardDescription className="dark:text-muted-foreground">{property.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm dark:text-muted-foreground">
                      {property.bedrooms} bed • {property.bathrooms} bath
                    </span>
                    <span className="font-semibold dark:text-foreground">${property.price}/mo</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">{property.shortDescription}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full dark:text-foreground dark:border-gray-600 dark:hover:bg-muted"
                    onClick={() => handleViewDetails(property.id)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-background hover:bg-muted text-foreground">
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Owner Section */}
      <section className="py-16 bg-background dark:bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 dark:text-foreground">Property Owners</h2>
              <p className="text-lg mb-6 dark:text-muted-foreground">
                Let OnDo Real Estate handle the day-to-day management of your rental property. We provide comprehensive
                property management services so you can enjoy passive income without the hassle.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="dark:text-muted-foreground">Professional tenant screening and placement</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="dark:text-muted-foreground">Rent collection and financial reporting</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="dark:text-muted-foreground">Maintenance coordination and 24/7 emergency response</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="dark:text-muted-foreground">Regular property inspections and detailed reports</span>
                </li>
              </ul>
              <Button asChild className="bg-background hover:bg-muted text-foreground">
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/city-map-with-pin.png" alt="Property management" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="py-16 bg-card text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-60 w-60 md:h-80 md:w-80 rounded-full border-4 border-primary overflow-hidden bg-background">
                <Image 
                  src="/founder-image.png" 
                  alt="Founder Pranay Reddy Aleti" 
                  fill 
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  quality={100}
                  priority
                  sizes="(max-width: 768px) 240px, 320px"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-3">Founder's Note</h3>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                "Real estate is more than property—it's about people, growth, and legacy. At Ondo, we're building a modern
                platform rooted in trust, transparency, and technology so owners can rest easy and tenants feel right at home."
              </p>
              <Button asChild className="bg-primary hover:bg-primary text-foreground">
                <Link href="/founders-letter">Read the full letter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-foreground">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-foreground dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src="/professional-woman-smiling.png" alt="Sarah J." fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-foreground">Sarah J.</CardTitle>
                    <CardDescription className="dark:text-muted-foreground">Tenant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-muted-foreground">
                  "OnDo Real Estate made finding my new apartment so easy. Their team was responsive and helped me find
                  exactly what I was looking for in my price range."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-foreground dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src="/professional-man-suit.png" alt="Michael T." fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-foreground">Michael T.</CardTitle>
                    <CardDescription className="dark:text-muted-foreground">Property Owner</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-muted-foreground">
                  "Since hiring OnDo Real Estate to manage my rental properties, I've had zero stress. They handle
                  everything professionally and my income has actually increased."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-foreground dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src="/professional-woman-glasses.png"
                      alt="Jennifer L."
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-foreground">Jennifer L.</CardTitle>
                    <CardDescription className="dark:text-muted-foreground">Tenant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-muted-foreground">
                  "The maintenance service through OnDo Real Estate is outstanding. Any issue I've had has been resolved
                  within 24 hours. Best property management I've experienced."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Rental?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enter your ZIP code to start browsing available properties in your area.
          </p>
          <div className="mx-auto max-w-md">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ZIP code"
                className="flex-1 px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Button type="submit" className="bg-background hover:bg-gray-700 text-foreground">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer rendered globally in RootLayout */}

      {/* Property Details Modal */}
      {selectedPropertyData && (
        <PropertyDetailsModal
          company={{
            id: selectedPropertyData.id,
            name: selectedPropertyData.name,
            logo: selectedPropertyData.logo,
            rating: selectedPropertyData.rating,
            reviewCount: selectedPropertyData.reviewCount,
            address: selectedPropertyData.address,
            phone: selectedPropertyData.phone,
            specialties: selectedPropertyData.specialties,
            description: selectedPropertyData.shortDescription,
            valueRanges: selectedPropertyData.valueRanges,
            images: selectedPropertyData.images,
            leaseTerms: selectedPropertyData.leaseTerms,
            services: selectedPropertyData.services,
            fees: selectedPropertyData.fees,
            availability: selectedPropertyData.availability,
            website: selectedPropertyData.website,
          }}
          open={selectedProperty !== null}
          onOpenChange={() => setSelectedProperty(null)}
        />
      )}
    </div>
  )
}
