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

export default async function EditPropertyPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id = "" } = await searchParams;

  if (!id) {
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
        <DashboardHeader heading="Edit Property" text="Missing property ID" />
        <Card>
          <CardHeader>
            <CardTitle>No ID provided</CardTitle>
            <CardDescription>
              Add <code>?id=YOUR_ID</code> to the URL or open this page via the “Edit” button.
            </CardDescription>
          </CardHeader>
        </Card>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SEO
        title={`Edit Property ${id} | Dashboard`}
        description={`Update property details for property ID ${id}.`}
        pathname={`/dashboard/properties/edit?id=${id}`}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Properties", url: `${SITE_URL}/dashboard/properties` },
          { name: "Edit", url: `${SITE_URL}/dashboard/properties/edit?id=${id}` },
        ])}
      />
      <DashboardHeader heading="Edit Property" text={`Edit property details for ID: ${id}`} />
      <Suspense fallback={<Loading />}>
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Update the details of this property</CardDescription>
          </CardHeader>
        <CardContent>
            <PropertyEditForm propertyId={id} />
          </CardContent>
        </Card>
      </Suspense>
    </DashboardShell>
  );
}
