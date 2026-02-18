import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { backendUrl, BACKEND_BASE_URL } from "./backend"

const DEFAULT_BASE = "https://ondorealestateserver.onrender.com"

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
    it("appends path with leading slash to base", () => {
      const url = backendUrl("/api/leads/submit")
      expect(url).toBe(`${DEFAULT_BASE}/api/leads/submit`)
    })
    it("adds leading slash when path missing", () => {
      const url = backendUrl("api/properties")
      expect(url).toBe(`${DEFAULT_BASE}/api/properties`)
    })
    it("returns valid URL", () => {
      const url = backendUrl("/api/blacklist/check")
      expect(() => new URL(url)).not.toThrow()
      expect(new URL(url).pathname).toBe("/api/blacklist/check")
    })
  })
})
