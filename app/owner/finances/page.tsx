import type { Metadata } from "next"
import { FinancesView } from "@/components/owner/finances-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DollarSign, Home } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Finances | Ondo Real Estate",
  description: "Manage your property finances",
}

export default function FinancesPage() {
  return (
    <div className="space-y-6 p-6">
      <SEO
        title="Owner Finances | Ondo Real Estate"
        description="Track income, expenses, and financial performance in the owner portal."
        pathname="/owner/finances"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Owner", url: `${SITE_URL}/owner` },
          { name: "Finances", url: `${SITE_URL}/owner/finances` },
        ])}
      />
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner/finances">
                <DollarSign className="h-4 w-4 mr-1" />
                Finances
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Financial Management</h1>
        <p className="text-foreground/70">Track income, expenses, and financial performance</p>
      </div>

      <FinancesView />
    </div>
  )
}
