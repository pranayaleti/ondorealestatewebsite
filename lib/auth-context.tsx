"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserRole = "tenant" | "owner" | "admin" | null
type UserData = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
} | null

interface AuthContextType {
  user: UserData
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      // Only access localStorage on client-side
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      // In a real app, this would be a fetch to verify the session
      const savedUser = localStorage.getItem("Real EstateUser")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          // Failed to parse user data, remove invalid entry
          localStorage.removeItem("Real EstateUser")
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API request with 1-second delay
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            // Basic validation
            if (!email || !password || !role) {
              setIsLoading(false)
              resolve(false)
              return
            }

            // Demo users based on role
            let userData: UserData = null

            if (role === "tenant") {
              userData = {
                id: "t-123",
                name: "John Smith",
                email,
                role: "tenant",
                avatar: "/abstract-geometric-shapes.png",
              }
            } else if (role === "owner") {
              userData = {
                id: "o-456",
                name: "Sarah Johnson",
                email,
                role: "owner",
                avatar: "/abstract-geometric-shapes.png",
              }
            } else if (role === "admin") {
              userData = {
                id: "a-789",
                name: "Admin User",
                email,
                role: "admin",
                avatar: "/abstract-geometric-shapes.png",
              }
            }

            if (userData && typeof window !== 'undefined') {
              setUser(userData)
              localStorage.setItem("Real EstateUser", JSON.stringify(userData))
              setIsLoading(false)
              resolve(true)
            } else {
              setIsLoading(false)
              resolve(false)
            }
          } catch (error) {
            setIsLoading(false)
            resolve(false)
          }
        }, 1000)
      })
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("Real EstateUser")
    }
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
