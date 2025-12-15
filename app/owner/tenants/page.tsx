import type { Metadata } from "next"
import { TenantsView } from "@/components/owner/tenants-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Users } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Tenants | Real Estate",
  description: "Manage your tenants",
}

export default function TenantsPage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Owner Tenants | Ondo Real Estate"
        description="Manage your tenants and leases in the owner portal."
        pathname="/owner/tenants"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Tenants", url: `${SITE_URL}/owner/tenants` },
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
              <BreadcrumbLink href="/owner/tenants">
                <Users className="h-4 w-4 mr-1" />
                Tenants
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Tenants</h1>
        <p className="text-foreground/70">Manage your tenants and leases</p>
      </div>

      <TenantsView />
    </div>
  )
}
