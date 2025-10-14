"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { TrendingUp, Building2, Briefcase, Users, Trees, Trophy, DollarSign, ShieldCheck, LineChart, MapPin } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export default function WhyUtahPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Why Invest in Utah"
        description="Utah's resilient economy, tech growth, and quality of life create strong real estate investment opportunities across the Wasatch Front."
        pathname="/why-utah"
        image={`${SITE_URL}/city-map-with-pin.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Why Utah", url: `${SITE_URL}/why-utah` },
        ])}
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[var(--gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]">
        <div className="absolute inset-0 bg-background/50" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
                Why Invest in <span className="text-primary">Utah</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
                Utah combines a resilient economy, nation‑leading job growth, a booming tech corridor, and
                quality‑of‑life advantages that continue to attract people and capital. Here is a clear,
                investor‑focused view of the opportunity—and how to act on it.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/properties" className="bg-primary hover:bg-primary text-foreground px-6 py-3 rounded-lg font-semibold">
                  Browse Properties
                </Link>
                <Link href="/calculators/mortgage-payment" className="bg-card/10 hover:bg-card/20 text-foreground px-6 py-3 rounded-lg font-semibold border border-white/20">
                  Run Numbers
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden ring-1 ring-primary/40">
              <Image 
                src="/city-map-with-pin.png" 
                alt="Utah growth map showing Wasatch Front real estate development and economic expansion" 
                fill 
                priority 
                style={{ objectFit: "cover" }}
                title="Utah Growth Map - Wasatch Front Real Estate Development"
                aria-label="Utah growth map showing Wasatch Front real estate development and economic expansion"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-primary backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">Top 5</div>
              <div className="text-foreground mt-2">Job Growth</div>
              <div className="text-muted-foreground text-sm">Consistently in the U.S.</div>
            </div>
            <div className="bg-primary backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">Silicon Slopes</div>
              <div className="text-foreground mt-2">Tech Corridor</div>
              <div className="text-muted-foreground text-sm">Lehi–SLC–Provo</div>
            </div>
            <div className="bg-primary backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">2034</div>
              <div className="text-foreground mt-2">Winter Olympics</div>
              <div className="text-muted-foreground text-sm">Tourism & Infra boost</div>
            </div>
            <div className="bg-primary backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">Landlord</div>
              <div className="text-foreground mt-2">Friendly</div>
              <div className="text-muted-foreground text-sm">Predictable processes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="flex items-center mb-6">
            <TrendingUp className="text-primary h-7 w-7 mr-4" />
            <h2 className="text-3xl font-bold text-foreground">Top Reasons Utah Wins for Investors</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Reason icon={<Briefcase className="h-5 w-5" />} title="Diverse, resilient economy">
              Utah balances tech, healthcare, finance, logistics, tourism, and outdoor industries—reducing
              exposure to any single sector and supporting steady tenant demand across cycles.
            </Reason>
            <Reason icon={<Users className="h-5 w-5" />} title="Population & migration growth">
              Strong in‑migration from higher‑cost states plus one of the youngest populations in the country
              fuels household formation and rental absorption.
            </Reason>
            <Reason icon={<Building2 className="h-5 w-5" />} title="Job creation in the tech corridor">
              “Silicon Slopes” (Lehi–Draper–SLC–Provo) continues to attract employers and venture funding,
              increasing incomes and supporting Class A and B rentals and build‑to‑rent communities.
            </Reason>
            <Reason icon={<DollarSign className="h-5 w-5" />} title="Relative affordability vs. coastal markets">
              While prices have appreciated, Utah still offers a compelling cost‑of‑living and business‑cost edge
              compared to West Coast hubs—expanding the renter and buyer pool.
            </Reason>
            <Reason icon={<ShieldCheck className="h-5 w-5" />} title="Landlord‑friendly, predictable processes">
              Streamlined processes and practical timelines mean fewer surprises for operators compared with
              stricter jurisdictions.
            </Reason>
            <Reason icon={<Trophy className="h-5 w-5" />} title="2034 Winter Olympics tailwinds">
              The upcoming Games catalyze infrastructure, hospitality, and global visibility—historic precedents
              point to durable demand lifts in the years around the event.
            </Reason>
            <Reason icon={<Trees className="h-5 w-5" />} title="Lifestyle moat: outdoors, safety, community">
              World‑class recreation, short commutes, and family‑centric communities drive sticky demand and low
              long‑term vacancy.
            </Reason>
            <Reason icon={<LineChart className="h-5 w-5" />} title="Healthy long‑term fundamentals">
              Balanced new supply, pro‑growth policy, and diversified employers create a favorable backdrop for
              cash‑flow today and appreciation tomorrow.
            </Reason>
          </div>
        </div>

        {/* Where to Invest */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="flex items-center mb-6">
            <MapPin className="text-primary h-7 w-7 mr-4" />
            <h2 className="text-3xl font-bold text-foreground">Target Sub‑Markets</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <MarketCard title="Lehi / Silicon Slopes" note="Tech jobs, BTR, strong renter incomes" />
            <MarketCard title="Salt Lake City" note="Urban core, medical & finance, transit access" />
            <MarketCard title="Utah County (Provo–Orem)" note="University demand, stable occupancy" />
          </div>
        </div>

        {/* Strategy */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="flex items-center mb-6">
            <Building2 className="text-primary h-7 w-7 mr-4" />
            <h2 className="text-3xl font-bold text-foreground">Operator Playbook</h2>
          </div>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <span className="text-foreground font-semibold">Focus on durable demand:</span> Class B apartments, townhomes,
              and well‑located single‑family rentals near major corridors and universities.
            </li>
            <li>
              <span className="text-foreground font-semibold">Underwrite with today’s rates:</span> Buy for cash‑flow day one; treat
              refinancing as upside, not the plan.
            </li>
            <li>
              <span className="text-foreground font-semibold">Stress‑test vacancy and capex:</span> Budget for turns, HVAC/roof reserves,
              and modest rent growth to keep assumptions honest.
            </li>
            <li>
              <span className="text-foreground font-semibold">Elevate with tech‑enabled management:</span> Online leasing, maintenance,
              and owner dashboards improve NOI and tenant satisfaction.
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/search" className="bg-primary hover:bg-primary text-foreground px-6 py-3 rounded-lg font-semibold">
              See Available Homes
            </Link>
            <Link href="/contact" className="bg-card/10 hover:bg-card/20 text-foreground px-6 py-3 rounded-lg font-semibold border border-white/20">
              Talk to Our Team
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[var(--color-gradient-to)] to-gray-900 rounded-xl p-8 border border-primary">
          <p className="text-muted-foreground text-lg mb-4">Ready to capitalize on Utah’s momentum?</p>
          <div className="text-2xl font-bold text-foreground mb-2">Invest with Confidence</div>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            We combine local expertise with a modern, technology‑driven platform to help owners achieve better returns with
            less friction.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/calculators/buying-power" className="bg-background hover:bg-card text-foreground px-6 py-3 rounded-lg font-semibold">
              Check Your Buying Power
            </Link>
            <Link href="/founders-letter" className="bg-card hover:bg-muted text-primary px-6 py-3 rounded-lg font-semibold">
              Learn About Ondo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Reason({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-muted rounded-lg p-5 border border-border">
      <div className="flex items-center gap-3 mb-2 text-foreground">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
    </div>
  )
}

function MarketCard({ title, note }: { title: string; note: string }) {
  return (
    <div className="bg-muted rounded-lg p-5 border border-border">
      <h4 className="text-foreground font-semibold mb-1">{title}</h4>
      <p className="text-muted-foreground text-sm">{note}</p>
    </div>
  )
}


