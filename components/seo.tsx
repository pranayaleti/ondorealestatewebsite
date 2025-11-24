import type { Metadata } from "next"
import Script from "next/script"
import { SITE_NAME, SITE_URL } from "@/lib/site"

type SEOProps = {
  title: string
  description: string
  pathname?: string
  image?: string
  jsonLd?: object | null
  keywords?: string[]
  noindex?: boolean
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function SEO({ 
  title, 
  description, 
  pathname = "/", 
  image, 
  jsonLd = null,
  keywords = [],
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOProps) {
  const domain = SITE_URL
  const url = `${domain.replace(/\/$/, "")}${pathname}`
  const ogImage = image || `${domain}/modern-office-building.webp`
  
  // Enhanced keywords with default real estate terms
  const defaultKeywords = [
    // Core brand/market terms
    "Utah real estate",
    "Utah real estate listings",
    "real estate Utah",
    "homes for sale Utah",
    "houses for sale Utah",
    // Services
    "property management Utah",
    "rental property management",
    "tenant screening Utah",
    "landlord services Utah",
    "home buying Utah",
    "first-time home buyer Utah",
    "home selling Utah",
    "sell my house Utah",
    // Finance
    "mortgage loans Utah",
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
    "Salt Lake County real estate",
    "Davis County real estate",
    // Topics
    "Utah housing market",
    "MLS listings Utah",
  ]
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])]

  // Build additional Open Graph Article meta tags conditionally
  const otherMeta: Record<string, string | number | (string | number)[]> = {}
  if (publishedTime) otherMeta["article:published_time"] = publishedTime
  if (modifiedTime) otherMeta["article:modified_time"] = modifiedTime
  if (author) otherMeta["article:author"] = author
  if (section) otherMeta["article:section"] = section
  if (tags && tags.length > 0) otherMeta["article:tag"] = tags

  const metadata: Metadata = {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: allKeywords,
    robots: noindex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
      creator: "@OnDoRealEstate",
      site: "@OnDoRealEstate",
    },
    alternates: {
      canonical: url,
    },
    other: otherMeta,
  }

  return (
    <>
      <Script id="seo-jsonld" type="application/ld+json" strategy="afterInteractive">
        {jsonLd ? JSON.stringify(jsonLd) : '{}'}
      </Script>
    </>
  )
}
