import type { Metadata } from "next"
import VendorManagement from "@/components/owner/vendor-management"

export const metadata: Metadata = {
  title: "Vendors & Contractors | Ondo Real Estate",
  description: "Manage your approved vendor and contractor network",
}

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <VendorManagement />
    </div>
  )
}
