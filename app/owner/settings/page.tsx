import { UnderMaintenance } from "@/components/ui/under-maintenance"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Settings } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export default function OwnerSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Owner Settings | Ondo Real Estate"
        description="Manage your account preferences and settings in the owner portal."
        pathname="/owner/settings"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Settings", url: `${SITE_URL}/owner/settings` },
        ])}
      />
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner/settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <UnderMaintenance
        title="Settings Coming Soon"
        description="We're currently developing the settings page to give you more control over your account. Please check back soon."
        showHomeButton={false}
        actionText="Return to Dashboard"
        actionHref="/owner"
      />
    </div>
  )
}
