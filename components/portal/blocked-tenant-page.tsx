import type { Metadata } from "next"
import { ProtectedPortalNotice } from "@/components/portal/protected-portal-notice"

export const metadata: Metadata = {
  title: "Secure tenant portal | Ondo Real Estate",
  description: "Sign in to access the secure Ondo Real Estate tenant portal.",
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

export default function BlockedTenantPage() {
  return (
    <ProtectedPortalNotice
      title="Tenant portal access is available after secure sign in"
      description="Tenant routes are intentionally gated on the public site. Sign in to the secure portal to access payments, maintenance, and lease information."
    />
  )
}
