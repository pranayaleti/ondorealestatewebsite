import type React from "react"
import type { Metadata } from "next"
import AuthGuard from "@/components/auth-guard"
import { OwnerSidebarNav, OwnerMobileNav } from "@/components/owner/owner-navigation"

export const metadata: Metadata = {
  title: "Owner Dashboard - Ondo Real Estate",
  description: "Manage your properties and tenants",
}

interface OwnerLayoutProps {
  children: React.ReactNode
}

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <AuthGuard requiredRole="owner">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-muted/40 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Owner Portal</h2>
          </div>
          <OwnerSidebarNav />
        </div>

        {/* Mobile navigation */}
        <OwnerMobileNav />

        {/* Main content */}
        <div className="flex-1 flex flex-col pb-16 md:pb-0">{children}</div>
      </div>
    </AuthGuard>
  )
}
