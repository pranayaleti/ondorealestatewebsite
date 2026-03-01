import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { platformRoutes } from "@/lib/routing/platform-routes"

export const metadata: Metadata = {
  title: "Platform Home",
  description: "Ondo Real Estate PWA role-based experience and sample modules.",
}

export default function PlatformHomePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Ondo Real Estate Platform</h1>
        <p className="text-foreground/70">
          Installable PWA foundation with offline support, background sync, and role-based modules.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {platformRoutes.map((entry) => (
          <Card key={entry.href}>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <CardDescription>{entry.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={entry.href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
