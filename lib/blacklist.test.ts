import { describe, it, expect, vi, beforeEach } from "vitest"
import {
  checkUserBlacklist,
  checkPropertyBlacklist,
  checkIPBlacklist,
  clearBlacklistCache,
  getClientIP,
  validateContent,
} from "./blacklist"

describe("blacklist", () => {
  beforeEach(() => {
    clearBlacklistCache()
    vi.restoreAllMocks()
  })

  describe("checkUserBlacklist", () => {
    it("returns not blacklisted on API error (fail open)", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok: false })
      )
      const result = await checkUserBlacklist("", "user@example.com")
      expect(result.isBlacklisted).toBe(false)
      expect(result.type).toBe("user")
    })
    it("returns not blacklisted on network error", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")))
      const result = await checkUserBlacklist("uid1", "u@x.com")
      expect(result.isBlacklisted).toBe(false)
    })
    it("returns data when API returns success", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: { isBlacklisted: true, type: "user", reason: "spam" },
            }),
        })
      )
      const result = await checkUserBlacklist("uid", "e@x.com")
      expect(result.isBlacklisted).toBe(true)
      expect(result.type).toBe("user")
    })
    it("uses cache when useCache true and cached", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: { isBlacklisted: false, type: "user" },
            }),
        })
      )
      await checkUserBlacklist("u1", "a@b.com")
      await checkUserBlacklist("u1", "a@b.com")
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe("checkPropertyBlacklist", () => {
    it("returns not blacklisted on API error", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }))
      const result = await checkPropertyBlacklist(123)
      expect(result.isBlacklisted).toBe(false)
      expect(result.type).toBe("property")
    })
  })

  describe("checkIPBlacklist", () => {
    it("returns not blacklisted on API error", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }))
      const result = await checkIPBlacklist("1.2.3.4")
      expect(result.isBlacklisted).toBe(false)
      expect(result.type).toBe("ip")
    })
  })

  describe("clearBlacklistCache", () => {
    it("clears cache so next check refetches", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: { isBlacklisted: false, type: "user" },
            }),
        })
      )
      await checkUserBlacklist("u", "e@x.com")
      clearBlacklistCache()
      await checkUserBlacklist("u", "e@x.com")
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe("getClientIP", () => {
    it("returns first x-forwarded-for IP", () => {
      const req = new Request("https://example.com", {
        headers: { "x-forwarded-for": " 1.2.3.4 , 5.6.7.8 " },
      })
      expect(getClientIP(req)).toBe("1.2.3.4")
    })
    it("returns null when no IP headers", () => {
      const req = new Request("https://example.com")
      expect(getClientIP(req)).toBe(null)
    })
    it("ignores unknown", () => {
      const req = new Request("https://example.com", {
        headers: { "x-forwarded-for": "unknown" },
      })
      expect(getClientIP(req)).toBe(null)
    })
  })

  describe("validateContent", () => {
    it("returns valid on API error (fail open)", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }))
      const result = await validateContent("anything")
      expect(result.isValid).toBe(true)
    })
    it("returns valid when response success is false or data missing", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ success: false }),
        })
      )
      const result = await validateContent("anything")
      expect(result.isValid).toBe(true)
    })
    it("returns valid when no filters match", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: [{ pattern: "spam" }],
            }),
        })
      )
      const result = await validateContent("hello world")
      expect(result.isValid).toBe(true)
    })
    it("returns invalid when pattern matches", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: [{ pattern: "spam" }],
            }),
        })
      )
      const result = await validateContent("this is spam content")
      expect(result.isValid).toBe(false)
      expect(result.blockedPattern).toBe("spam")
    })
    it("returns valid on fetch throw (fail open)", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")))
      const result = await validateContent("anything")
      expect(result.isValid).toBe(true)
    })
  })
})
