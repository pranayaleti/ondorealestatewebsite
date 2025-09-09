/** @type {import('next').NextConfig} */
const isCI = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // required for GitHub Pages
  },
  output: 'export',     // 👈 ensures Next.js generates ./out for static hosting
  // Optional: manually set paths if you don’t want configure-pages to inject them
  // basePath: isCI ? '/<your-repo-name>' : '',
  // assetPrefix: isCI ? '/<your-repo-name>/' : '',
};

export default nextConfig;
