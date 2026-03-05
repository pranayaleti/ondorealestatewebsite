import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact Ondo Real Estate | Utah Property Management & Real Estate",
  description: "Get in touch with Ondo Real Estate for property management, rentals, or real estate services across Utah.",
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: {
    title: "Contact Ondo Real Estate | Utah Property Management & Real Estate",
    description: "Get in touch with Ondo Real Estate for property management, rentals, or real estate services across Utah.",
    url: `${SITE_URL}/contact/`,
  },
}

export default function ContactPage() {
  return <ContactClient />
}
