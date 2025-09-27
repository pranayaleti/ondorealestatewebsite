import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { PropertyForm } from "@/components/dashboard/property-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Add Property | Property Management CRM",
  description: "Add a new property to your CRM",
}

export default function AddPropertyPage() {
  return (
    <DashboardShell>
      <SEO
        title="Dashboard Add Property | OnDo Real Estate"
        description="Add a new property to your dashboard CRM."
        pathname="/dashboard/properties/add"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Properties", url: `${SITE_URL}/dashboard/properties` },
          { name: "Add", url: `${SITE_URL}/dashboard/properties/add` },
        ])}
      />
      <DashboardHeader heading="Add Property" text="Add a new property to your CRM" />
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Enter the details of the property you want to add</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
