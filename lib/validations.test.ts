import { describe, it, expect } from "vitest"
import {
  emailValidation,
  phoneValidation,
  contactFormSchema,
  leadFormSchema,
  maintenanceRequestSchema,
  propertyFormSchema,
  loginSchema,
  registrationSchema,
  searchSchema,
  sweepstakesSchema,
} from "./validations"

describe("validations", () => {
  describe("emailValidation", () => {
    it("accepts valid email", () => {
      expect(emailValidation.safeParse("user@example.com").success).toBe(true)
    })
    it("rejects invalid email", () => {
      expect(emailValidation.safeParse("invalid").success).toBe(false)
      expect(emailValidation.safeParse("").success).toBe(false)
    })
  })

  describe("phoneValidation", () => {
    it("accepts 10-digit US phone", () => {
      expect(phoneValidation.safeParse("5551234567").success).toBe(true)
      expect(phoneValidation.safeParse("555-123-4567").success).toBe(true)
      expect(phoneValidation.safeParse("(555) 123-4567").success).toBe(true)
    })
    it("accepts international with +", () => {
      expect(phoneValidation.safeParse("+15551234567").success).toBe(true)
    })
    it("rejects too few digits", () => {
      expect(phoneValidation.safeParse("123").success).toBe(false)
    })
    it("rejects non-phone characters", () => {
      expect(phoneValidation.safeParse("555-abc-4567").success).toBe(false)
    })
  })

  describe("contactFormSchema", () => {
    it("parses valid contact form", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        phone: "5551234567",
        message: "Hello, this is a test message.",
        subject: "Inquiry",
      })
      expect(result.success).toBe(true)
    })
    it("rejects short name", () => {
      const result = contactFormSchema.safeParse({
        name: "J",
        email: "j@x.com",
        phone: "5551234567",
        message: "Valid message here",
        subject: "Sub",
      })
      expect(result.success).toBe(false)
    })
  })

  describe("leadFormSchema", () => {
    it("parses valid lead form", () => {
      const result = leadFormSchema.safeParse({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "5551234567",
        address: "123 Main St",
        city: "Lehi",
        zipCode: "84043",
        propertyType: "house",
        propertyValue: "350000",
        source: "website",
      })
      expect(result.success).toBe(true)
    })
    it("rejects invalid ZIP", () => {
      const result = leadFormSchema.safeParse({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "5551234567",
        address: "123 Main St",
        city: "Lehi",
        zipCode: "invalid",
        propertyType: "house",
        propertyValue: "350000",
        source: "website",
      })
      expect(result.success).toBe(false)
    })
  })

  describe("maintenanceRequestSchema", () => {
    it("parses valid maintenance request", () => {
      const result = maintenanceRequestSchema.safeParse({
        title: "Leaking faucet",
        description: "The kitchen faucet is dripping constantly.",
        priority: "medium",
        category: "plumbing",
        entryPermission: "yes",
        petInHome: "no",
      })
      expect(result.success).toBe(true)
    })
  })

  describe("propertyFormSchema", () => {
    it("parses valid property form", () => {
      const result = propertyFormSchema.safeParse({
        name: "Sunset Apartments Unit 1",
        address: "123 Main Street, Apt 1",
        city: "Lehi",
        state: "UT",
        zipCode: "84043",
        propertyType: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        rent: 1500,
        deposit: 1500,
        description: "Spacious two-bedroom with mountain views.",
      })
      expect(result.success).toBe(true)
    })
  })

  describe("loginSchema", () => {
    it("parses valid login", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "Password1",
        role: "owner",
      })
      expect(result.success).toBe(true)
    })
    it("rejects weak password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "short",
        role: "owner",
      })
      expect(result.success).toBe(false)
    })
  })

  describe("registrationSchema", () => {
    it("rejects when passwords do not match", () => {
      const result = registrationSchema.safeParse({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "5551234567",
        password: "Password1",
        confirmPassword: "Password2",
        role: "tenant",
        termsAccepted: true,
      })
      expect(result.success).toBe(false)
    })
    it("rejects when terms not accepted", () => {
      const result = registrationSchema.safeParse({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "5551234567",
        password: "Password1",
        confirmPassword: "Password1",
        role: "tenant",
        termsAccepted: false,
      })
      expect(result.success).toBe(false)
    })
  })

  describe("searchSchema", () => {
    it("parses valid search", () => {
      const result = searchSchema.safeParse({
        query: "3 bedroom",
        location: "Lehi",
        minPrice: 200000,
        maxPrice: 500000,
      })
      expect(result.success).toBe(true)
    })
    it("rejects empty query", () => {
      const result = searchSchema.safeParse({ query: "" })
      expect(result.success).toBe(false)
    })
  })

  describe("sweepstakesSchema", () => {
    it("parses valid sweepstakes entry", () => {
      const result = sweepstakesSchema.safeParse({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "5551234567",
        services: ["buy"],
      })
      expect(result.success).toBe(true)
    })
    it("rejects empty services array", () => {
      const result = sweepstakesSchema.safeParse({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "5551234567",
        services: [],
      })
      expect(result.success).toBe(false)
    })
  })
})
