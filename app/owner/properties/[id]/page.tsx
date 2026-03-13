import type { Metadata } from "next"
import { PropertyDetails } from "@/components/owner/property-details"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Building, Home } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Property Details | Real Estate",
  description: "View and manage property details",
}

export async function generateStaticParams() {
  // Return placeholder IDs for static generation
  // These will be pre-rendered, but actual data loads client-side
  return [{ id: 'prop1' }, { id: 'prop2' }, { id: 'prop3' }, { id: 'prop4' }]
}

// This would normally fetch from a database
const getProperty = (id: string) => {
  // Mock property data
  const PROPERTIES = [
    {
      id: "prop1",
      name: "2701 N Thanksgiving Way",
      address: "2701 N Thanksgiving Way",
      city: "Lehi",
      state: "UT",
      zipCode: "84043",
      type: "multi-family",
      unitCount: 2,
      image: "/modern-apartment-balcony.png",
      occupancy: "Fully Occupied",
      occupancyRate: 100,
      tenants: 2,
      monthlyIncome: 3400,
      leaseEnd: "2023-12-31",
      status: "active",
      description:
        "A beautiful multi-family property with 2 units in the heart of Salt Lake City. Both units are currently occupied with long-term tenants.",
      yearBuilt: 2005,
      squareFeet: 2400,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["Central Air", "Washer/Dryer", "Parking", "Backyard"],
      maintenanceHistory: [
        {
          id: "maint1",
          date: "2023-04-15",
          type: "Plumbing",
          description: "Fixed leaking faucet in Unit 1",
          cost: 150,
        },
        {
          id: "maint2",
          date: "2023-02-10",
          type: "HVAC",
          description: "Annual HVAC maintenance",
          cost: 300,
        },
      ],
      financials: {
        monthlyRent: 3400,
        annualIncome: 40800,
        expenses: {
          mortgage: 1800,
          taxes: 450,
          insurance: 200,
          maintenance: 300,
          management: 340,
        },
      },
      units: [
        {
          id: "unit1",
          name: "Unit 1",
          bedrooms: 2,
          bathrooms: 1.5,
          squareFeet: 1200,
          rent: 1700,
          status: "occupied",
          tenant: {
            name: "John Smith",
            email: "john@example.com",
            phone: "555-123-4567",
            leaseStart: "2023-01-01",
            leaseEnd: "2023-12-31",
          },
        },
        {
          id: "unit2",
          name: "Unit 2",
          bedrooms: 2,
          bathrooms: 1.5,
          squareFeet: 1200,
          rent: 1700,
          status: "occupied",
          tenant: {
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "555-987-6543",
            leaseStart: "2023-03-01",
            leaseEnd: "2024-02-29",
          },
        },
      ],
    },
    {
      id: "prop2",
      name: "456 Oak Avenue",
      address: "456 Oak Avenue",
      city: "Salt Lake City",
      state: "UT",
      zipCode: "11201",
      type: "single-family",
      unitCount: 1,
      image: "/suburban-house-garden.png",
      occupancy: "Fully Occupied",
      occupancyRate: 100,
      tenants: 1,
      monthlyIncome: 1850,
      leaseEnd: "2023-10-15",
      status: "active",
      description:
        "Charming single-family home in a quiet neighborhood with a beautiful garden. Currently occupied by a reliable long-term tenant.",
      yearBuilt: 1998,
      squareFeet: 1800,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Garage", "Fireplace", "Fenced Yard", "Updated Kitchen"],
      maintenanceHistory: [
        {
          id: "maint3",
          date: "2023-03-20",
          type: "Landscaping",
          description: "Spring yard cleanup and maintenance",
          cost: 250,
        },
      ],
      financials: {
        monthlyRent: 1850,
        annualIncome: 22200,
        expenses: {
          mortgage: 950,
          taxes: 320,
          insurance: 150,
          maintenance: 200,
          management: 185,
        },
      },
      units: [
        {
          id: "unit3",
          name: "Main House",
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 1800,
          rent: 1850,
          status: "occupied",
          tenant: {
            name: "Michael Brown",
            email: "michael@example.com",
            phone: "555-555-1234",
            leaseStart: "2022-10-15",
            leaseEnd: "2023-10-15",
          },
        },
      ],
    },
    {
      id: "prop3",
      name: "Sunset Apts #101",
      address: "789 Sunset Blvd, Apt 101",
      city: "Salt Lake City",
      state: "UT",
      zipCode: "11202",
      type: "apartment",
      unitCount: 1,
      image: "/modern-apartment-balcony.png",
      occupancy: "Occupied",
      occupancyRate: 100,
      tenants: 1,
      monthlyIncome: 1450,
      leaseEnd: "2024-05-31",
      status: "active",
      description: "A comfortable apartment unit with great views and modern amenities. Currently occupied.",
      yearBuilt: 2010,
      squareFeet: 900,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["Gym Access", "Pool", "In-unit Laundry"],
      maintenanceHistory: [],
      financials: {
        monthlyRent: 1450,
        annualIncome: 17400,
        expenses: {
          mortgage: 0,
          taxes: 200,
          insurance: 50,
          maintenance: 100,
          management: 145,
        },
      },
      units: [
        {
          id: "unit4",
          name: "Apt 101",
          bedrooms: 2,
          bathrooms: 1,
          squareFeet: 900,
          rent: 1450,
          status: "occupied",
          tenant: {
            name: "Alice Wonderland",
            email: "alice@example.com",
            phone: "555-001-0002",
            leaseStart: "2023-06-01",
            leaseEnd: "2024-05-31",
          },
        },
      ],
    },
    {
      id: "prop4",
      name: "Sunset Apts #205",
      address: "789 Sunset Blvd, Apt 205",
      city: "Salt Lake City",
      state: "UT",
      zipCode: "11202",
      type: "apartment",
      unitCount: 1,
      image: "/modern-apartment-balcony.png",
      occupancy: "Vacant",
      occupancyRate: 0,
      tenants: 0,
      monthlyIncome: 0,
      leaseEnd: "",
      status: "active",
      description: "A newly renovated apartment unit ready for a new tenant.",
      yearBuilt: 2010,
      squareFeet: 850,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["Gym Access", "Pool", "In-unit Laundry"],
      maintenanceHistory: [],
      financials: {
        monthlyRent: 0,
        annualIncome: 0,
        expenses: {
          mortgage: 0,
          taxes: 200,
          insurance: 50,
          maintenance: 100,
          management: 0,
        },
      },
      units: [
        {
          id: "unit5",
          name: "Apt 205",
          bedrooms: 1,
          bathrooms: 1,
          squareFeet: 850,
          rent: 1300,
          status: "vacant",
        },
      ],
    },
  ]

  return PROPERTIES.find((p) => p.id === id)
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = getProperty(id)

  return (
    <div className="space-y-6 p-6">
      <SEO
        title={`Property Details | ${id}`}
        description="View and manage property details in the owner portal."
        pathname={`/owner/properties/${id}`}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Properties", url: `${SITE_URL}/owner/properties` },
          { name: "Details", url: `${SITE_URL}/owner/properties/${id}` },
        ])}
      />
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner/properties">
                <Building className="h-4 w-4 mr-1" />
                Properties
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/owner/properties/${id}`}>Property Details</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {property ? (
        <PropertyDetails property={property} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Building className="h-12 w-12 text-foreground/70 mb-4" />
          <h3 className="text-lg font-medium mb-2">Property not found</h3>
          <p className="text-foreground/70 text-center mb-6">
            The property you're looking for doesn't exist or you don't have access to it.
          </p>
        </div>
      )}
    </div>
  )
}
