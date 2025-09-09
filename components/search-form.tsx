"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { saveUserInfo } from "@/lib/session-utils"

// Session storage key
const ZIP_CODE_SESSION_KEY = "property-match-zipcode"
const USER_SESSION_KEY = "property-match-user"

export function SearchForm() {
  const [zipCode, setZipCode] = useState("")
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
        "98101": "seattle",
        "98004": "bellevue",
        "98052": "redmond",
        // Add more zip codes as needed
      }

      const city = cityMap[zip]
      if (!city) {
        const city = cityMap[zipCode] || "nearby"
        return city
        //throw new Error("City not found for zip code")
      }
      return city
    } catch (error) {
      console.error("Error getting city from zip code:", error)
      throw new Error("Unable to find city for this ZIP code")
    }
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 5 characters
    const value = e.target.value.replace(/\D/g, "").slice(0, 5)
    setZipCode(value)

    // Clear error when user starts typing again
    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic ZIP code validation
    if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
      setError("Please enter a valid ZIP code")
      toast({
        title: "Invalid ZIP Code",
        description: "Please enter a valid 5-digit ZIP code",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // In a real app, you would validate the ZIP code against a database
    // For now, we'll simulate a city lookup
    const cityMap: Record<string, string> = {
      "98101": "seattle",
      "98004": "bellevue",
      "98052": "redmond",
      "84101": "Salt-Lake-City",
      "84108": "Salt-Lake-City",
      "84044": "Magna",
      "84047": "Midvale",
      "84117": "Holladay",
      // Add more ZIP codes as needed
    }

    // Default to a generic city if ZIP code is not in our map
    const city = cityMap[zipCode] || "nearby"

    // Save the ZIP code to session storage
    saveUserInfo(zipCode)

    try {
      // Store the zip code in sessionStorage (clears when browser is closed)
      sessionStorage.setItem("property-match-zipcode", zipCode)

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
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter ZIP code"
        value={zipCode}
        onChange={handleZipCodeChange}
        className="flex-1"
        maxLength={5}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </form>
  )
}
