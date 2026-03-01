"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { normalizeRole, type AppRole } from "@/lib/auth/roles"

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: AppRole[]
  redirectTo?: string
}

function assertNever(value: never): never {
  throw new Error(`Unhandled role: ${String(value)}`)
}

function getDefaultRedirectPath(role: AppRole): string {
  switch (role) {
    case "admin":
      return "/dashboard"
    case "owner":
      return "/owner"
    case "tenant":
      return "/tenant"
    case "public":
      return "/"
  }
  return assertNever(role)
}

export function RoleGuard({ children, allowedRoles, redirectTo }: RoleGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const role = normalizeRole(user?.role)
  const isAllowed = allowedRoles.includes(role)

  useEffect(() => {
    if (isLoading) return
    if (!user && !allowedRoles.includes("public")) {
      router.replace("/login")
      return
    }
    if (!isAllowed) {
      router.replace(redirectTo ?? getDefaultRedirectPath(role))
    }
  }, [allowedRoles, isAllowed, isLoading, redirectTo, role, router, user])

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!user && !allowedRoles.includes("public")) {
    return null
  }

  if (!isAllowed) {
    return null
  }

  return <>{children}</>
}
