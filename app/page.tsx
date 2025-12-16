import { Suspense } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/loading"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd, generateServiceJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

// Lazy load the landing page component
const LandingPage = dynamic(() => import("@/components/landing-page"), {
  loading: () => <Loading />,
  ssr: true, // Enable SSR for better SEO
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <SEO
        title="Utah Property Management, Buying & Selling"
        description="Ondo Real Estate provides professional property management, home buying, and selling services across Utah. Explore listings, loans, and expert guidance."
        pathname="/"
        image={`${SITE_URL}/modern-office-building.webp`}
        keywords={[
          // Core market/service
          "Utah real estate",
          "real estate Utah",
          "Utah real estate listings",
          "homes for sale Utah",
          "property management Utah",
          "rental property management",
          "tenant screening Utah",
          "home buying Utah",
          "first-time home buyer Utah",
          "home selling Utah",
          "sell my house Utah",
          "Utah home loans",
          "mortgage lender Utah",
          "mortgage pre-approval Utah",
          "refinance Utah",
          // Geos
          "Wasatch Front",
          "Salt Lake City real estate",
          "Lehi real estate",
          "Provo real estate",
          "Orem real estate",
          "Sandy real estate",
          "Draper real estate",
          "American Fork real estate",
          "Pleasant Grove real estate",
          "Utah County real estate",
          // Topics
          "Utah housing market",
          "MLS listings Utah",
        ]}
        jsonLd={[
          generateBreadcrumbJsonLd([{ name: "Home", url: SITE_URL }]),
          generateServiceJsonLd({
            name: "Utah Property Management, Buying & Selling",
            description:
              "Full-service Utah real estate: property management, buying, selling, and loans across the Wasatch Front.",
            serviceType: "Real Estate Services",
            areaServed: "Utah",
          }),
        ]}
      />
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    </main>
  )
}
