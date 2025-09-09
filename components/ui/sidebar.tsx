"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PanelLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarContextProps {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  toggleExpanded: () => void
}

const SidebarContext = React.createContext<SidebarContextProps>({
  expanded: true,
  setExpanded: () => {},
  toggleExpanded: () => {},
})

export function SidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const toggleExpanded = () => setExpanded((prev) => !prev)

  return <SidebarContext.Provider value={{ expanded, setExpanded, toggleExpanded }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function Sidebar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { expanded } = useSidebar()

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 z-30 flex flex-col transition-all duration-300 ease-in-out bg-slate-50 dark:bg-slate-900",
        expanded ? "w-64" : "w-16",
        className,
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("flex h-16 items-center border-b px-4", className)}>{children}</div>
}

export function SidebarContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("flex-1 overflow-auto py-4", className)}>{children}</div>
}

export function SidebarFooter({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("flex items-center border-t p-4", className)}>{children}</div>
}

export function SidebarMenu({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <nav className={cn("grid gap-2 px-2", className)}>{children}</nav>
}

export function SidebarMenuItem({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("relative", className)}>{children}</div>
}

export function SidebarTrigger() {
  const { toggleExpanded, expanded } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleExpanded}
      className="absolute top-4 -right-4 h-8 w-8 rounded-full border shadow-md bg-background z-10"
    >
      {expanded ? <PanelLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Button>
  )
}

export function SidebarMenuButton({
  className,
  children,
  isActive,
  tooltip,
  asChild,
  ...props
}: {
  className?: string
  children: React.ReactNode
  isActive?: boolean
  tooltip?: string
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { expanded } = useSidebar()

  if (asChild) {
    return (
      <div className="relative group w-full">
        {React.cloneElement(children as React.ReactElement, {
          className: cn(
            "flex w-full items-center rounded-md px-3 py-3 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary font-semibold"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
            expanded ? "justify-start" : "justify-center",
            className,
          ),
        })}
        {tooltip && !expanded && (
          <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 shadow group-hover:opacity-100 z-50">
            {tooltip}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      {...props}
      className={cn(
        "group relative flex w-full items-center rounded-md px-3 py-3 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
        expanded ? "justify-start" : "justify-center",
        className,
      )}
    >
      {children}
      {tooltip && !expanded && (
        <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 shadow group-hover:opacity-100 z-50">
          {tooltip}
        </div>
      )}
    </button>
  )
}
