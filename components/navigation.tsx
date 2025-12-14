"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, memo } from "react"

interface NavigationItem {
  href: string
  label: string
  special?: boolean
}

const navigationItems: NavigationItem[] = [
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/properties", label: "Properties" },
  { href: "/property-management", label: "Property Mgmt" },
  { href: "/loans", label: "Loans" },
  { href: "/notary", label: "Notary" },
  { href: "/calculators", label: "Calculators" },
  { href: "/why-utah", label: "Why Utah" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/sweepstakes", label: "🎁 Win Prizes", special: true },
]

interface NavigationProps {
  className?: string
  onLinkClick?: () => void
}

export const Navigation = memo(function Navigation({ className, onLinkClick }: NavigationProps) {
  const pathname = usePathname()

  const isActive = useCallback((href: string) => {
    if (!pathname) return false
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }, [pathname])

  return (
    <nav className={className}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-xs md:text-sm font-medium px-2 md:px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
            item.special
              ? "bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-primary-foreground font-bold"
              : isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={onLinkClick}
          aria-current={isActive(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
})

Navigation.displayName = 'Navigation'