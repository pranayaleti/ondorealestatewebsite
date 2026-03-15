import type { Metadata } from "next"
import { ProtectedPortalNotice } from "@/components/portal/protected-portal-notice"

export const metadata: Metadata = {
  title: "Secure platform access | Ondo Real Estate",
  description: "Platform prototypes are not exposed on the public Ondo Real Estate site.",
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

export default function BlockedPlatformPage() {
  return (
    <ProtectedPortalNotice
      title="Platform demos are no longer exposed on the public site"
      description="Prototype platform routes are gated so the marketing site only shows real, supported product entry points."
    />
  )
}
