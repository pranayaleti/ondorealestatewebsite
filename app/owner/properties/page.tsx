import type { Metadata } from "next"
import { OwnerPropertiesView } from "@/components/owner/properties-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "My Properties | Real Estate",
  description: "Manage your property portfolio",
}

export default function OwnerPropertiesPage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Owner Properties | Ondo Real Estate"
        description="Manage your property portfolio, performance, and details in the owner portal."
        pathname="/owner/properties"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Properties", url: `${SITE_URL}/owner/properties` },
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
              <BreadcrumbLink href="/owner/properties">Properties</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">My Properties</h1>
        <p className="text-muted-foreground">Manage your property portfolio</p>
      </div>
      <OwnerPropertiesView />
    </div>
  )
}
