"use client"
import Link from "next/link"
import { SITE_SOCIALS } from "@/lib/site"
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  Share2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Home,
  Building,
  Users,
  HelpCircle,
  FileText,
  Shield,
  Award,
  TrendingUp
} from "lucide-react"

function EqualHousingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="20"
      height="20"
      aria-hidden="true"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      {/* House */}
      <path d="M16 32 L32 20 L48 32" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="32" width="24" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Equal sign */}
      <rect x="24" y="36" width="16" height="2.5" fill="currentColor" opacity="0.85" />
      <rect x="24" y="41" width="16" height="2.5" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M10.7 2.1c-.7-.3-1.4.2-1.5.9l-.7 6.2c-.1.8.7 1.4 1.4 1.1l3.7-1.6c.7-.3.9-1.2.3-1.7l-3.2-4.9c-.1-.1-.2-.1-.3-.2zM21.5 10.3l-5.9-.9c-.8-.1-1.4.7-1.1 1.4l1.7 3.7c.3.7 1.2.9 1.7.3l4.7-3.3c.6-.4.4-1.3-.1-1.6zM7 11.9l-4.9 3.2c-.6.4-.6 1.3 0 1.7l5.1 3.6c.6.4 1.4 0 1.4-.7l-.2-6.1c0-.8-.9-1.2-1.4-.7zM12.8 14.6l-3.7 1.6c-.7.3-.9 1.2-.3 1.7l3.3 2.3c.6.4 1.4.1 1.6-.6l.6-3.9c.1-.8-.7-1.4-1.5-1.1z"/>
    </svg>
  )
}

function GoogleBusinessIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3h-3l-.8-2h-2.4l-.8 2h-2.4l-.8-2H7.2L6.4 10H4V7zm0 5h16v5a2 2 0 0 1-2 2h-5v-3h3.2a3.6 3.6 0 1 0 0-3.2H13v-1.8H4V12zM8 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    </svg>
  )
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M14.5 3c.5 1.7 1.8 3.2 3.5 3.9.6.3 1.2.4 1.8.5V9c-1.6-.1-3.1-.7-4.3-1.6v6.1c0 3-2.4 5.5-5.5 5.5S4.5 16.5 4.5 13.5 6.9 8 10 8c.5 0 1 .1 1.5.2v2.5c-.5-.2-1-.3-1.5-.3-1.8 0-3.2 1.5-3.2 3.2s1.5 3.2 3.2 3.2 3.2-1.5 3.2-3.2V3h1.3z"/>
    </svg>
  )
}

