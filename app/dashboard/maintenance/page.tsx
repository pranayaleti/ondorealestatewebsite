import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { MaintenanceTable } from "@/components/dashboard/maintenance-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Maintenance | PropertyPro Management",
  description: "Manage maintenance requests",
}

export default function MaintenancePage() {
  return (
    <DashboardShell>
      <SEO
        title="Dashboard Maintenance | Ondo Real Estate"
        description="Manage and track maintenance requests across properties."
        pathname="/dashboard/maintenance"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Dashboard", url: `${SITE_URL}/dashboard` },
          { name: "Maintenance", url: `${SITE_URL}/dashboard/maintenance` },
        ])}
      />
      <DashboardHeader heading="Maintenance" text="Manage and track maintenance requests">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Maintenance Requests</CardTitle>
              <CardDescription>View and manage all maintenance requests</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="open" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Open Requests</CardTitle>
              <CardDescription>Maintenance requests that need attention</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="open" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>In Progress Requests</CardTitle>
              <CardDescription>Maintenance requests currently being addressed</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="in-progress" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Scheduled Requests</CardTitle>
              <CardDescription>Maintenance requests with scheduled service</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="scheduled" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Completed Requests</CardTitle>
              <CardDescription>Maintenance requests that have been resolved</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
