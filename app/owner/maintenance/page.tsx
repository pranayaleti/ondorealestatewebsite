import type { Metadata } from "next"
import MaintenanceClientPage from "./MaintenanceClientPage"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Maintenance | PropertyPro Management",
  description: "Manage maintenance requests",
}

export default function MaintenancePage() {
  return (
    <>
      <SEO
        title="Owner Maintenance | Ondo Real Estate"
        description="Manage and track maintenance requests in the owner portal."
        pathname="/owner/maintenance"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Maintenance", url: `${SITE_URL}/owner/maintenance` },
        ])}
      />
      <MaintenanceClientPage />
    </>
  )
}
