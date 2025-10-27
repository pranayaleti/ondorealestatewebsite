import { allCitySlugs, allZips } from "@/lib/utah-cities"
import { SITE_URL } from "@/lib/site"
import { NextResponse } from "next/server"

function url(loc: string, priority = 0.7) {
  return `\n  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

export async function GET() {
  const base = SITE_URL.replace(/\/$/, "")
  const cityUrls = allCitySlugs.flatMap((slug) => [
    `${base}/property-management/${slug}/`,
    `${base}/buy-sell/${slug}/`,
    `${base}/loans/${slug}/`,
  ])
  const zipUrls = allZips.flatMap((zip) => [
    `${base}/property-management/zip/${zip}/`,
    `${base}/buy-sell/zip/${zip}/`,
    `${base}/loans/zip/${zip}/`,
  ])

  const staticUrls = [
    `${base}/`,
    `${base}/properties/`,
    `${base}/property-management/`,
    `${base}/buy/`,
    `${base}/sell/`,
    `${base}/loans/`,
    `${base}/contact/`,
    `${base}/about/`,
    `${base}/why-utah/`,
    `${base}/faq/`,
    `${base}/calculators/`,
    `${base}/sweepstakes/`,
  ]

  // Prioritize service pages
  const serviceUrls = [
    `${base}/property-management/`,
    `${base}/buy/`,
    `${base}/sell/`,
    `${base}/loans/`,
  ]
  
  const otherStaticUrls = staticUrls.filter(url => !serviceUrls.includes(url))

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
    [
      ...serviceUrls.map((u) => url(u, 0.9)), // Highest priority for service pages
      ...otherStaticUrls.map((u) => url(u, 0.8)),
      ...cityUrls.map((u) => url(u, 0.8)),
      ...zipUrls.map((u) => url(u, 0.6)),
    ].join("")
  }\n</urlset>`

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}


