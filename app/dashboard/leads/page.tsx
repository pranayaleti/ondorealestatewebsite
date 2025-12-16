import type { Metadata } from "next"
import TenantApplicationsClientPage from "./TenantApplicationsClientPage"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Tenant Applications | PropertyPro Management",
  description: "Manage tenant applications",
}

export default function TenantApplicationsPage() {
  return (
    <>
      <SEO
        title="Dashboard Leads | Ondo Real Estate"
        description="Manage tenant applications and leads in your dashboard."
        pathname="/dashboard/leads"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Leads", url: `${SITE_URL}/dashboard/leads` },
        ])}
      />
      <TenantApplicationsClientPage />
    </>
  )
}
