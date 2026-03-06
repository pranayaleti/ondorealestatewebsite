import { backendUrl } from "@/lib/backend"
import type { InvestmentOpportunity } from "@/lib/investments-data"

/** Response shape from the backend (snake_case converted to camelCase). */
export type ApiOpportunity = InvestmentOpportunity & { id?: string }

/**
 * Fetch all investment opportunities from the backend (client-side).
 * Use from browser for WebMCP tools or client components. Returns empty array on failure.
 */
export async function fetchOpportunitiesClient(): Promise<ApiOpportunity[]> {
  const url = backendUrl("/api/investments/opportunities")
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data) ? (data as ApiOpportunity[]) : []
}

/**
 * Fetch a single investment opportunity by slug (client-side).
 * Use from browser for WebMCP tools or client components. Returns null on 404 or failure.
 */
export async function fetchOpportunityBySlugClient(slug: string): Promise<ApiOpportunity | null> {
  if (!slug || typeof slug !== "string") return null
  const url = backendUrl(`/api/investments/opportunities/${encodeURIComponent(slug.trim())}`)
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (res.status === 404 || !res.ok) return null
  const data = await res.json().catch(() => null)
  return data as ApiOpportunity
}

/**
 * Fetch all investment opportunities from the backend.
 * Use in server components or at build time. On failure (network/5xx), throws.
 */
export async function getOpportunities(): Promise<ApiOpportunity[]> {
  const url = backendUrl("/api/investments/opportunities")
  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers: { Accept: "application/json" },
  })
  if (!res.ok) {
    throw new Error(`Investments API error: ${res.status}`)
  }
  const data = await res.json()
  if (!Array.isArray(data)) {
    throw new Error("Investments API returned non-array")
  }
  return data as ApiOpportunity[]
}

/**
 * Fetch a single opportunity by slug from the backend.
 * Use in server components or at build time. On 404 or failure, throws.
 */
export async function getOpportunityBySlug(slug: string): Promise<ApiOpportunity> {
  const url = backendUrl(`/api/investments/opportunities/${encodeURIComponent(slug)}`)
  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers: { Accept: "application/json" },
  })
  if (res.status === 404) {
    throw new Error("Opportunity not found")
  }
  if (!res.ok) {
    throw new Error(`Investments API error: ${res.status}`)
  }
  const data = await res.json()
  return data as ApiOpportunity
}
