import type { Metadata } from "next"
import { RoleGuard } from "@/components/auth/role-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Owner operations for property portfolio, rent, documents, and maintenance visibility.",
}

export default function OwnerDashboardPage() {
  return (
    <RoleGuard allowedRoles={["owner", "admin"]}>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Owner Dashboard</h1>
          <p className="text-foreground/70">Portfolio management with rental performance and maintenance visibility.</p>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Owned Properties</CardTitle>
              <CardDescription>Track occupancy and performance by property.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">3 properties · 92% occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rent Status</CardTitle>
              <CardDescription>Current month collections and outstanding balances.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">$12,430 collected · $1,100 pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Document Uploads</CardTitle>
              <CardDescription>Lease docs, tax files, and compliance records.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">Use signed URL upload flow in production API.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>Open maintenance tickets across your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">5 open · 2 urgent · 1 waiting on vendor</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </RoleGuard>
  )
}
