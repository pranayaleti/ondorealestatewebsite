import { MaintenanceRequestForm } from "@/components/tenant/maintenance-request-form"
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

export default function NewMaintenanceRequestPage() {
  return (
    <div className="space-y-6">
      <SEO
        title="New Maintenance Request | Ondo Real Estate"
        description="Submit a new maintenance request in the tenant portal."
        pathname="/tenant/maintenance/new"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Tenant", url: `${SITE_URL}/tenant` },
          { name: "Maintenance", url: `${SITE_URL}/tenant/maintenance` },
          { name: "New", url: `${SITE_URL}/tenant/maintenance/new` },
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tenant/maintenance/new">New Request</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Submit a Maintenance Request</h1>
        <p className="text-muted-foreground">Report an issue with your property</p>
      </div>
      <MaintenanceRequestForm />
    </div>
  )
}
