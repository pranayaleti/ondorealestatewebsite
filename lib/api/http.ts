import { backendUrl } from "@/lib/backend"

const API_CACHE_PREFIX = "ondo:api-cache:"

interface RequestOptions {
  fallbackCacheKey?: string
  init?: RequestInit
}

function readFromLocalCache<T>(cacheKey: string): T | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(`${API_CACHE_PREFIX}${cacheKey}`)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeToLocalCache<T>(cacheKey: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(`${API_CACHE_PREFIX}${cacheKey}`, JSON.stringify(value))
}

export async function networkFirstGet<T>(path: string, cacheKey: string): Promise<T> {
  try {
    const response = await fetch(backendUrl(path), { method: "GET", cache: "no-store" })
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    const data = (await response.json()) as T
    writeToLocalCache(cacheKey, data)
    return data
  } catch (error) {
    const fallback = readFromLocalCache<T>(cacheKey)
    if (fallback) return fallback
    throw error
  }
}

export async function postJson<TResponse = unknown, TBody = unknown>(
  path: string,
  body: TBody,
  options?: RequestOptions
): Promise<TResponse> {
  try {
    const response = await fetch(backendUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options?.init,
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }

    const contentType = response.headers.get("content-type") ?? ""
    if (contentType.includes("application/json")) {
      return (await response.json()) as TResponse
    }

    return {} as TResponse
  } catch (error) {
    if (!options?.fallbackCacheKey) {
      throw error
    }
    const fallback = readFromLocalCache<TResponse>(options.fallbackCacheKey)
    if (fallback) return fallback
    throw error
  }
}
