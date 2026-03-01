"use client"

import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitMaintenanceRequest } from "@/lib/api/maintenance"

export default function TenantDashboardPage() {
  const [requestState, setRequestState] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  })
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await submitMaintenanceRequest({
      leaseId: "LEASE-001",
      title: requestState.title,
      description: requestState.description,
      priority: requestState.priority,
    })
    setStatusMessage(
      result.queued
        ? "Maintenance request saved offline and queued for sync."
        : "Maintenance request submitted."
    )
    setRequestState({ title: "", description: "", priority: "medium" })
  }

  return (
    <RoleGuard allowedRoles={["tenant", "admin"]}>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Tenant Dashboard</h1>
          <p className="text-foreground/70">Lease, maintenance, payments, and documents in one place.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lease Details</CardTitle>
              <CardDescription>Active lease summary and key dates.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">Lease #LEASE-001 · Renewal on 2027-01-15</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pay Rent</CardTitle>
              <CardDescription>UI structure placeholder for payment gateway integration.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" type="button">
                Open Payment Checkout (UI Only)
              </Button>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Submit Maintenance Request</CardTitle>
            <CardDescription>Supports offline queue + background sync.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="maint-title">Title</Label>
                <Input
                  id="maint-title"
                  value={requestState.title}
                  onChange={(event) =>
                    setRequestState((prev) => ({ ...prev, title: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maint-description">Description</Label>
                <Textarea
                  id="maint-description"
                  value={requestState.description}
                  onChange={(event) =>
                    setRequestState((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maint-priority">Priority</Label>
                <select
                  id="maint-priority"
                  className="h-10 rounded-md border bg-background px-3 text-sm"
                  value={requestState.priority}
                  onChange={(event) =>
                    setRequestState((prev) => ({
                      ...prev,
                      priority: event.target.value as "low" | "medium" | "high",
                    }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button type="submit">Submit Request</Button>
              {statusMessage ? <p className="text-sm text-foreground/80">{statusMessage}</p> : null}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Download lease and compliance documents.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80">Document index API can be wired to secure signed URLs.</p>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  )
}
