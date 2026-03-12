/**
 * Single source of truth for blog slugs used in links and tests.
 * - Slugs from app/blog/[slug]/page.tsx POSTS (dynamic route)
 * - Slugs from app/blog/<slug>/page.tsx directories (static routes)
 * Keep in sync when adding or removing blog posts.
 */

/** Slugs served by the dynamic [slug] route (POSTS in app/blog/[slug]/page.tsx). */
const DYNAMIC_ROUTE_SLUGS = [
  "first-time-home-buyer-guide",
  "property-management-tips-utah-landlords",
  "mortgage-rate-trends-2025",
  "home-staging-tips-that-work",
  "understanding-property-taxes-utah",
] as const;

/** Slugs with their own app/blog/<slug>/page.tsx static directory. */
const STATIC_ROUTE_SLUGS = [
  "why-utah-best-real-estate-investment",
  "vacancy-risk-playbook",
  "utah-rent-vs-buy-wasatch-front",
  "technical-seo-for-real-estate",
  "renting-vs-owning-hidden-math",
  "property-management-automation-checklist",
  "new-landlord-mistakes-systems",
  "modernizing-notary-workflows-integration",
  "maintenance-capex-strategy",
  "full-stack-dev-landlord-gaps",
  "engineering-real-estate-investment-calculators",
  "designing-property-owner-portal",
  "dashboards-for-landlords",
  "crypto-and-real-estate-hedge",
  "commercial-real-estate-101-tenant-mix",
  "building-high-performance-real-estate-nextjs-supabase",
  "remote-online-notary-real-estate-closings",
  "remote-online-notary-all-50-states",
  "prepare-for-remote-online-notary-session",
  "mobile-notary-utah-county-guide",
] as const;

/** Every slug that must resolve (either [slug] POSTS or app/blog/<slug>/page.tsx). */
export const ALL_VALID_BLOG_SLUGS = new Set<string>([
  ...DYNAMIC_ROUTE_SLUGS,
  ...STATIC_ROUTE_SLUGS,
]);

/**
 * Slugs linked from the blog index page (app/blog/page.tsx).
 * Every entry must be in ALL_VALID_BLOG_SLUGS or /blog/[slug] will 404.
 */
export const BLOG_INDEX_SLUGS = [
  "remote-online-notary-all-50-states",
  "renting-vs-owning-hidden-math",
  "full-stack-dev-landlord-gaps",
  "commercial-real-estate-101-tenant-mix",
  "crypto-and-real-estate-hedge",
  "new-landlord-mistakes-systems",
  "utah-rent-vs-buy-wasatch-front",
  "property-management-automation-checklist",
  "vacancy-risk-playbook",
  "maintenance-capex-strategy",
  "dashboards-for-landlords",
  "building-high-performance-real-estate-nextjs-supabase",
  "engineering-real-estate-investment-calculators",
  "modernizing-notary-workflows-integration",
  "technical-seo-for-real-estate",
  "designing-property-owner-portal",
  "mobile-notary-utah-county-guide",
  "remote-online-notary-real-estate-closings",
  "prepare-for-remote-online-notary-session",
  "first-time-home-buyer-guide",
] as const;

export function isValidBlogSlug(slug: string): boolean {
  return ALL_VALID_BLOG_SLUGS.has(slug);
}
