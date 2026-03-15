import type { Metadata } from "next"
import { ProtectedPortalNotice } from "@/components/portal/protected-portal-notice"

export const metadata: Metadata = {
  title: "Secure owner portal | Ondo Real Estate",
  description: "Sign in to access the secure Ondo Real Estate owner portal.",
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

export default function BlockedOwnerPage() {
  return (
    <ProtectedPortalNotice
      title="Owner portal access is available after secure sign in"
      description="Owner routes on the marketing site are gated to avoid exposing placeholder portal content. Use the secure sign-in flow to reach the live workspace."
    />
  )
}