export function Footer() {
  const socials = SITE_SOCIALS
    .map((href) => {
      const lower = href.toLowerCase()
      if (lower.includes("facebook.com")) {
        return { name: "Facebook", Component: Facebook, href, hover: "hover:text-blue-600" }
      }
      if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
        return { name: "YouTube", Component: Youtube, href, hover: "hover:text-red-600" }
      }
      if (lower.includes("instagram.com")) {
        return { name: "Instagram", Component: Instagram, href, hover: "hover:text-pink-500" }
      }
      if (lower.includes("tiktok.com")) {
        return { name: "TikTok", Component: TiktokIcon, href, hover: "hover:text-fuchsia-500" }
      }
      if (lower.includes("linkedin.com")) {
        return { name: "LinkedIn", Component: Linkedin, href, hover: "hover:text-blue-700" }
      }
      if (lower.includes("x.com") || lower.includes("twitter.com")) {
        return { name: "Twitter", Component: Twitter, href, hover: "hover:text-sky-500" }
      }
      if (lower.includes("yelp.com")) {
        return { name: "Yelp", Component: YelpIcon, href, hover: "hover:text-red-500" }
      }
      if (lower.includes("google.com/maps") || lower.includes("google.com/business") || lower.includes("g.page")) {
        return { name: "Google Business", Component: GoogleBusinessIcon, href, hover: "hover:text-green-500" }
      }
      return null
    })
    .filter(Boolean) as Array<{ name: string; Component: any; href: string; hover: string }>

  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Buying a Home */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Buying a Home
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/buying/first-time" className="text-gray-300 hover:text-white">First-time homebuyer</Link></li>
              <li><Link href="/buying/second-home" className="text-gray-300 hover:text-white">Buying a second home</Link></li>
              <li><Link href="/buying/fixed-rate" className="text-gray-300 hover:text-white">Fixed-rate mortgage</Link></li>
              <li><Link href="/buying/adjustable-rate" className="text-gray-300 hover:text-white">Adjustable-rate mortgage</Link></li>
              <li><Link href="/buying/30-year" className="text-gray-300 hover:text-white">30 year mortgage</Link></li>
              <li><Link href="/buying/15-year" className="text-gray-300 hover:text-white">15 year mortgage</Link></li>
              <li><Link href="/buying/rates" className="text-gray-300 hover:text-white">Mortgage rates explained</Link></li>
            </ul>
          </div>

          {/* Refinance */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Refinance
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/refinance/process" className="text-gray-300 hover:text-white">Mortgage refinance process</Link></li>
              <li><Link href="/refinance/rate-term" className="text-gray-300 hover:text-white">Rate-and-term refinance</Link></li>
              <li><Link href="/refinance/cash-out" className="text-gray-300 hover:text-white">Cash-out refinance</Link></li>
              <li><Link href="/refinance/blog" className="text-gray-300 hover:text-white">Mortgage blog – Refinance</Link></li>
            </ul>
          </div>

          {/* Mortgage Loans */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="h-5 w-5" />
              Mortgage Loans
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/loans/conventional" className="text-gray-300 hover:text-white">Conventional</Link></li>
              <li><Link href="/loans/fha" className="text-gray-300 hover:text-white">FHA</Link></li>
              <li><Link href="/loans/usda" className="text-gray-300 hover:text-white">USDA</Link></li>
              <li><Link href="/loans/va" className="text-gray-300 hover:text-white">VA</Link></li>
              <li><Link href="/loans/heloc" className="text-gray-300 hover:text-white">HELOC / HELOAN</Link></li>
              <li><Link href="/loans/reverse" className="text-gray-300 hover:text-white">Reverse Mortgage</Link></li>
              <li><Link href="/loans/jumbo" className="text-gray-300 hover:text-white">Jumbo Loans</Link></li>
            </ul>
          </div>

          {/* Mortgage Calculators */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculators
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/mortgage-payment" className="text-gray-300 hover:text-white">Mortgage payment calculator</Link></li>
              <li><Link href="/calculators/affordability" className="text-gray-300 hover:text-white">Affordability calculator</Link></li>
              <li><Link href="/calculators/income" className="text-gray-300 hover:text-white">Income calculator</Link></li>
              <li><Link href="/calculators/closing-cost" className="text-gray-300 hover:text-white">Closing cost calculator</Link></li>
              <li><Link href="/calculators/refinance" className="text-gray-300 hover:text-white">Refinance calculator</Link></li>
              <li><Link href="/calculators/home-sale" className="text-gray-300 hover:text-white">Home sale calculator</Link></li>
              <li><Link href="/calculators/buying-power" className="text-gray-300 hover:text-white">Buying power calculator</Link></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              About Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/history" className="text-gray-300 hover:text-white">History</Link></li>
              <li><Link href="/about/leadership" className="text-gray-300 hover:text-white">Leadership</Link></li>
              <li><Link href="/about/giving-back" className="text-gray-300 hover:text-white">Giving back</Link></li>
              <li><Link href="/about/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link href="/about/news" className="text-gray-300 hover:text-white">News</Link></li>
              <li><Link href="/about/investor-relations" className="text-gray-300 hover:text-white">Investor relations</Link></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help Center
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help/payments" className="text-gray-300 hover:text-white">Payment questions</Link></li>
              <li><Link href="/help/hardship" className="text-gray-300 hover:text-white">Hardship assistance</Link></li>
              <li><Link href="/help/loan-payoffs" className="text-gray-300 hover:text-white">Loan payoffs</Link></li>
              <li><Link href="/help/faq" className="text-gray-300 hover:text-white">Mortgage FAQs</Link></li>
              <li><Link href="/help/escrow" className="text-gray-300 hover:text-white">Escrow</Link></li>
              <li><Link href="/help/disaster" className="text-gray-300 hover:text-white">Natural Disaster Resources</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Loan Servicing Help Center</p>
                <a
                  href="tel:18003654441"
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  aria-label="Call 1-800-365-4441"
                >
                  1-800-365-4441
                </a>
                <p className="text-xs text-gray-400">Mon-Fri 5:00 am – 5:00 pm PT</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <a
                  href="mailto:ondorealestate@gmail.com"
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  aria-label="Email ondorealestate@gmail.com"
                >
                  ondorealestate@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Our Location</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123%20Main%20Street%2C%20Suite%20100%2C%20Lehi%2C%20UT%2084043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  aria-label="Open address in Google Maps"
                >
                  <span className="block">123 Main Street</span>
                  <span className="block">Lehi, UT 84043</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Legal */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              {socials.map(({ name, Component, href, hover }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${hover}`}
                >
                  <Component className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>

            {/* Legal Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <EqualHousingIcon className="text-gray-400" />
                <span>Equal Housing Opportunity</span>
              </div>
              <span className="h-4 w-px bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm border border-gray-500 flex items-center justify-center text-[8px] font-semibold">R</div>
                <span>REALTOR</span>
              </div>
              <span className="h-4 w-px bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="rounded border border-gray-500 px-1 py-0.5 text-[8px] font-semibold tracking-wide">MLS</div>
                <span>Multiple Listing Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} OnDo Real Estate. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/licensing" className="hover:text-white">Licensing</Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Use</Link>
              <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
              <Link href="/sitemap" className="hover:text-white">Site Map</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
