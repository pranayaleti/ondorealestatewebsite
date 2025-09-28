/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint for better code quality
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily disable TypeScript checking
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none';",
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Static assets caching
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API routes caching
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
      // HTML pages caching
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for static images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable image optimization
    unoptimized: false,
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
