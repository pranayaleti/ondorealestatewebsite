import { Suspense } from "react";
import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { PropertyEditForm } from "@/components/dashboard/property-edit-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import SEO from "@/components/seo";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Edit Property | Property Management CRM",
  description: "Edit property details",
};

// Make this a static page for static export
export default function EditPropertyPage() {
  return (
    <DashboardShell>
      <SEO
        title="Edit Property | Dashboard"
        description="Edit property details within the dashboard."
        pathname="/dashboard/properties/edit"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Properties", url: `${SITE_URL}/dashboard/properties` },
          { name: "Edit", url: `${SITE_URL}/dashboard/properties/edit` },
        ])}
      />
      <DashboardHeader heading="Edit Property" text="Select a property to edit" />
      <Card>
        <CardHeader>
          <CardTitle>Property Edit</CardTitle>
          <CardDescription>
            Use the properties list to select a property to edit.
          </CardDescription>
        </CardHeader>
      </Card>
    </DashboardShell>
  );
}
