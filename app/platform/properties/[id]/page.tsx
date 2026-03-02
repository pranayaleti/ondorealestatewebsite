import type { Metadata } from "next"
import { PropertyDetailsClientPage } from "@/app/platform/properties/[id]/property-details-client-page"

export const metadata: Metadata = {
  title: "Property Details",
  description: "Detailed listing view with offline favorites and queued inquiry submission.",
}

export async function generateStaticParams() {
  return [{ id: "placeholder" }]
}

export default async function PlatformPropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PropertyDetailsClientPage propertyId={id} />
}
