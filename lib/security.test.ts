import { describe, it, expect, beforeEach } from "vitest"
import {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  sanitizeFormData,
  generateSecureToken,
  isSecureContext,
  SecureStorage,
  RateLimiter,
  Blacklist,
} from "./security"

describe("security", () => {
  describe("sanitizeInput", () => {
    it("returns empty string for non-string", () => {
      expect(sanitizeInput(1 as unknown as string)).toBe("")
    })
    it("strips script tags", () => {
      expect(sanitizeInput("Hello <script>alert(1)</script> world")).not.toContain("script")
    })
    it("strips javascript: protocol", () => {
      expect(sanitizeInput("javascript:void(0)")).not.toContain("javascript:")
    })
    it("trims whitespace", () => {
      expect(sanitizeInput("  foo  ")).toBe("foo")
    })
  })

  describe("isValidEmail", () => {
    it("returns true for valid email", () => {
      expect(isValidEmail("user@example.com")).toBe(true)
    })
    it("returns false for invalid email", () => {
      expect(isValidEmail("invalid")).toBe(false)
      expect(isValidEmail("@nodomain.com")).toBe(false)
    })
  })

  describe("isValidPhone", () => {
    it("returns true for digits with optional +", () => {
      expect(isValidPhone("+15551234567")).toBe(true)
      expect(isValidPhone("5551234567")).toBe(true)
    })
    it("returns true for formatted numbers", () => {
      expect(isValidPhone("555-123-4567")).toBe(true)
    })
    it("returns false for non-numeric", () => {
      expect(isValidPhone("555-abc-4567")).toBe(false)
    })
  })

  describe("isValidZipCode", () => {
    it("returns true for 5-digit ZIP", () => {
      expect(isValidZipCode("84043")).toBe(true)
    })
    it("returns true for ZIP+4", () => {
      expect(isValidZipCode("84043-1234")).toBe(true)
    })
    it("returns false for invalid", () => {
      expect(isValidZipCode("8404")).toBe(false)
      expect(isValidZipCode("abcde")).toBe(false)
    })
  })

  describe("sanitizeFormData", () => {
    it("sanitizes string values", () => {
      const out = sanitizeFormData({ name: "  <script>x</script>  " })
      expect(out.name).not.toContain("script")
    })
    it("recursively sanitizes nested objects", () => {
      const out = sanitizeFormData({ a: { b: " <script>alert(1)</script> " } })
      expect((out as { a: { b: string } }).a.b).not.toContain("</script>")
    })
  })

  describe("generateSecureToken", () => {
    it("returns string of requested length (hex = 2 chars per byte)", () => {
      const t = generateSecureToken(16)
      expect(t).toHaveLength(32)
      expect(t).toMatch(/^[0-9a-f]+$/)
    })
  })

  describe("isSecureContext", () => {
    it("returns boolean", () => {
      expect(typeof isSecureContext()).toBe("boolean")
    })
  })

  describe("SecureStorage", () => {
    beforeEach(() => {
      if (typeof window !== "undefined") {
        localStorage.clear()
      }
    })

    it("setItem returns true and getItem returns value in jsdom", () => {
      if (typeof window === "undefined") return
      const ok = SecureStorage.setItem("k", "v")
      expect(ok).toBe(true)
      expect(SecureStorage.getItem("k")).toBe("v")
    })
    it("removeItem clears value", () => {
      if (typeof window === "undefined") return
      SecureStorage.setItem("k", "v")
      SecureStorage.removeItem("k")
      expect(SecureStorage.getItem("k")).toBe(null)
    })
  })

  describe("RateLimiter", () => {
    it("allows attempts under max", () => {
      const limiter = new RateLimiter(3, 60000)
      expect(limiter.isAllowed("key")).toBe(true)
      expect(limiter.isAllowed("key")).toBe(true)
      expect(limiter.isAllowed("key")).toBe(true)
      expect(limiter.isAllowed("key")).toBe(false)
    })
    it("reset clears key", () => {
      const limiter = new RateLimiter(1, 60000)
      limiter.isAllowed("key")
      expect(limiter.isAllowed("key")).toBe(false)
      limiter.reset("key")
      expect(limiter.isAllowed("key")).toBe(true)
    })
  })

  describe("Blacklist", () => {
    it("isUserAgentBlacklisted blocks known bots", () => {
      expect(Blacklist.isUserAgentBlacklisted("Mozilla nextjs-bot")).toBe(true)
      expect(Blacklist.isUserAgentBlacklisted("vercel/1.0")).toBe(true)
    })
    it("isUserAgentBlacklisted allows normal UA", () => {
      expect(Blacklist.isUserAgentBlacklisted("Mozilla/5.0 Chrome")).toBe(false)
    })
    it("isUserAgentBlacklisted returns false for empty", () => {
      expect(Blacklist.isUserAgentBlacklisted("")).toBe(false)
    })
    it("isDomainBlacklisted blocks nextjs/vercel domains", () => {
      expect(Blacklist.isDomainBlacklisted("https://vercel.com/page")).toBe(true)
    })
    it("isDomainBlacklisted allows other domains", () => {
      expect(Blacklist.isDomainBlacklisted("https://example.com")).toBe(false)
    })
    it("isDomainBlacklisted handles invalid URL via catch", () => {
      expect(Blacklist.isDomainBlacklisted("not-a-url")).toBe(false)
    })
    it("addPattern adds custom pattern", () => {
      Blacklist.addPattern(/custom-bot/i)
      expect(Blacklist.isUserAgentBlacklisted("custom-bot")).toBe(true)
    })
    it("addUserAgent adds custom UA", () => {
      Blacklist.addUserAgent("my-bot")
      expect(Blacklist.isUserAgentBlacklisted("my-bot")).toBe(true)
    })
  })
})
