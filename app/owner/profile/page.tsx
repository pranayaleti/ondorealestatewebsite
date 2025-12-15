import type { Metadata } from "next"
import { ProfileView } from "@/components/owner/profile-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, User } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Profile | Real Estate",
  description: "Manage your profile information",
}

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Owner Profile | Ondo Real Estate"
        description="Manage your profile information, preferences, and settings in the owner portal."
        pathname="/owner/profile"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Profile", url: `${SITE_URL}/owner/profile` },
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
              <BreadcrumbLink href="/owner/profile">
                <User className="h-4 w-4 mr-1" />
                Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-foreground/70">Manage your personal information and account settings</p>
      </div>

      <ProfileView />
    </div>
  )
}
