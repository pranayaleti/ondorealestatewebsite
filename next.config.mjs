/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  // Note: headers() and rewrites() are not supported with static export
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@mui/material',
      '@mui/icons-material',
      'recharts',
      'date-fns',
      'lodash',
    ],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Note: swcMinify is enabled by default in Next.js 15, no need to specify
  // Note: Removed custom webpack splitChunks config to avoid CSS loading issues
  // Next.js already handles code splitting efficiently, and optimizePackageImports
  // provides additional bundle size optimizations
  // Headers and rewrites are not compatible with static export
  // They have been removed for GitHub Pages deployment
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90, 95, 100], // Configure allowed quality values for Next.js 16
    minimumCacheTTL: 31536000, // 1 year cache for static images
    dangerouslyAllowSVG: true,
    domains: ['images.unsplash.com'],
    // Removed CSP from images config - CSP is now handled via meta tag in layout.tsx
    // Disable image optimization for static export
    unoptimized: true,
  },
  trailingSlash: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  // Modern JavaScript output (removes legacy code)
  transpilePackages: [],
  // Optimize for modern browsers
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
}

export default nextConfig
