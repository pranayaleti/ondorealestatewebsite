import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { LeadForm } from "@/components/dashboard/lead-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Add Lead | Property Management CRM",
  description: "Add a new lead to your CRM",
}

export default function AddLeadPage() {
  return (
    <DashboardShell>
      <SEO
        title="Dashboard Add Lead | Ondo Real Estate"
        description="Add a new lead to your dashboard CRM."
        pathname="/dashboard/leads/add"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Leads", url: `${SITE_URL}/dashboard/leads` },
          { name: "Add", url: `${SITE_URL}/dashboard/leads/add` },
        ])}
      />
      <DashboardHeader heading="Add Lead" text="Add a new lead to your CRM" />
      <Card>
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
          <CardDescription>Enter the details of the lead you want to add</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
