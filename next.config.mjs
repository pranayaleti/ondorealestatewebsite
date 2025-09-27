/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // Property Management SEO slugs
      { source: "/property-management-in-:city(.*)-utah", destination: "/property-management/:city" },
      { source: "/property-management-in-:zip(\\d{5})", destination: "/property-management/zip/:zip" },
      { source: "/property-management-:zip(\\d{5})", destination: "/property-management/zip/:zip" },

      // Buy/Sell SEO slugs
      { source: "/real-estate-agents-in-:city(.*)-utah", destination: "/buy-sell/:city" },
      { source: "/buy-or-sell-in-:city(.*)-utah", destination: "/buy-sell/:city" },
      { source: "/real-estate-:zip(\\d{5})", destination: "/buy-sell/zip/:zip" },

      // Loans SEO slugs
      { source: "/mortgage-lenders-in-:city(.*)-utah", destination: "/loans/:city" },
      { source: "/home-loans-in-:city(.*)-utah", destination: "/loans/:city" },
      { source: "/mortgage-:zip(\\d{5})", destination: "/loans/zip/:zip" },
    ]
  },
}

export default nextConfig
