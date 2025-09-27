import { Suspense } from "react"
import LandingPage from "@/components/landing-page"
import Loading from "@/components/loading"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SEO
        title="Utah Property Management, Buying & Selling"
        description="OnDo Real Estate provides professional property management, home buying, and selling services across Utah. Explore listings, loans, and expert guidance."
        pathname="/"
        image={`${SITE_URL}/placeholder.jpg`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
        ])}
      />
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    </main>
  )
}
