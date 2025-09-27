"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
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
          <nav className="hidden md:flex gap-6">
            <Link href="/properties" className="text-sm font-medium hover:underline underline-offset-4">
              Properties
            </Link>
            <Link href="/property-management" className="text-sm font-medium hover:underline underline-offset-4">
              Property Management
            </Link>
            <Link href="/buy" className="text-sm font-medium hover:underline underline-offset-4">
              Buy
            </Link>
            <Link href="/sell" className="text-sm font-medium hover:underline underline-offset-4">
              Sell
            </Link>
            <Link href="/loans" className="text-sm font-medium hover:underline underline-offset-4">
              Loans
            </Link>
            <Link href="/why-utah" className="text-sm font-medium hover:underline underline-offset-4">
              Why Utah
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:underline underline-offset-4">
              FAQ
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm font-medium hover:underline underline-offset-4">
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
              console.log('Hamburger clicked, current state:', isMenuOpen)
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
            <nav className="flex flex-col gap-4">
              <Link
                href="/properties"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/property-management"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Property Management
              </Link>
              <Link
                href="/buy"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy
              </Link>
              <Link
                href="/sell"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link
                href="/loans"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Loans
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/why-utah"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Utah
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div>
                <p className="text-sm font-medium mb-2">Calculators</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/calculators" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Overview</Link>
                  <Link href="/calculators/mortgage-payment" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Mortgage</Link>
                  <Link href="/calculators/affordability" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Affordability</Link>
                  <Link href="/calculators/income" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Income</Link>
                  <Link href="/calculators/closing-cost" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Closing Cost</Link>
                  <Link href="/calculators/refinance" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Refinance</Link>
                  <Link href="/calculators/home-sale" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Home Sale</Link>
                  <Link href="/calculators/buying-power" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Buying Power</Link>
                  <Link href="/calculators/temporary-buydown" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Buydown</Link>
                  <Link href="/calculators/rent-vs-own" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Rent vs Own</Link>
                  <Link href="/calculators/retirement" onClick={() => setIsMenuOpen(false)} className="text-sm hover:underline underline-offset-4">Retirement</Link>
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
