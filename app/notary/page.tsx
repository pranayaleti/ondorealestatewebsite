import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import NotaryClient from "./notary-client"

export const metadata: Metadata = {
  title: "Remote Online Notary – Available Nationwide | ONDO Notary",
  description: "Secure Remote Online Notarization (RON) for clients across all 50 U.S. states. Mobile and in-office notarization in Utah County. Specializing in real estate, loan signings, affidavits, and estate documents.",
  alternates: { canonical: `${SITE_URL}/notary/` },
  openGraph: {
    title: "Remote Online Notary – Available Nationwide | ONDO Notary",
    description: "Secure Remote Online Notarization (RON) for clients across all 50 U.S. states. Mobile and in-office notarization in Utah County. Specializing in real estate, loan signings, affidavits, and estate documents.",
    url: `${SITE_URL}/notary/`,
  },
}

export default function NotaryPage() {
  return <NotaryClient />
}
