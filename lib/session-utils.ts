"use client"

// Function to save user information to session storage
export function saveUserInfo(zipCode: string, userData?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // Save ZIP code
    sessionStorage.setItem("userZipCode", zipCode)

    // Save additional user data if provided
    if (userData) {
      sessionStorage.setItem("userData", JSON.stringify(userData))
    }

    // Set a flag indicating the user has completed the initial form
    sessionStorage.setItem("formCompleted", "true")
  }
}

// Function to get user ZIP code from session storage
export function getUserZipCode(): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("userZipCode")
  }
  return null
}

// Function to get user data from session storage
export function getUserData(): Record<string, any> | null {
  if (typeof window !== "undefined") {
    const userData = sessionStorage.getItem("userData")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

// Function to check if user has completed the initial form
export function hasCompletedForm(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("formCompleted") === "true"
  }
  return false
}

// Function to clear user session
export function clearUserSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("userZipCode")
    sessionStorage.removeItem("userData")
    sessionStorage.removeItem("formCompleted")
  }
}

export function hasActiveSession(): boolean {
  if (typeof window !== "undefined") {
    return !!sessionStorage.getItem("formCompleted")
  }
  return false
}
