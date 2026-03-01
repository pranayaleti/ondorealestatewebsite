import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { BfcacheProvider } from "@/components/bfcache-provider"
import { PwaProvider } from "@/components/pwa/pwa-provider"
import { RoutePrefetch } from "@/components/route-prefetch"
import { WebVitalsReporter } from "@/components/web-vitals-reporter"
import dynamic from "next/dynamic"
import { JsonLd } from "@/components/json-ld"
import { generateOrganizationJsonLd, generateWebsiteJsonLd } from "@/lib/seo"

// Lazy load non-critical widgets
// Note: Can't use ssr: false in Server Components, but static export doesn't need SSR anyway
const ClientConsultationWidget = dynamic(() => import("@/components/ClientConsultationWidget"), {
  loading: () => null, // Don't show loading state for widget
})
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { getSpeculationRulesJson } from "@/lib/speculation-rules"
// Vercel Analytics is disabled for static exports (GitHub Pages)
// It only works on Vercel's platform, not with static site generation
// const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => mod.Analytics), { ssr: false })

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400","500","700","800"],
  display: 'swap', // Optimize font loading
  preload: true,
})
const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["400","500","600","700","800"], 
  variable: "--font-outfit",
  display: 'swap', // Optimize font loading
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Utah Property Management, Buying, Selling, Loans`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Utah real estate experts for property management, buying, selling, and home loans. Local service across the Wasatch Front.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },
  keywords: [
    // Core market/service
    "Utah real estate",
    "real estate Utah",
    "Utah real estate listings",
    "homes for sale Utah",
    "houses for sale Utah",
    "property management Utah",
    "rental property management",
    "tenant screening Utah",
    "home buying Utah",
    "first-time home buyer Utah",
    "home selling Utah",
    "sell my house Utah",
    "Utah home loans",
    "mortgage lender Utah",
    "mortgage pre-approval Utah",
    "refinance Utah",
    // Geos
    "Wasatch Front",
    "Salt Lake City real estate",
    "Lehi real estate",
    "Provo real estate",
    "Orem real estate",
    "Sandy real estate",
    "Draper real estate",
    "American Fork real estate",
    "Pleasant Grove real estate",
    "Utah County real estate",
    "Salt Lake County real estate",
    "Davis County real estate",
    // Topics
    "Utah housing market",
    "MLS listings Utah",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Utah Property Management, Buying, Selling, Loans`,
    description:
      "Utah real estate services: property management, buying, selling, refinancing, and mortgages.",
    images: [
      {
        url: `${SITE_URL}/modern-office-building.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} office building`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Utah Property Management, Buying, Selling, Loans`,
    description:
      "Utah real estate services: property management, buying, selling, refinancing, and mortgages.",
    images: [`${SITE_URL}/modern-office-building.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: "Next.js",
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'p:domain_verify': 'e6002f0bbb15bad4447b62fed255798b',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rb2bKey = process.env.NEXT_PUBLIC_RB2B_KEY
  return (
    <html lang="en" suppressHydrationWarning className="dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://ondorealestateserver.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ddwl4m2hdecbv.cloudfront.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://supabase.co" />

        {/* High-priority preloads for above-the-fold resources */}
        <link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" fetchPriority="high" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Speculation Rules API: prefetch + prerender same-origin pages for faster navigation */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: getSpeculationRulesJson() }}
        />
        {/* Prefetch fallback for browsers without Speculation Rules (same-origin, high-probability only) */}
        <link rel="prefetch" href="/" />
        <link rel="prefetch" href="/buy" />
        <link rel="prefetch" href="/sell" />
        <link rel="prefetch" href="/properties" />
        <link rel="prefetch" href="/contact" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://ddwl4m2hdecbv.cloudfront.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai data:; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://ddwl4m2hdecbv.cloudfront.net https://pro.ip-api.com https://ondorealestateserver.onrender.com; frame-src 'self';"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} ${outfit.variable} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PwaProvider>
            <BfcacheProvider>
              <AuthProvider>
                <ScrollProgress />
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <RoutePrefetch />
                <WebVitalsReporter />
                <ClientConsultationWidget />
                <Toaster />
              </AuthProvider>
            </BfcacheProvider>
          </PwaProvider>
        </ThemeProvider>
        <JsonLd
          id="global-jsonld"
          data={[generateOrganizationJsonLd(), generateWebsiteJsonLd()].filter(Boolean)}
        />
        {/* Google Analytics - Deferred to reduce render blocking and unused JS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSND5XGJ87"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SSND5XGJ87');
          `}
        </Script>
        {/* Vercel Analytics disabled for static exports - only works on Vercel platform */}
        {/* {process.env.NEXT_PUBLIC_VERCEL && <Analytics />} */}
        {/* rb2b Script (optional) - keep off by default for static export */}
        {rb2bKey ? (
          <Script
            id="rb2b-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function(key) {
                  if (window.reb2b) return;
                  window.reb2b = {loaded: true};
                  var s = document.createElement("script");
                  s.async = true;
                  s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
                  document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
                }("${rb2bKey}");
              `,
            }}
          />
        ) : null}
      </body>
    </html>
  )
}
