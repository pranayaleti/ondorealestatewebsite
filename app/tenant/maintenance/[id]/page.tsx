import { MaintenanceRequestDetail } from "@/components/tenant/maintenance-request-detail"
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

export async function generateStaticParams() {
  // Return placeholder IDs for static generation
  // These will be pre-rendered, but actual data loads client-side
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default async function MaintenanceRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <SEO
        title={`Maintenance Request ${id} | Tenant Portal`}
        description="View your maintenance request details and status."
        pathname={`/tenant/maintenance/${id}`}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Tenant", url: `${SITE_URL}/tenant` },
          { name: "Maintenance", url: `${SITE_URL}/tenant/maintenance` },
          { name: id, url: `${SITE_URL}/tenant/maintenance/${id}` },
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
              <BreadcrumbLink href={`/tenant/maintenance/${id}`}>Request Details</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <MaintenanceRequestDetail requestId={id} />
    </div>
  )
}
