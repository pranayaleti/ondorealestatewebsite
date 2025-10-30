/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  // Note: headers() and rewrites() are not supported with static export
  output: 'export',
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
  // Headers and rewrites are not compatible with static export
  // They have been removed for GitHub Pages deployment
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for static images
    dangerouslyAllowSVG: true,
    domains: ['images.unsplash.com'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable image optimization for static export
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
