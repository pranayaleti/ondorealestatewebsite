import {
  UserBlacklistCheck,
  PropertyBlacklistCheck,
  IPBlacklistCheck,
  BlacklistCheckResult
} from '@/lib/types'
import { backendUrl } from '@/lib/backend'

// Cache for blacklist checks to avoid repeated API calls
const blacklistCache = new Map<string, { result: BlacklistCheckResult; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Check if a user is blacklisted
 */
export async function checkUserBlacklist(
  userId: string,
  email?: string,
  useCache = true
): Promise<UserBlacklistCheck> {
  const cacheKey = `user:${userId}:${email || ''}`

  // Check cache first
  if (useCache) {
    const cached = blacklistCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.result as UserBlacklistCheck
    }
  }

  try {
    const response = await fetch(`${backendUrl('/api/blacklist/check')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'user',
        value: userId,
        email
      })
    })

    if (!response.ok) {
      // On API error, return not blacklisted to avoid blocking legitimate users
      console.warn('Blacklist check API error:', response.status)
      return { isBlacklisted: false, type: 'user' }
    }

    const data = await response.json()
    const result: UserBlacklistCheck = data.success ? data.data : { isBlacklisted: false, type: 'user' }

    // Cache the result
    if (useCache) {
      blacklistCache.set(cacheKey, { result, timestamp: Date.now() })
    }

    return result
  } catch (error) {
    console.error('Error checking user blacklist:', error)
    // On network error, return not blacklisted to avoid blocking legitimate users
    return { isBlacklisted: false, type: 'user' }
  }
}

/**
 * Check if a property is blacklisted
 */
export async function checkPropertyBlacklist(
  propertyId: number,
  useCache = true
): Promise<PropertyBlacklistCheck> {
  const cacheKey = `property:${propertyId}`

  // Check cache first
  if (useCache) {
    const cached = blacklistCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.result as PropertyBlacklistCheck
    }
  }

  try {
    const response = await fetch(`${backendUrl('/api/blacklist/check')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'property',
        value: propertyId.toString()
      })
    })

    if (!response.ok) {
      console.warn('Property blacklist check API error:', response.status)
      return { isBlacklisted: false, type: 'property' }
    }

    const data = await response.json()
    const result: PropertyBlacklistCheck = data.success ? data.data : { isBlacklisted: false, type: 'property' }

    // Cache the result
    if (useCache) {
      blacklistCache.set(cacheKey, { result, timestamp: Date.now() })
    }

    return result
  } catch (error) {
    console.error('Error checking property blacklist:', error)
    return { isBlacklisted: false, type: 'property' }
  }
}

/**
 * Check if an IP address is blacklisted
 */
export async function checkIPBlacklist(
  ipAddress: string,
  useCache = true
): Promise<IPBlacklistCheck> {
  const cacheKey = `ip:${ipAddress}`

  // Check cache first
  if (useCache) {
    const cached = blacklistCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.result as IPBlacklistCheck
    }
  }

  try {
    const response = await fetch(`${backendUrl('/api/blacklist/check')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'ip',
        value: ipAddress
      })
    })

    if (!response.ok) {
      console.warn('IP blacklist check API error:', response.status)
      return { isBlacklisted: false, type: 'ip' }
    }

    const data = await response.json()
    const result: IPBlacklistCheck = data.success ? data.data : { isBlacklisted: false, type: 'ip' }

    // Cache the result
    if (useCache) {
      blacklistCache.set(cacheKey, { result, timestamp: Date.now() })
    }

    return result
  } catch (error) {
    console.error('Error checking IP blacklist:', error)
    return { isBlacklisted: false, type: 'ip' }
  }
}

/**
 * Clear the blacklist cache
 */
export function clearBlacklistCache(): void {
  blacklistCache.clear()
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(request: Request): string | null {
  // Check various headers that might contain the real IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'x-cluster-client-ip', // Rackspace
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // Take the first IP if there are multiple (comma-separated)
      const ip = value.split(',')[0].trim()
      if (ip && ip !== 'unknown') {
        return ip
      }
    }
  }

  return null
}

/**
 * Validate content against content filters
 */
export async function validateContent(content: string): Promise<{ isValid: boolean; blockedPattern?: string }> {
  try {
    // Get active content filters
    const response = await fetch(`${backendUrl('/api/blacklist')}?type=content&isActive=true&limit=100`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.warn('Content filter API error:', response.status)
      return { isValid: true } // Allow content on API error
    }

    const data = await response.json()
    if (!data.success || !data.data) {
      return { isValid: true }
    }

    const filters = data.data
    const lowerContent = content.toLowerCase()

    for (const filter of filters) {
      if (lowerContent.includes(filter.pattern.toLowerCase())) {
        return { isValid: false, blockedPattern: filter.pattern }
      }
    }

    return { isValid: true }
  } catch (error) {
    console.error('Error validating content:', error)
    return { isValid: true } // Allow content on error
  }
}
