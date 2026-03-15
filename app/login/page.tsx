import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
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

/**
 * /login is linked to from external sources (emails, old bookmarks, header CTA).
 * The canonical auth page lives at /auth — redirect permanently.
 */
export default function LoginRedirect() {
  redirect("/auth")
}
