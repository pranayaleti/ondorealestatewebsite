import { UnderMaintenance } from "@/components/ui/under-maintenance"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Building, Edit } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export async function generateStaticParams() {
  // Return placeholder IDs for static generation
  // These will be pre-rendered, but actual data loads client-side
  return [{ id: 'prop1' }, { id: 'prop2' }]
}

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6 p-6">
      <SEO
        title={`Edit Property | ${id}`}
        description="Update your property details in the owner portal."
        pathname={`/owner/properties/${id}/edit`}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Properties", url: `${SITE_URL}/owner/properties` },
          { name: "Details", url: `${SITE_URL}/owner/properties/${id}` },
          { name: "Edit", url: `${SITE_URL}/owner/properties/${id}/edit` },
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/owner/properties/${id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Property
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">Update your property details</p>
      </div>

      <UnderMaintenance
        title="Edit Property Coming Soon"
        description="We're currently developing the property editing functionality. Please check back soon."
        showHomeButton={false}
        actionText="Return to Property Details"
        actionHref={`/owner/properties/${id}`}
      />
    </div>
  )
}
