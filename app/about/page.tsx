import { Button } from "@/components/ui/button"
import Link from "next/link"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <SEO
        title="Ondo Real Estate — One-Stop Property Services | Buy • Sell • Manage • Loans"
        description="Ondo Real Estate — one-stop real estate solution for buying, selling, property management (condo, townhouse, single-family home, land) and mortgage services. Tech-driven, Utah-focused, results-first."
        pathname="/about"
        image={`${SITE_URL}/placeholder.jpg`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ])}
      />
      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px]">
        <Image
          src="/modern-office-building.png"
          alt="Modern Utah home exterior representing Ondo Real Estate property services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Ondo Real Estate — Your One-Stop Real Estate Engine
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Buy. Sell. Manage. Finance. All in one place — smart, simple, unstoppable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="text-center mb-16">
              <p className="text-xl md:text-2xl leading-relaxed mb-8 dark:text-muted-foreground">
                Ondo Real Estate combines elite real estate expertise with cutting-edge technology to give owners, buyers, tenants, and investors a single place to get things done. Whether you're buying or selling a condo, townhouse, single-family home, or land — or need thorough property management and loan solutions — Ondo moves fast, thinks ahead, and protects your returns.
              </p>
            </div>

            {/* Why This Matters */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 dark:text-foreground">Why This Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-semibold mb-3 text-orange-900 dark:text-orange-100">Skip the noise</h3>
                  <p className="text-orange-800 dark:text-orange-200">One contract, one portal, one trusted partner.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-semibold mb-3 text-orange-900 dark:text-orange-100">Built for outcomes</h3>
                  <p className="text-orange-800 dark:text-orange-200">More leased properties, faster sales, higher NOI.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-semibold mb-3 text-orange-900 dark:text-orange-100">Tech-first approach</h3>
                  <p className="text-orange-800 dark:text-orange-200">Dashboards, tenant-owner workflows, and automated reporting.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-semibold mb-3 text-orange-900 dark:text-orange-100">Local expertise</h3>
                  <p className="text-orange-800 dark:text-orange-200">Utah-native market knowledge with national reach.</p>
                </div>
              </div>
            </div>

            {/* Core Services */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 dark:text-foreground">Our Core Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-muted dark:bg-muted p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">Buying & Selling</h3>
                  <ul className="space-y-3 dark:text-muted-foreground">
                    <li>• Strategic listing & acquisition services for condos, townhouses, single-family homes (SFH), and land</li>
                    <li>• Market-driven pricing, premium staging guidance, and negotiators who close</li>
                  </ul>
                </div>

                <div className="bg-muted dark:bg-muted p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">Property Management</h3>
                  <ul className="space-y-3 dark:text-muted-foreground">
                    <li>• Full-service property management: tenant sourcing, screening, rent collection, maintenance coordination</li>
                    <li>• Owner dashboard & tenant portal — transparent, real-time, no surprises</li>
                  </ul>
                </div>

                <div className="bg-muted dark:bg-muted p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">Loans & Financing</h3>
                  <ul className="space-y-3 dark:text-muted-foreground">
                    <li>• End-to-end mortgage and loan services for purchases, refinance, and investment properties</li>
                    <li>• Fast pre-approvals, competitive partners, and loan officers who think like investors</li>
                  </ul>
                </div>

                <div className="bg-muted dark:bg-muted p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">Investor Services</h3>
                  <ul className="space-y-3 dark:text-muted-foreground">
                    <li>• Portfolio optimization, cashflow modeling, and hands-off management for multi-property owners</li>
                    <li>• Strategic acquisition sourcing tailored to yield and value-add opportunities</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Choose Ondo */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 dark:text-foreground">Why Choose Ondo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-foreground">We're multidisciplinary</h3>
                    <p className="dark:text-muted-foreground">Real estate agents, property managers, and mortgage experts working as one team.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-foreground">We ship results</h3>
                    <p className="dark:text-muted-foreground">Faster leasing, higher sale prices, lower vacancy, and streamlined financing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-foreground">We protect value</h3>
                    <p className="dark:text-muted-foreground">Proactive maintenance, legal compliance, and smart tenant selection.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-foreground">We use data</h3>
                    <p className="dark:text-muted-foreground">Market insights, rent comps, and predictive analytics guide every decision.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Roots */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold mb-6 dark:text-foreground">Local Roots, Scale-Driven</h2>
              <p className="text-xl leading-relaxed dark:text-muted-foreground max-w-3xl mx-auto">
                We know Utah — its neighborhoods, regulatory landscape, and investment pockets. That local knowledge is combined with national networks and enterprise-level technology so you get the best of both worlds: hometown intuition and institutional efficiency.
              </p>
            </div>

            {/* Our Promise */}
            <div className="mb-16 text-center bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-8 rounded-lg border border-orange-200 dark:border-orange-800">
              <h2 className="text-3xl font-bold mb-6 dark:text-foreground">Our Promise</h2>
              <p className="text-xl leading-relaxed dark:text-muted-foreground">
                Clear communication. Relentless execution. Real returns. We don't do busywork — we produce predictable outcomes and measurable value.
              </p>
            </div>

            {/* Social Proof */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold mb-6 dark:text-foreground">Trusted by Utah</h2>
              <p className="text-xl leading-relaxed dark:text-muted-foreground max-w-3xl mx-auto">
                Trusted by homeowners, investors, and tenants across Utah. Success stories include faster-than-market sales, reduced vacancy times, and consistent rent growth for managed portfolios.
              </p>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-muted dark:bg-muted p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-8 dark:text-foreground">Ready to move forward?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-background dark:bg-background p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2 dark:text-foreground">Owners</h3>
                  <p className="text-sm dark:text-muted-foreground mb-3">Schedule a free portfolio evaluation</p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
                <div className="bg-background dark:bg-background p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2 dark:text-foreground">Sellers & Buyers</h3>
                  <p className="text-sm dark:text-muted-foreground mb-3">Get a market analysis or property match</p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
                <div className="bg-background dark:bg-background p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2 dark:text-foreground">Investors</h3>
                  <p className="text-sm dark:text-muted-foreground mb-3">Request cashflow modelling</p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
                <div className="bg-background dark:bg-background p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2 dark:text-foreground">Loans</h3>
                  <p className="text-sm dark:text-muted-foreground mb-3">Get pre-qualified today</p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/loans">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
