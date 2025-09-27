/** @type {import('next-sitemap').IConfig} */
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
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    }
  },
}


