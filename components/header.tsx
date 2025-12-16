"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import UserMenu from "@/components/user-menu"
import { Navigation, overflowNavigationItems, primaryNavigationItems } from "@/components/navigation"
import { useAuth } from "@/lib/auth-context"
import { SearchDialog } from "@/components/search-dialog"

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false)
    setIsDesktopMenuOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const toggleDesktopMenu = useCallback(() => {
    setIsDesktopMenuOpen(prev => !prev)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
      const target = event.target as Node

      if (menuRef.current && menuRef.current.contains(target)) return
      if (desktopMenuRef.current && desktopMenuRef.current.contains(target)) return

      setIsMenuOpen(false)
      setIsDesktopMenuOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsDesktopMenuOpen(false)
      }
    }

    if (isMenuOpen || isDesktopMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen, isDesktopMenuOpen])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 bg-background ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : ""}`}>
      <div className="container relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo (left) */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Ondo Real Estate"
              width={200}
              height={60}
              className="h-10 w-auto md:h-12"
              priority
              quality={90}
              sizes="(max-width: 768px) 160px, 200px"
            />
          </Link>
        </div>

        {/* Centered desktop navigation */}
        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
          <Navigation
            className="pointer-events-auto hidden md:flex gap-0.5 overflow-x-auto scrollbar-hide max-w-full"
            items={primaryNavigationItems}
          />
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          {/* Desktop hamburger / overflow menu */}
          <div
            ref={desktopMenuRef}
            className="hidden md:flex items-center"
          >
            <button
              type="button"
              onClick={toggleDesktopMenu}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-haspopup="menu"
              aria-expanded={isDesktopMenuOpen}
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">More</span>
            </button>

            {isDesktopMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 rounded-md border bg-popover/95 backdrop-blur-md shadow-lg py-2 text-sm z-50"
                role="menu"
                aria-label="More navigation"
              >
                <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Explore
                </div>
                <div className="flex flex-col">
                  {overflowNavigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-3 py-2 hover:bg-accent rounded-md transition-colors"
                      onClick={handleMenuClose}
                    >
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ModeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Sign up</Link>
              </Button>
            </div>
          )}
          {/* Mobile hamburger for full navigation */}
          <button
            className="block md:hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring flex-shrink-0"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isMenuOpen && isMounted && (
        <div ref={menuRef} id="mobile-menu" className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t md:hidden z-50 py-4 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto" role="navigation" aria-label="Mobile navigation">
          <div className="container">
            <Button
              variant="outline"
              className="w-full mb-4 justify-start"
              onClick={() => {
                setIsSearchOpen(true)
                handleMenuClose()
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Navigation
              className="flex flex-col gap-2"
              onLinkClick={handleMenuClose}
            />
            {!user && (
              <div className="flex gap-2 mt-4">
                <Link href="/auth" onClick={handleMenuClose}>
                  <Button variant="outline" size="sm" className="flex-1">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth" onClick={handleMenuClose}>
                  <Button size="sm" className="flex-1">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
})

Header.displayName = 'Header'

export default Header
