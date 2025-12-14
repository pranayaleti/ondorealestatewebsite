import { JsonLd } from "@/components/json-ld"
import {
  generateBlogPostingJsonLd,
  generateBreadcrumbJsonLd,
  generateWebPageJsonLd,
} from "@/lib/seo"
import { SITE_NAME, SITE_URL } from "@/lib/site"

type SEOProps = {
  title: string
  description: string
  pathname?: string
  image?: string
  jsonLd?: object | object[] | null
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
  const domain = SITE_URL.replace(/\/$/, "")
  const toAbsolute = (value?: string) => {
    if (!value) return undefined
    return value.startsWith("http://") || value.startsWith("https://") ? value : `${domain}${value}`
  }

  const url = `${domain}${pathname}`
  const ogImage = toAbsolute(image) || `${domain}/modern-office-building.webp`
  void noindex

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

  const providedJsonLd = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : []

  const hasType = (entries: object[], typeName: string) =>
    entries.some((entry) => {
      const type = (entry as any)?.["@type"]
      if (Array.isArray(type)) return type.includes(typeName)
      return type === typeName
    })

  const hasBlogPostingJsonLd = hasType(providedJsonLd, "BlogPosting")
  const hasWebPageJsonLd = hasType(providedJsonLd, "WebPage")
  const hasBreadcrumbJsonLd = hasType(providedJsonLd, "BreadcrumbList")

  const blogPostingJsonLd =
    !hasBlogPostingJsonLd && publishedTime
      ? generateBlogPostingJsonLd({
          title,
          description,
          url,
          image: ogImage,
          datePublished: publishedTime,
          dateModified: modifiedTime,
          authorName: author || SITE_NAME,
          keywords: [...new Set([...(tags || []), ...allKeywords])],
          articleSection: section,
        })
      : null

  const webPageJsonLd = !hasWebPageJsonLd
    ? generateWebPageJsonLd({
        name: title,
        url,
        description,
      })
    : null

  const breadcrumbJsonLd =
    !hasBreadcrumbJsonLd && pathname
      ? generateBreadcrumbJsonLd(buildBreadcrumbItems({ pathname, title, domain }))
      : null

  const payload = [
    ...providedJsonLd,
    ...(blogPostingJsonLd ? [blogPostingJsonLd] : []),
    ...(webPageJsonLd ? [webPageJsonLd] : []),
    ...(breadcrumbJsonLd ? [breadcrumbJsonLd] : []),
  ].filter(Boolean)

  if (!payload.length) return null

  return <JsonLd data={payload.length === 1 ? payload[0] : payload} id="seo-jsonld" />
}

function buildBreadcrumbItems({
  pathname,
  title,
  domain,
}: {
  pathname: string
  title: string
  domain: string
}) {
  const segments = pathname.split("/").filter(Boolean)
  const items: Array<{ name: string; url: string }> = [{ name: "Home", url: `${domain}/` }]

  let current = domain
  segments.forEach((segment, index) => {
    current += `/${segment}`
    const isLast = index === segments.length - 1
    const name = isLast ? title : humanizeSegment(segment)
    items.push({ name, url: current })
  })

  return items
}

function humanizeSegment(segment: string) {
  return segment
    .replace(/[\[\]]/g, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}