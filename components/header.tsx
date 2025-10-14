"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">OnDo <span className="text-primary">Real Estate</span></span>
          </Link>
          <nav className="hidden md:flex gap-1">
            <Link 
              href="/buy" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/buy") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Buy
            </Link>
            <Link 
              href="/sell" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/sell") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Sell
            </Link>
            <Link 
              href="/properties" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/properties") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Properties
            </Link>
            <Link 
              href="/property-management" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/property-management") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Property Management
            </Link>
            <Link 
              href="/loans" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/loans") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Loans
            </Link>
            <Link 
              href="/notary" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/notary") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
              aria-current={isActive("/notary") ? "page" : undefined}
            >
              Notary
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/calculators") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}>
                  Calculators
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>All Calculators</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/calculators" className="focus:outline-none">
                  <DropdownMenuItem>Overview</DropdownMenuItem>
                </Link>
                <Link href="/calculators/mortgage-payment" className="focus:outline-none">
                  <DropdownMenuItem>Mortgage Payment</DropdownMenuItem>
                </Link>
                <Link href="/calculators/affordability" className="focus:outline-none">
                  <DropdownMenuItem>Affordability</DropdownMenuItem>
                </Link>
                <Link href="/calculators/income" className="focus:outline-none">
                  <DropdownMenuItem>Income</DropdownMenuItem>
                </Link>
                <Link href="/calculators/closing-cost" className="focus:outline-none">
                  <DropdownMenuItem>Closing Cost</DropdownMenuItem>
                </Link>
                <Link href="/calculators/refinance" className="focus:outline-none">
                  <DropdownMenuItem>Refinance</DropdownMenuItem>
                </Link>
                <Link href="/calculators/home-sale" className="focus:outline-none">
                  <DropdownMenuItem>Home Sale</DropdownMenuItem>
                </Link>
                <Link href="/calculators/buying-power" className="focus:outline-none">
                  <DropdownMenuItem>Buying Power</DropdownMenuItem>
                </Link>
                <Link href="/calculators/temporary-buydown" className="focus:outline-none">
                  <DropdownMenuItem>Temporary Buydown</DropdownMenuItem>
                </Link>
                <Link href="/calculators/rent-vs-own" className="focus:outline-none">
                  <DropdownMenuItem>Rent vs Own</DropdownMenuItem>
                </Link>
                <Link href="/calculators/retirement" className="focus:outline-none">
                  <DropdownMenuItem>Retirement</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link 
              href="/why-utah" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/why-utah") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Why Utah
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/about") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/contact") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/faq" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive("/faq") 
                  ? "bg-orange-500 text-white" 
                  : "text-foreground hover:!bg-orange-500 hover:!text-white"
              }`}
            >
              FAQ
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
      {isMounted && isMenuOpen && (
        <div ref={menuRef} className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t md:hidden z-50 py-4 pb-6">
          <div className="container">
            <nav className="flex flex-col gap-2">
              <Link
                href="/buy"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/buy") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Buy
              </Link>
              <Link
                href="/sell"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/sell") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link
                href="/properties"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/properties") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/property-management"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/property-management") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Property Management
              </Link>
              <Link
                href="/loans"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/loans") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Loans
              </Link>
              <Link
                href="/notary"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/notary") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive("/notary") ? "page" : undefined}
              >
                Notary
              </Link>
              <Link
                href="/why-utah"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/why-utah") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Why Utah
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/about") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/contact") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/faq") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground hover:!bg-orange-500 hover:!text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div>
                <p className={`text-sm font-medium mb-2 px-3 py-2 rounded-md ${
                  isActive("/calculators") 
                    ? "bg-orange-500 text-white" 
                    : "text-foreground"
                }`}>Calculators</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/calculators" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Overview
                  </Link>
                  <Link 
                    href="/calculators/mortgage-payment" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/mortgage-payment") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Mortgage
                  </Link>
                  <Link 
                    href="/calculators/affordability" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/affordability") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Affordability
                  </Link>
                  <Link 
                    href="/calculators/income" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/income") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Income
                  </Link>
                  <Link 
                    href="/calculators/closing-cost" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/closing-cost") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Closing Cost
                  </Link>
                  <Link 
                    href="/calculators/refinance" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/refinance") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Refinance
                  </Link>
                  <Link 
                    href="/calculators/home-sale" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/home-sale") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Home Sale
                  </Link>
                  <Link 
                    href="/calculators/buying-power" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/buying-power") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Buying Power
                  </Link>
                  <Link 
                    href="/calculators/temporary-buydown" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/temporary-buydown") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Buydown
                  </Link>
                  <Link 
                    href="/calculators/rent-vs-own" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/rent-vs-own") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Rent vs Own
                  </Link>
                  <Link 
                    href="/calculators/retirement" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive("/calculators/retirement") 
                        ? "bg-orange-500 text-white" 
                        : "text-foreground hover:!bg-orange-500 hover:!text-white"
                    }`}
                  >
                    Retirement
                  </Link>
                </div>
              </div>
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
