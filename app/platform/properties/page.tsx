import type { Metadata } from "next"
import { PropertiesClientPage } from "@/app/platform/properties/properties-client-page"

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Browse Ondo listings with map/grid modes and advanced filters.",
}

export default function PlatformPropertiesPage() {
  return <PropertiesClientPage />
}
