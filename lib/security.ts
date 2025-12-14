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
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = { ...data } as Record<string, any>

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeFormData(value)
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