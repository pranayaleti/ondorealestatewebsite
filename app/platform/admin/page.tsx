import type { Metadata } from "next"
import { RoleGuard } from "@/components/auth/role-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Administrative operations for users, listings, approvals, and analytics.",
}

export default function AdminPanelPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Admin Panel</h1>
          <p className="text-foreground/70">Manage users, properties, approvals, and analytics insights.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>Role assignments, access policies, and account lifecycle.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">User table + bulk actions placeholder.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage Properties</CardTitle>
              <CardDescription>Create, update, and archive property records.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">Property moderation queue placeholder.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Approve Listings</CardTitle>
              <CardDescription>Review pending submissions from owners and agents.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">Approval workflow with audit log placeholder.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Analytics</CardTitle>
              <CardDescription>Top-level KPI layout for growth and retention tracking.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">
                Metrics cards: active listings, occupancy, average rent, inquiry conversion.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </RoleGuard>
  )
}
