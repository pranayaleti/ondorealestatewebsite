import type { Metadata } from "next"
import { AddPropertyForm } from "@/components/owner/add-property-form"
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
  title: "Add Property | Real Estate",
  description: "Add a new property to your portfolio",
}

export default function AddPropertyPage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Add Property | Owner Portal"
        description="Add a new property to your portfolio in the owner portal."
        pathname="/owner/properties/add"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Properties", url: `${SITE_URL}/owner/properties` },
          { name: "Add", url: `${SITE_URL}/owner/properties/add` },
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
              <BreadcrumbLink href="/owner/properties/add">Add Property</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Add Property</h1>
        <p className="text-foreground/70">Add a new property to your portfolio</p>
      </div>

      <AddPropertyForm />
    </div>
  )
}
