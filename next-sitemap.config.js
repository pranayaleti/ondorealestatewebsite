/** @type {import('next-sitemap').IConfig} */

// Static lastmod dates by path prefix. Update when making meaningful content changes.
const SECTION_LASTMOD = {
  '/blog/': '2026-03-07',
  '/property-management': '2026-03-07',
  '/buy': '2026-03-07',
  '/sell': '2026-03-07',
  '/loans': '2026-03-07',
  '/investments': '2026-03-07',
  '/calculators': '2026-03-07',
  '/notary': '2026-03-07',
  '/faq': '2026-03-07',
  '/resources': '2026-03-07',
  '/about': '2026-03-07',
  '/contact': '2026-03-07',
}

const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString().split('T')[0]

function getLastmod(path) {
  for (const [prefix, date] of Object.entries(SECTION_LASTMOD)) {
    if (path.startsWith(prefix)) return date
  }
  return BUILD_DATE
}

// Priority tiers:
//  1.0 — homepage
//  0.9 — primary service pages (property-management, buy, sell, loans, contact, properties)
//  0.8 — secondary landing pages (investments, calculators index, blog index, about, faq index)
//  0.7 — content pages (blog posts, calculator sub-pages, faq sub-pages)
//  0.5 — utility pages (resources, notary, news, privacy, terms)
function getPriority(path) {
  if (path === '/') return 1.0
  const tier9 = ['/property-management', '/buy', '/sell', '/loans', '/contact', '/properties']
  if (tier9.includes(path)) return 0.9
  const tier8 = ['/investments', '/calculators', '/blog', '/about', '/faq', '/sweepstakes']
  if (tier8.some(p => path === p)) return 0.8
  const tier5 = ['/resources', '/notary', '/news', '/privacy-policy', '/terms-of-service', '/accessibility', '/sitemap']
  if (tier5.some(p => path.startsWith(p))) return 0.5
  return 0.7
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ondorealestate.com',
  generateRobotsTxt: false,
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
    '/feedback',
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: getPriority(path),
      lastmod: getLastmod(path),
      alternateRefs: [],
    }
  },
}


