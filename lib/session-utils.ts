/**
 * Session utility functions for managing user preferences and session data
 */

/**
 * Save user information to session storage
 */
export function saveUserInfo(zipCode: string): void {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('ondo_user_zipcode', zipCode)
      sessionStorage.setItem('ondo_user_last_visit', new Date().toISOString())
    } catch (error) {
      console.warn('Failed to save user info to session storage:', error)
    }
  }
}

/**
 * Get user information from session storage
 */
export function getUserInfo(): { zipCode?: string; lastVisit?: string } {
  if (typeof window === 'undefined') return {}

  try {
    const zipCode = sessionStorage.getItem('ondo_user_zipcode')
    const lastVisit = sessionStorage.getItem('ondo_user_last_visit')

    return {
      zipCode: zipCode || undefined,
      lastVisit: lastVisit || undefined,
    }
  } catch (error) {
    console.warn('Failed to get user info from session storage:', error)
    return {}
  }
}

/**
 * Get user ZIP code from session storage (legacy function for compatibility)
 */
export function getUserZipCode(): string | null {
  if (typeof window === 'undefined') return null

  try {
    return sessionStorage.getItem('ondo_user_zipcode')
  } catch (error) {
    console.warn('Failed to get user ZIP code from session storage:', error)
    return null
  }
}

/**
 * Clear user session data
 */
export function clearUserSession(): void {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem('ondo_user_zipcode')
      sessionStorage.removeItem('ondo_user_last_visit')
      sessionStorage.removeItem('property-match-zipcode')
    } catch (error) {
      console.warn('Failed to clear user session:', error)
    }
  }
}

/**
 * Check if user has an active session (visited recently)
 */
export function hasActiveSession(maxAgeHours: number = 24): boolean {
  const { lastVisit } = getUserInfo()
  if (!lastVisit) return false

  try {
    const lastVisitDate = new Date(lastVisit)
    const now = new Date()
    const hoursDiff = (now.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60)

    return hoursDiff < maxAgeHours
  } catch (error) {
    console.warn('Failed to check session validity:', error)
    return false
  }
}