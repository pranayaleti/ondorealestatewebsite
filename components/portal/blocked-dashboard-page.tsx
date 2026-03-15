import type { Metadata } from "next"
import { ProtectedPortalNotice } from "@/components/portal/protected-portal-notice"

export const metadata: Metadata = {
  title: "Secure staff portal | Ondo Real Estate",
  description: "Sign in to access the secure Ondo Real Estate staff portal.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/auth",
  },
}

export default function BlockedDashboardPage() {
  return (
    <ProtectedPortalNotice
      title="Staff portal access is handled in the secure app"
      description="Dashboard routes are intentionally hidden from the public marketing site. Sign in through the secure portal to continue."
    />
  )
}
