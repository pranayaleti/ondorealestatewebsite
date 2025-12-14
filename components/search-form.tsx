"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { saveUserInfo } from "@/lib/session-utils"
import { sanitizeInput, isValidZipCode, RateLimiter } from "@/lib/security"
import { SearchFormData } from "@/lib/types"

// Session storage key
const ZIP_CODE_SESSION_KEY = "property-match-zipcode"
const USER_SESSION_KEY = "property-match-user"

const searchRateLimiter = new RateLimiter(3, 30000) // 3 attempts per 30 seconds

export function SearchForm() {
  const [formData, setFormData] = useState<SearchFormData>({ zipCode: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Function to get city from zip code (mock implementation)
  const getCityFromZipCode = async (zip: string): Promise<string> => {
    try {
      // Mock city lookup - in production, use a real geocoding API
      const cityMap: Record<string, string> = {
        "84101": "Salt-Lake-City",
        "84108": "Salt-Lake-City",
        "84044": "Magna",
        "84047": "Midvale",
        "84117": "Holladay",
        "98101": "Seattle",
        "98004": "Bellevue",
        "98052": "Redmond",
        // Add more zip codes as needed
      }

      const city = cityMap[zip]
      if (!city) {
        // Return a default city for unknown ZIP codes
        return "nearby"
      }
      return city
    } catch (error) {
      console.error("Error getting city from zip code:", error)
      throw new Error("Unable to find city for this ZIP code")
    }
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input: only allow digits and limit to 5 characters
    const value = sanitizeInput(e.target.value).replace(/\D/g, "").slice(0, 5)
    setFormData(prev => ({ ...prev, zipCode: value }))

    // Clear error when user starts typing again
    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Rate limiting check
    if (!searchRateLimiter.isAllowed('search-form')) {
      setError("Too many search attempts. Please wait before trying again.")
      toast({
        title: "Rate Limited",
        description: "Please wait 30 seconds before searching again.",
        variant: "destructive",
      })
      return
    }

    // Sanitize and validate ZIP code
    const sanitizedZipCode = sanitizeInput(formData.zipCode)
    if (!sanitizedZipCode || !isValidZipCode(sanitizedZipCode)) {
      setError("Please enter a valid ZIP code")
      toast({
        title: "Invalid ZIP Code",
        description: "Please enter a valid 5-digit ZIP code",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Get city from zip code
    const city = await getCityFromZipCode(sanitizedZipCode)

    // Save the ZIP code to session storage
    saveUserInfo(sanitizedZipCode)

    try {
      // Store the zip code in sessionStorage (clears when browser is closed)
      sessionStorage.setItem("property-match-zipcode", sanitizedZipCode)

      // Get city from zip code
      //const city = await getCityFromZipCode(zipCode)

      // Redirect to the search form page
      //router.push(`/search/${city}?zip=${zipCode}`)
      // Redirect to the search results page
      setTimeout(() => {
        router.push(`/search/${city}`)
        setIsLoading(false)
      }, 1000) // Simulate network delay
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Location Error",
        description: "We couldn't find that ZIP code. Please try another one.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
      <Input
        type="text"
        placeholder="Enter ZIP code (e.g., 84101)"
        value={formData.zipCode}
        onChange={handleZipCodeChange}
        className="flex-1"
        maxLength={5}
        disabled={isLoading}
        aria-describedby={error ? "zip-error" : undefined}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
      {error && <p id="zip-error" className="text-sm text-red-500 mt-1" role="alert">{error}</p>}
    </form>
  )
}
