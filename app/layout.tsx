import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SITE_NAME, SITE_URL, SITE_PHONE, SITE_HOURS, SITE_SOCIALS } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], weight: ["400","500","700","800"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Utah Property Management, Buying, Selling, Loans`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Utah real estate experts for property management, buying, selling, and home loans. Local service across the Wasatch Front.",
  keywords: [
    "Utah real estate",
    "property management Utah",
    "homes for sale Utah",
    "buy house Utah",
    "sell house Utah",
    "Utah home loans",
    "Salt Lake City",
    "Lehi",
    "Provo",
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
  },
  generator: "OndoSoft",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
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
              addressRegion: 'UT',
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
      </body>
    </html>
  )
}
