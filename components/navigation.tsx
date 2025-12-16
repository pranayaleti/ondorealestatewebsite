"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, memo } from "react"

export interface NavigationItem {
  href: string
  label: string
  special?: boolean
}

// Central list of all nav items so we can re-use them
// in both the main navbar and the desktop "hamburger" / "More" menu.
// Primary items are pinned in the header; everything else will
// automatically roll into the "More" section for easier visibility.
export const allNavigationItems: NavigationItem[] = [
  // Core journeys (pinned in primary nav)
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/properties", label: "Properties" },
  { href: "/property-management", label: "Property Management" },
  { href: "/loans", label: "Loans" },
  { href: "/notary", label: "Notary" },

  // Discovery & tools
  { href: "/calculators", label: "Calculators" },
  { href: "/resources", label: "Resources" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },

  // Utah positioning
  { href: "/why-utah", label: "Why Utah" },
  { href: "/founders-letter", label: "Founder's Letter" },

  // Company & about
  { href: "/about", label: "About" },

  // Help & education
  { href: "/faq", label: "FAQ" },

  // Loan / refinance journeys
  { href: "/refinance/process", label: "Refinance Process" },

  // Marketing / campaigns
  { href: "/sweepstakes", label: "🎁 Win Prizes", special: true },
]

// These are the items that stay visible in the main
// desktop navbar. The rest will live in the hamburger menu.
export const primaryNavigationItems: NavigationItem[] = allNavigationItems.filter(item =>
  ["/buy", "/sell", "/properties", "/property-management", "/loans", "/notary"].includes(item.href)
)

// Everything that is not part of the primary desktop nav.
export const overflowNavigationItems: NavigationItem[] = allNavigationItems.filter(
  item => !primaryNavigationItems.some(primary => primary.href === item.href)
)

interface NavigationProps {
  className?: string
  onLinkClick?: () => void
  items?: NavigationItem[]
}

export const Navigation = memo(function Navigation({
  className,
  onLinkClick,
  items = allNavigationItems,
}: NavigationProps) {
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
      {items.map((item) => (
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