"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building,
  FileText,
  Home,
  MessageSquare,
  Settings,
  PenToolIcon as Tool,
  DollarSign,
  Users,
  User,
  HardHat,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function OwnerSidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/owner", label: "Dashboard", icon: Home, exact: true },
    { href: "/owner/properties", label: "Properties", icon: Building },
    { href: "/owner/tenants", label: "Tenants", icon: Users },
    { href: "/owner/maintenance", label: "Maintenance", icon: Tool },
    { href: "/owner/finances", label: "Finances", icon: DollarSign },
    { href: "/owner/vendors", label: "Vendors", icon: HardHat },
    { href: "/owner/documents", label: "Documents", icon: FileText },
    { href: "/owner/messages", label: "Messages", icon: MessageSquare },
    { href: "/owner/profile", label: "Profile", icon: User },
    { href: "/owner/settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => {
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname === item.href || pathname?.startsWith(`${item.href}/`)
        
        return (
          <Link key={item.href} href={item.href}>
            <Button 
              variant={isActive ? "secondary" : "ghost"} 
              className={`w-full justify-start ${isActive ? "bg-muted font-semibold" : ""}`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

export function OwnerMobileNav() {
  const pathname = usePathname()

  const mobileNavItems = [
    { href: "/owner", label: "Home", icon: Home, exact: true },
    { href: "/owner/properties", label: "Properties", icon: Building },
    { href: "/owner/tenants", label: "Tenants", icon: Users },
    { href: "/owner/maintenance", label: "Maintenance", icon: Tool },
    { href: "/owner/finances", label: "Finances", icon: DollarSign },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-10">
      <div className="grid grid-cols-5 gap-1 p-1">
        {mobileNavItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname === item.href || pathname?.startsWith(`${item.href}/`)
          
          return (
            <Link key={item.href} href={item.href}>
              <Button 
                variant={isActive ? "secondary" : "ghost"} 
                size="sm" 
                className={`w-full flex-col py-2 h-auto ${isActive ? "bg-muted font-semibold text-primary" : "text-muted-foreground"}`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-[10px] leading-tight">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
