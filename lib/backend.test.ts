import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { backendUrl, BACKEND_BASE_URL } from "./backend"

const DEFAULT_BASE = "https://lpklmquhxgbpavjngbby.supabase.co/functions/v1/api"

describe("backend", () => {
  const origEnv = process.env

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_BACKEND_BASE_URL", undefined)
  })
  afterEach(() => {
    process.env = origEnv
  })

  describe("BACKEND_BASE_URL", () => {
    it("uses default when env not set", () => {
      expect(BACKEND_BASE_URL).toBe(DEFAULT_BASE)
    })
  })

  describe("backendUrl", () => {
    it("strips /api prefix and appends path to base (Supabase Edge Function)", () => {
      const url = backendUrl("/api/leads/submit")
      expect(url).toBe(`${DEFAULT_BASE}/leads/submit`)
    })
    it("adds leading slash when path missing", () => {
      const url = backendUrl("api/properties")
      // path "api/properties" gets / prefix → "/api/properties"; strip only applies to pathname starting with "/api", so result includes /api
      expect(url).toBe(`${DEFAULT_BASE}/api/properties`)
    })
    it("returns valid URL", () => {
      const url = backendUrl("/api/blacklist/check")
      expect(() => new URL(url)).not.toThrow()
      expect(new URL(url).pathname).toBe("/functions/v1/api/blacklist/check")
    })
  })
})
