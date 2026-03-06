import { backendUrl } from "@/lib/backend"
import type { InvestmentOpportunity } from "@/lib/investments-data"

/** Response shape from the backend (snake_case converted to camelCase). */
export type ApiOpportunity = InvestmentOpportunity & { id?: string }

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
