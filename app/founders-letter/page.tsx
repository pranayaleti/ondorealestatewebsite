"use client"

import React from "react"
import Image from "next/image"
import { User, Building2, Lightbulb, TrendingUp, Handshake, Rocket } from "lucide-react"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export default function FoundersLetterPage() {
  const currentYear = new Date().getFullYear();
  const yearsInTech = currentYear - 2013;
  const yearsInUtah = currentYear - 2019;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Founder's Letter | Ondo Real Estate"
        description="A personal letter from the founder of Ondo Real Estate on our mission, values, and the future of property management."
        pathname="/founders-letter"
        image={`${SITE_URL}/founder-image.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Founder's Letter", url: `${SITE_URL}/founders-letter` },
        ])}
      />
      <div className="relative bg-gradient-to-br from-[var(--gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]">
        <div className="absolute inset-0 bg-background opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6">
            A Letter From the <span className="text-primary">Founder</span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl">
            From software engineering to real estate innovation - discover the story behind
            Ondo Real Estate and our mission to revolutionize property management.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-primary bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">{yearsInTech}+</div>
              <div className="text-foreground mt-2">Years in Tech</div>
              <div className="text-muted-foreground text-sm">Full Stack Development</div>
            </div>
            <div className="bg-primary bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">{yearsInUtah}+</div>
              <div className="text-foreground mt-2">Years in Utah</div>
              <div className="text-muted-foreground text-sm">Local Market Expert</div>
            </div>
            <div className="bg-primary bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-foreground mt-2">Client Focused</div>
              <div className="text-muted-foreground text-sm">Personal Touch</div>
            </div>
            <div className="bg-primary bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-primary">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-foreground mt-2">Tech Platform</div>
              <div className="text-muted-foreground text-sm">Always Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <User className="text-primary h-7 w-7 mr-4" />
                <h2 className="text-3xl font-bold text-foreground">Meet the Founder</h2>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <div className="relative h-32 w-32 rounded-full border-4 border-primary overflow-hidden flex-shrink-0">
                  <Image 
                    src="/founder-image.png" 
                    alt="Founder Pranay Reddy Aleti" 
                    fill 
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Hi, I'm <strong className="text-primary">Pranay Reddy Aleti</strong>.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                When I first came to the U.S. to pursue my <strong className="text-primary">Master's degree in computer science</strong>, I
                thought my life would stay rooted in software engineering. I've spent over a decade building applications, solving
                problems, and writing code that powers businesses. But somewhere along the way, I realized something important: while I
                love technology, what truly excites me is <strong className="text-primary">real estate</strong> - because real estate is about
                people, growth, and legacy.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <TrendingUp className="text-primary h-7 w-7 mr-4" />
                <h2 className="text-3xl font-bold text-foreground">The Journey</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                As an immigrant, homeowner, and now a <strong className="text-primary">real estate professional in Utah</strong>, I know
                firsthand how much real estate impacts people's lives. It's not just about transactions; it's about finding stability,
                building wealth, and creating opportunities. That belief is what led me to start <strong className="text-primary">Ondo Real
                Estate</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                My background in <strong className="text-primary">technology and full stack development</strong> has given me unique insights
                into how to solve the complex challenges that property owners and tenants face every day.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <Lightbulb className="text-primary h-7 w-7 mr-4" />
                <h2 className="text-3xl font-bold text-foreground">Why Ondo?</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                "Ondo" means <em className="text-primary">foundation and rhythm.</em> To me, real estate is exactly that - the foundation for
                families and the rhythm that keeps communities thriving. I created Ondo because I saw a gap: property management was stuck in
                the past, weighed down by inefficiency, poor communication, and outdated systems.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Owners were frustrated. Tenants were frustrated. And with my background in <strong className="text-primary">technology</strong>,
                I knew there was a better way.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <Rocket className="text-primary h-7 w-7 mr-4" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Ondo isn't just another property management company - it's a <strong className="text-primary">modern platform built on trust,
                transparency, and technology.</strong> My goal is simple: make property ownership stress-free, and make renting a home feel fair
                and effortless.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I want owners to feel confident that their investments are taken care of, and tenants to feel like they're more than just a
                number in a system. We're building the future of property management, one relationship at a time.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <Handshake className="text-primary h-7 w-7 mr-4" />
                <h2 className="text-3xl font-bold text-foreground">A Personal Note</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                I'm not building Ondo from a distance - I live this. I own and manage rental property myself, so I understand the real challenges on
                both sides. I've also taken risks, whether in <strong className="text-primary">real estate, technology, or investing in the
                future of cryptocurrency.</strong>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Risk has taught me resilience, and resilience is what drives me to build something bigger than just another business. At the end
                of the day, Ondo is about <strong className="text-primary">creating long-term value</strong> - for owners, for tenants, and for the
                communities we serve.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <Building2 className="text-primary h-7 w-7 mr-4" />
                <h2 className="text-3xl font-bold text-foreground">Looking Ahead</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                I believe the future of real estate lies in combining <strong className="text-primary">human connection</strong> with
                <strong className="text-primary"> technology.</strong> That's what Ondo stands for. And if you're reading this, I'd love for you
                to be part of that journey - whether you're an owner looking for smarter management, a tenant searching for a great home, or a
                partner who believes in innovation.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Thank you for being here. The future is bright, and this is just the beginning.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[var(--color-gradient-to)] to-gray-900 rounded-xl p-8 border border-primary">
              <p className="text-muted-foreground text-lg mb-4">Sincerely,</p>
              <div className="text-2xl font-bold text-foreground mb-2">Pranay Reddy Aleti</div>
              <div className="text-primary font-semibold">Founder, Ondo Real Estate</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold text-primary mb-4">Core Values</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  <span className="text-muted-foreground">Innovation First</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  <span className="text-muted-foreground">Client Success</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  <span className="text-muted-foreground">Transparency</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  <span className="text-muted-foreground">Community Focus</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold text-primary mb-4">Expertise</h3>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-foreground font-semibold">Full Stack Development</div>
                  <div className="text-muted-foreground text-sm">React, Node.js, Modern Web Apps</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-foreground font-semibold">Real Estate Investment</div>
                  <div className="text-muted-foreground text-sm">Utah Market Specialist</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-foreground font-semibold">Property Management</div>
                  <div className="text-muted-foreground text-sm">Owner & Tenant Relations</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-foreground font-semibold">Technology Integration</div>
                  <div className="text-muted-foreground text-sm">AI & Automation Solutions</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--color-gradient-to)] to-gray-900 rounded-xl p-6 border border-primary">
              <h3 className="text-xl font-bold text-foreground mb-4">Let's Connect</h3>
              <p className="text-muted-foreground text-sm mb-4">Ready to experience the future of property management?</p>
              <button className="w-full bg-primary hover:bg-primary text-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Experience Ondo?</h2>
          <p className="text-xl text-foreground mb-8 opacity-90">
            Join the revolution in property management. Whether you're an owner looking for smarter solutions or a tenant seeking a better
            experience, Ondo is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-background hover:bg-card text-foreground px-8 py-4 rounded-lg text-lg font-bold transition-colors">
              Start Your Journey
            </button>
            <button className="bg-foreground hover:bg-muted text-primary px-8 py-4 rounded-lg text-lg font-bold transition-colors">
              Learn More About Ondo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
