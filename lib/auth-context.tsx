"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { backendUrl } from "@/lib/backend"
import { SecureStorage, sanitizeInput, isValidEmail, RateLimiter } from "@/lib/security"

type UserRole = "tenant" | "owner" | "admin" | null
type UserData = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  token?: string
} | null

interface AuthContextType {
  user: UserData
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Token storage keys
const TOKEN_KEY = "ondo_auth_token"
const USER_KEY = "ondo_user_data"

// Rate limiter for login attempts
const loginRateLimiter = new RateLimiter(5, 300000) // 5 attempts per 5 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      const token = SecureStorage.getItem(TOKEN_KEY)
      const savedUser = SecureStorage.getItem(USER_KEY)

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          // Verify token with backend
          const isValid = await verifyToken(token)
          if (isValid) {
            setUser({ ...userData, token })
          } else {
            // Token invalid, clear storage
            SecureStorage.removeItem(TOKEN_KEY)
            SecureStorage.removeItem(USER_KEY)
          }
        } catch (error) {
          // Failed to parse user data or verify token
          SecureStorage.removeItem(TOKEN_KEY)
          SecureStorage.removeItem(USER_KEY)
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(backendUrl('/api/auth/verify'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.warn('Token verification failed:', response.status, errorData)
        return false
      }

      return true
    } catch (error) {
      console.error('Token verification network error:', error)
      return false
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    const token = SecureStorage.getItem(TOKEN_KEY)
    if (!token) return false

    try {
      const response = await fetch(backendUrl('/api/auth/refresh'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.token) {
          const stored = SecureStorage.setItem(TOKEN_KEY, data.token)
          if (stored && user) {
            setUser({ ...user, token: data.token })
          }
          return stored
        }
      }
      return false
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  const login = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      // Rate limiting check
      if (!loginRateLimiter.isAllowed('login-attempts')) {
        setIsLoading(false)
        return { success: false, error: "Too many login attempts. Please wait 5 minutes before trying again." }
      }

      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email)
      const sanitizedPassword = password // Don't sanitize password as it might contain special chars

      // Basic validation
      if (!sanitizedEmail || !sanitizedPassword || !role) {
        setIsLoading(false)
        return { success: false, error: "Email, password, and role are required" }
      }

      // Email validation
      if (!isValidEmail(sanitizedEmail)) {
        setIsLoading(false)
        return { success: false, error: "Please enter a valid email address" }
      }

      // Password strength validation
      if (sanitizedPassword.length < 8) {
        setIsLoading(false)
        return { success: false, error: "Password must be at least 8 characters long" }
      }

      const response = await fetch(backendUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sanitizedEmail.toLowerCase(),
          password: sanitizedPassword,
          role
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setIsLoading(false)
        const errorMessage = data?.message || data?.error || `Login failed (${response.status})`
        return {
          success: false,
          error: errorMessage
        }
      }

      if (data.token && data.user) {
        // Store token and user data securely
        const tokenStored = SecureStorage.setItem(TOKEN_KEY, data.token)
        const userStored = SecureStorage.setItem(USER_KEY, JSON.stringify(data.user))

        if (!tokenStored || !userStored) {
          setIsLoading(false)
          return { success: false, error: "Failed to securely store session data" }
        }

        setUser({ ...data.user, token: data.token })
        setIsLoading(false)

        // Reset rate limiter on successful login
        loginRateLimiter.reset('login-attempts')

        return { success: true }
      } else {
        setIsLoading(false)
        return { success: false, error: "Invalid response from server" }
      }

    } catch (error) {
      setIsLoading(false)
      console.error('Login error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error occurred"
      }
    }
  }

  const logout = () => {
    setUser(null)
    SecureStorage.removeItem(TOKEN_KEY)
    SecureStorage.removeItem(USER_KEY)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, refreshToken }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
