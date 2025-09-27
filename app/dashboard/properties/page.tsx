import type { Metadata } from "next"
import PropertiesPageClient from "./properties-page-client"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Properties | Property Management CRM",
  description: "Manage your properties",
}

export default function PropertiesPage() {
  return (
    <>
      <SEO
        title="Dashboard Properties | OnDo Real Estate"
        description="Manage and view properties within the dashboard."
        pathname="/dashboard/properties"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Properties", url: `${SITE_URL}/dashboard/properties` },
        ])}
      />
      <PropertiesPageClient />
    </>
  )
}
