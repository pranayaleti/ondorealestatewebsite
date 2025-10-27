import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateReferralCode, generateId } from "@/lib/sweepstakes-utils"
import { emailValidation, phoneValidation } from "@/lib/validations"

// Validation schema for sweepstakes entry
const sweepstakesSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: emailValidation,
  phone: phoneValidation,
  referralCode: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  serviceDescription: z.string().optional(),
})

// In-memory storage (in production, use a database)
const sweepstakesEntries = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = sweepstakesSchema.parse(body)
    
    // Check for duplicate email
    if (sweepstakesEntries.has(validatedData.email)) {
      return NextResponse.json(
        { error: "You have already entered this sweepstakes" },
        { status: 409 }
      )
    }
    
    // Generate a unique referral code for this user
    const referralCode = generateReferralCode(validatedData.email)
    
    // Store the entry with referral code
    const entry = {
      ...validatedData,
      referralCode,
      referredBy: validatedData.referralCode || null,
      timestamp: new Date().toISOString(),
      id: generateId(),
    }
    
    sweepstakesEntries.set(validatedData.email, entry)
    
    // Log entry (in production, save to database)
    console.log("Sweepstakes entry:", entry)
    
    return NextResponse.json({
      success: true,
      message: "Entry submitted successfully",
      referralCode,
      entryId: entry.id,
    })
  } catch (error) {
    console.error("Sweepstakes entry error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    
    // Get entry by referral code
    if (code) {
      const entry = Array.from(sweepstakesEntries.values()).find(
        (e) => e.referralCode === code
      )
      
      if (!entry) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        code: entry.referralCode,
        referrer: `${entry.firstName} ${entry.lastName}`,
      })
    }
    
    return NextResponse.json({
      message: "Sweepstakes API",
      totalEntries: sweepstakesEntries.size,
    })
  } catch (error) {
    console.error("Error fetching referral:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

// Utility functions are now imported from lib/sweepstakes-utils.ts

