/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
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
    // Stale-time for client router cache (seconds). Reduces redundant server
    // fetches for static pages the user has already visited in the session.
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  output: 'export',

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    domains: ['images.unsplash.com'],
  },

  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  transpilePackages: [],

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Deterministic moduleIds for better long-term caching (unchanged modules keep hash)
      config.optimization.moduleIds = 'deterministic'
    }
    return config
  },
}

export default nextConfig
