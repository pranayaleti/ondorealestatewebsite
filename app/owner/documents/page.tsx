import type { Metadata } from "next"
import { DocumentsView } from "@/components/owner/documents-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FileText, Home } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Documents | Ondo Real Estate",
  description: "Manage your property documents",
}

export default function DocumentsPage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Owner Documents | Ondo Real Estate"
        description="Store, organize, and share property documents in the owner portal."
        pathname="/owner/documents"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Documents", url: `${SITE_URL}/owner/documents` },
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
              <BreadcrumbLink href="/owner/documents">
                <FileText className="h-4 w-4 mr-1" />
                Documents
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Document Management</h1>
        <p className="text-foreground/70">Store, organize, and share important documents</p>
      </div>

      <DocumentsView />
    </div>
  )
}
