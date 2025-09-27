import { MaintenanceRequestList } from "@/components/tenant/maintenance-request-list"
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

export default function TenantMaintenancePage() {
  return (
    <div className="space-y-6">
      <SEO
        title="Tenant Maintenance Requests | Ondo Real Estate"
        description="View and manage your maintenance requests in the tenant portal."
        pathname="/tenant/maintenance"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Tenant", url: `${SITE_URL}/tenant` },
          { name: "Maintenance", url: `${SITE_URL}/tenant/maintenance` },
        ])}
      />
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/tenant">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tenant/maintenance">Maintenance</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">My Maintenance Requests</h1>
        <p className="text-muted-foreground">View and manage your maintenance requests</p>
      </div>
      <MaintenanceRequestList />
    </div>
  )
}
