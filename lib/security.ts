/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/on\w+='[^']*'/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)\.]/g, ''))
}

/**
 * Validate ZIP code
 */
export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode.trim())
}

/**
 * Sanitize and validate form data
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data } as Record<string, unknown>

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeFormData(value as Record<string, unknown>)
    }
  }

  return sanitized as T
}

/**
 * Generate a secure random string
 */
export function generateSecureToken(length: number = 32): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  // Fallback for environments without crypto API
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Check if the current environment is secure (HTTPS)
 */
export function isSecureContext(): boolean {
  return typeof window !== 'undefined' &&
         window.location.protocol === 'https:' &&
         window.isSecureContext
}

/**
 * Safe localStorage operations with error handling
 */
export class SecureStorage {
  static setItem(key: string, value: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false
      }

      // Check if storage is available
      const testKey = '__storage_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)

      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn('Failed to set item in localStorage:', error)
      return false
    }
  }

  static getItem(key: string): string | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null
      }
      return localStorage.getItem(key)
    } catch (error) {
      console.warn('Failed to get item from localStorage:', error)
      return null
    }
  }

  static removeItem(key: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false
      }
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn('Failed to remove item from localStorage:', error)
      return false
    }
  }
}

/**
 * Rate limiting utility for API calls
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []

    // Remove old attempts outside the window
    const validAttempts = attempts.filter(timestamp => now - timestamp < this.windowMs)

    if (validAttempts.length >= this.maxAttempts) {
      return false
    }

    // Add current attempt
    validAttempts.push(now)
    this.attempts.set(key, validAttempts)

    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

/**
 * Blacklist utility for blocking specific user agents, domains, or patterns
 */
export class Blacklist {
  private static readonly NEXTJS_PATTERNS = [
    /nextjs/i,
    /next\.js/i,
    /nextjs-bot/i,
    /vercel/i,
  ]

  private static readonly BLOCKED_USER_AGENTS = [
    'nextjs',
    'next.js',
    'nextjs-bot',
    'vercel',
  ]

  /**
   * Check if a user agent is blacklisted
   */
  static isUserAgentBlacklisted(userAgent: string): boolean {
    if (!userAgent) return false

    const lowerUserAgent = userAgent.toLowerCase()
    
    // Check against blocked user agents
    if (this.BLOCKED_USER_AGENTS.some(blocked => lowerUserAgent.includes(blocked))) {
      return true
    }

    // Check against patterns
    return this.NEXTJS_PATTERNS.some(pattern => pattern.test(userAgent))
  }

  /**
   * Check if a domain or URL is blacklisted
   */
  static isDomainBlacklisted(url: string): boolean {
    if (!url) return false

    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase()
      
      // Block Next.js related domains
      return hostname.includes('nextjs') || 
             hostname.includes('vercel') ||
             hostname.includes('next.js')
    } catch {
      // If URL parsing fails, check if string contains blacklisted patterns
      const lowerUrl = url.toLowerCase()
      return lowerUrl.includes('nextjs') || 
             lowerUrl.includes('vercel') ||
             lowerUrl.includes('next.js')
    }
  }

  /**
   * Add a custom pattern to the blacklist
   */
  static addPattern(pattern: RegExp): void {
    this.NEXTJS_PATTERNS.push(pattern)
  }

  /**
   * Add a custom user agent to the blacklist
   */
  static addUserAgent(userAgent: string): void {
    if (!this.BLOCKED_USER_AGENTS.includes(userAgent.toLowerCase())) {
      this.BLOCKED_USER_AGENTS.push(userAgent.toLowerCase())
    }
  }
}