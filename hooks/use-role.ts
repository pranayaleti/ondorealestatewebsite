"use client"

import { useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"
import { normalizeRole, type AppRole } from "@/lib/auth/roles"

interface UseRoleResult {
  role: AppRole
  isAdmin: boolean
  isOwner: boolean
  isTenant: boolean
  isPublic: boolean
  hasRole: (allowedRoles: AppRole[]) => boolean
}

export function useRole(): UseRoleResult {
  const { user } = useAuth()

  return useMemo(() => {
    const role = normalizeRole(user?.role)

    return {
      role,
      isAdmin: role === "admin",
      isOwner: role === "owner",
      isTenant: role === "tenant",
      isPublic: role === "public",
      hasRole: (allowedRoles) => allowedRoles.includes(role),
    }
  }, [user?.role])
}
