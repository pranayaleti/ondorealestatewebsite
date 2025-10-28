"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 bg-background ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : ""}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="block">OnDo</span>
              <span className="block text-primary">Real Estate</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-1">
            <Link 
              href="/buy" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/buy") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Buy
            </Link>
            <Link 
              href="/sell" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/sell") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Sell
            </Link>
            <Link 
              href="/properties" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/properties") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Properties
            </Link>
            <Link 
              href="/property-management" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/property-management") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Property Management
            </Link>
            <Link 
              href="/loans" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/loans") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Loans
            </Link>
            <Link 
              href="/notary" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/notary") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              aria-current={isActive("/notary") ? "page" : undefined}
            >
              Notary
            </Link>
            <Link 
              href="/calculators" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/calculators") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Calculators
            </Link>
            <Link 
              href="/why-utah" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/why-utah") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Why Utah
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/about") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/contact") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/faq" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/faq") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              FAQ
            </Link>
            <Link 
              href="/sweepstakes" 
              className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-primary-foreground font-bold"
            >
              🎁 Win Prizes
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth">Log in</Link>
              </Button>
            </div>
          )}
          <button
            className="block md:hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && isMounted && (
        <div ref={menuRef} className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t md:hidden z-50 py-4 pb-6">
          <div className="container">
            <nav className="flex flex-col gap-2">
              <Link
                href="/buy"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/buy") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Buy
              </Link>
              <Link
                href="/sell"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/sell") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link
                href="/properties"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/properties") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/property-management"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/property-management") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Property Management
              </Link>
              <Link
                href="/loans"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/loans") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Loans
              </Link>
              {/* TODO: Implement notary page - temporarily commented out
              <Link
                href="/notary"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/notary") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive("/notary") ? "page" : undefined}
              >
                Notary
              </Link>
              */}
              <Link
                href="/why-utah"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/why-utah") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Why Utah
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/about") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/contact") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/faq") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/sweepstakes"
                className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-primary-foreground font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                🎁 Win Prizes
              </Link>
              <Link
                href="/calculators"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/calculators") 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Calculators
              </Link>
              {!user && (
                <div className="flex gap-2 mt-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
