/**
 * Sweepstakes and referral utility functions
 */

export interface SweepstakesEntry {
  firstName: string
  lastName: string
  email: string
  phone: string
  referralCode?: string
  referredBy?: string | null
  services: string[]
  serviceDescription?: string
  timestamp: string
  id: string
}

/**
 * Generate a unique referral code from an email address
 * @param email - The user's email address
 * @returns A formatted referral code (e.g., "ABCDE-FGHIJ-ONDO")
 */
export function generateReferralCode(email: string): string {
  // Create a hash from the email
  const hash = email.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  // Convert to positive number and create code
  const code = Math.abs(hash).toString(36).toUpperCase()
  
  // Format as XXXXX-XXXXX-ONDO
  const codePart1 = code.slice(0, 5).padStart(5, '0')
  const codePart2 = code.slice(5, 10).padStart(5, '0').slice(0, 5)
  
  return `${codePart1}-${codePart2}-ONDO`
}

/**
 * Generate a unique ID for database entries
 * @returns A unique identifier string
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validate a referral code format
 * @param code - The referral code to validate
 * @returns boolean indicating if the code is valid
 */
export function isValidReferralCode(code: string): boolean {
  const regex = /^[A-Z0-9]{5}-[A-Z0-9]{5}-ONDO$/
  return regex.test(code)
}

/**
 * Get referral link for a given code
 * @param baseUrl - The base URL of the site
 * @param code - The referral code
 * @returns The complete referral link
 */
export function getReferralLink(baseUrl: string, code: string): string {
  return `${baseUrl}/sweepstakes?ref=${code}`
}

/**
 * Extract referral code from a URL
 * @param url - The URL to extract the code from
 * @returns The referral code or null
 */
export function extractReferralCodeFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get('ref')
  } catch {
    return null
  }
}

/**
 * Get display name for a user
 * @param entry - The sweepstakes entry
 * @returns The user's display name
 */
export function getDisplayName(entry: { firstName: string; lastName: string }): string {
  return `${entry.firstName} ${entry.lastName}`
}

