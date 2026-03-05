import type { Metadata } from "next"
import { InvestmentsSubNav } from "@/components/investments/investments-sub-nav"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    default: "Investments | Ondo Real Estate",
    template: "%s | Ondo Real Estate Investments",
  },
  description:
    "Explore commercial real estate and fractional ownership investment opportunities in Utah with Ondo Real Estate.",
  alternates: { canonical: `${SITE_URL}/investments/` },
}

export default function InvestmentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InvestmentsSubNav />
      {children}
    </>
  )
}
