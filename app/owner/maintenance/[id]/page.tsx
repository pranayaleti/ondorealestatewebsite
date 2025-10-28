import { OwnerMaintenanceDetail } from "@/components/owner/maintenance-detail"
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

// Generate static params for build-time static generation
export async function generateStaticParams() {
  // Return empty array to indicate this is a dynamic route
  // that should be handled at runtime
  return []
}

export default async function OwnerMaintenanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <SEO
        title={`Maintenance Request ${id} | Owner Portal`}
        description="View maintenance request details and status."
        pathname={`/owner/maintenance/${id}`}
        image={`${SITE_URL}/property-manager-meeting.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Maintenance", url: `${SITE_URL}/owner/maintenance` },
          { name: id, url: `${SITE_URL}/owner/maintenance/${id}` },
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
              <BreadcrumbLink href="/owner/maintenance">Maintenance</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/owner/maintenance/${id}`}>Request Details</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <OwnerMaintenanceDetail requestId={id} />
    </div>
  )
}
