import { NextResponse } from "next/server"

// Configure for static export
export const dynamic = "force-static";
export const revalidate = 0;

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /property-management/
Allow: /buy/
Allow: /sell/
Allow: /loans/
Allow: /properties/
Allow: /contact/
Allow: /about/
Allow: /why-utah/
Allow: /faq/
Allow: /calculators/
Allow: /buy-sell/
Allow: /refinance/

# Block admin and tenant portals
Disallow: /dashboard/
Disallow: /owner/
Disallow: /tenant/
Disallow: /auth/
Disallow: /login/

# Block API routes and internal files
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap location
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://ondorealestate.com'}/sitemap.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
