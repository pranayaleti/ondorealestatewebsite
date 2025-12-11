// Caching utilities for improved performance
import React from "react"

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum number of items in cache
}

interface CacheItem<T> {
  value: T
  timestamp: number
  ttl: number
}

class MemoryCache<T = unknown> {
  private cache = new Map<string, CacheItem<T>>()
  private maxSize: number
  private defaultTTL: number

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100
    this.defaultTTL = options.ttl || 5 * 60 * 1000 // 5 minutes default
  }

  set(key: string, value: T, ttl?: number): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }

  // Get all keys
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Global cache instances
export const caches = {
  // API response cache
  api: new MemoryCache<unknown>({ ttl: 5 * 60 * 1000, maxSize: 50 }),
  
  // User data cache
  user: new MemoryCache<unknown>({ ttl: 10 * 60 * 1000, maxSize: 20 }),
  
  // Property data cache
  properties: new MemoryCache<unknown>({ ttl: 15 * 60 * 1000, maxSize: 100 }),
  
  // Search results cache
  search: new MemoryCache<unknown>({ ttl: 2 * 60 * 1000, maxSize: 30 }),
  
  // Static content cache
  static: new MemoryCache<unknown>({ ttl: 60 * 60 * 1000, maxSize: 200 }), // 1 hour
}

// Cache key generators
export const cacheKeys = {
  // API cache keys
  api: {
    properties: (filters?: Record<string, unknown>) => `api:properties:${JSON.stringify(filters || {})}`,
    property: (id: string) => `api:property:${id}`,
    search: (query: string, filters?: Record<string, unknown>) => `api:search:${query}:${JSON.stringify(filters || {})}`,
    user: (id: string) => `api:user:${id}`,
  },
  
  // Static content cache keys
  static: {
    cities: () => "static:cities",
    zipCodes: () => "static:zipCodes",
    faqs: () => "static:faqs",
    calculators: () => "static:calculators",
  },
  
  // User session cache keys
  session: {
    user: (id: string) => `session:user:${id}`,
    preferences: (id: string) => `session:preferences:${id}`,
    recentSearches: (id: string) => `session:recentSearches:${id}`,
  },
}

// Cache utilities
export const cacheUtils = {
  // Get or set pattern
  async getOrSet<T>(
    cache: MemoryCache<T>,
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = cache.get(key)
    if (cached !== null) {
      return cached
    }

    const value = await fetcher()
    cache.set(key, value, ttl)
    return value
  },

  // Batch get or set
  async batchGetOrSet<T>(
    cache: MemoryCache<T>,
    keys: string[],
    fetcher: (missingKeys: string[]) => Promise<Record<string, T>>,
    ttl?: number
  ): Promise<Record<string, T>> {
    const result: Record<string, T> = {}
    const missingKeys: string[] = []

    // Get cached values
    for (const key of keys) {
      const cached = cache.get(key)
      if (cached !== null) {
        result[key] = cached
      } else {
        missingKeys.push(key)
      }
    }

    // Fetch missing values
    if (missingKeys.length > 0) {
      const fetched = await fetcher(missingKeys)
      
      // Cache fetched values
      for (const [key, value] of Object.entries(fetched)) {
        cache.set(key, value, ttl)
        result[key] = value
      }
    }

    return result
  },

  // Invalidate cache by pattern
  invalidatePattern: (cache: MemoryCache, pattern: string | RegExp): void => {
    const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern
    const keysToDelete = cache.keys().filter(key => regex.test(key))
    
    for (const key of keysToDelete) {
      cache.delete(key)
    }
  },

  // Warm up cache
  warmUp: async <T>(
    cache: MemoryCache<T>,
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<void> => {
    try {
      const value = await fetcher()
      cache.set(key, value, ttl)
    } catch (error) {
      // Silently fail cache warmup - it's not critical
      if (process.env.NODE_ENV === 'development') {
        // Only log in development
        console.warn(`Failed to warm up cache for key ${key}:`, error)
      }
    }
  },
}

// React hook for caching
export const useCache = <T>(cache: MemoryCache<T>) => {
  const get = React.useCallback((key: string) => cache.get(key), [cache])
  const set = React.useCallback((key: string, value: T, ttl?: number) => cache.set(key, value, ttl), [cache])
  const has = React.useCallback((key: string) => cache.has(key), [cache])
  const deleteKey = React.useCallback((key: string) => cache.delete(key), [cache])
  const clear = React.useCallback(() => cache.clear(), [cache])

  return { get, set, has, delete: deleteKey, clear }
}

// Cache middleware for API routes
export const withCache = <T, TReq = unknown, TRes = unknown>(
  cache: MemoryCache<T>,
  keyGenerator: (req: TReq) => string,
  ttl?: number
) => {
  return (handler: (req: TReq, res: TRes) => Promise<T>) => {
    return async (req: TReq, res: TRes & { json: (data: unknown) => unknown }) => {
      const key = keyGenerator(req)
      const cached = cache.get(key)
      
      if (cached !== null) {
        return res.json(cached)
      }

      const result = await handler(req, res)
      cache.set(key, result, ttl)
      return res.json(result)
    }
  }
}

// Cleanup expired items periodically
if (typeof window !== "undefined") {
  setInterval(() => {
    Object.values(caches).forEach(cache => cache.cleanup())
  }, 5 * 60 * 1000) // Clean up every 5 minutes
}

export default {
  MemoryCache,
  caches,
  cacheKeys,
  cacheUtils,
  useCache,
  withCache,
}
