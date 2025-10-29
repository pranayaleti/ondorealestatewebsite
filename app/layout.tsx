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
import ConsultationWidget from "@/components/ConsultationWidget"
import { SITE_NAME, SITE_URL, SITE_PHONE, SITE_HOURS, SITE_SOCIALS, SITE_ADDRESS } from "@/lib/site"
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ["latin"], weight: ["400","500","700","800"] })
const outfit = Outfit({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-outfit" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Utah Property Management, Buying, Selling, Loans`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Utah real estate experts for property management, buying, selling, and home loans. Local service across the Wasatch Front.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${outfit.variable} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ConsultationWidget />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        {/* Site-wide JSON-LD for Organization/LocalBusiness/RealEstateAgent */}
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Organization', 'LocalBusiness', 'RealEstateAgent'],
            name: SITE_NAME,
            url: SITE_URL,
            telephone: SITE_PHONE,
            image: `${SITE_URL}/placeholder-logo.png`,
            areaServed: 'Utah',
            openingHours: SITE_HOURS,
            sameAs: SITE_SOCIALS,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '2701 N Thanksgiving Way',
              addressLocality: 'Lehi',
              addressRegion: 'UT',
              postalCode: '84043',
              addressCountry: 'US',
            },
            makesOffer: [
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Property Management' },
              },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Buying' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Selling' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Loans' } },
            ],
          })}
        </Script>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSND5XGJ87"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SSND5XGJ87');
          `}
        </Script>
        <Analytics />
        {/* rb2b Script */}
        <Script
          id="rb2b-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(key) {
                if (window.reb2b) return;
                window.reb2b = {loaded: true};
                var s = document.createElement("script");
                s.async = true;
                s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
                document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
              }("961Y0H4259NG");
            `,
          }}
        />
      </body>
    </html>
  )
}
