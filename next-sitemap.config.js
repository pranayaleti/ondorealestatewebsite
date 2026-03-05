/** @type {import('next-sitemap').IConfig} */

// Static lastmod dates by path prefix. Pages not listed here fall back to
// BUILD_DATE so they only show as "changed" when the code actually changes.
// Update a date here when you make meaningful content updates to that section.
const SECTION_LASTMOD = {
  '/blog/': '2025-12-10',
  '/property-management': '2025-11-01',
  '/buy': '2025-11-01',
  '/sell': '2025-11-01',
  '/loans': '2025-11-01',
  '/investments': '2025-11-01',
  '/calculators': '2025-11-01',
  '/notary': '2025-01-10',
  '/faq': '2025-10-01',
  '/resources': '2025-10-01',
}

// BUILD_DATE is set once per build so all unchanged pages share the same date.
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString().split('T')[0]

function getLastmod(path) {
  for (const [prefix, date] of Object.entries(SECTION_LASTMOD)) {
    if (path.startsWith(prefix)) return date
  }
  return BUILD_DATE
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ondorealestate.com',
  generateRobotsTxt: false, // we manage robots via app route and public/robots.txt
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.7,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  exclude: [
    '/dashboard/**',
    '/owner/**',
    '/tenant/**',
    '/auth/**',
    '/login',
    '/admin/**',
    '/api/**',
  ],
  transform: async (config, path) => {
    // Boost priority for primary service landing pages
    const highPriority = ['/property-management', '/buy', '/sell', '/loans']
    const priority = highPriority.includes(path) ? 0.9 : 0.7
    return {
      loc: path,
      changefreq: 'weekly',
      priority,
      lastmod: getLastmod(path),
      alternateRefs: [],
    }
  },
}


