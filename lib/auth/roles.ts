export const ROLE_VALUES = ["public", "tenant", "owner", "admin"] as const

export type AppRole = (typeof ROLE_VALUES)[number]

export function isAppRole(role: unknown): role is AppRole {
  return typeof role === "string" && ROLE_VALUES.includes(role as AppRole)
}

export function normalizeRole(role: unknown): AppRole {
  if (isAppRole(role)) {
    return role
  }
  return "public"
}
