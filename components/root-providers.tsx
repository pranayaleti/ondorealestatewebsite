"use client"

import dynamic from "next/dynamic"
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
import ErrorBoundary from "@/components/error-boundary"

const ClientConsultationWidget = dynamic(() => import("@/components/ClientConsultationWidget"), {
  loading: () => null,
})

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <PwaProvider>
        <BfcacheProvider>
          <AuthProvider>
            <ScrollProgress />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-1" role="main">
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
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
  )
}
