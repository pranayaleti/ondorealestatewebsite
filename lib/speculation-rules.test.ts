import { describe, it, expect } from "vitest"
import {
  EAGER_PREFETCH_URLS,
  MODERATE_PREFETCH_URLS,
  CONSERVATIVE_PREFETCH_URLS,
  getSpeculationRulesJson,
} from "./speculation-rules"

describe("speculation-rules", () => {
  describe("URL arrays", () => {
    it("eager includes home and main nav", () => {
      expect(EAGER_PREFETCH_URLS).toContain("/")
      expect(EAGER_PREFETCH_URLS).toContain("/buy")
      expect(EAGER_PREFETCH_URLS).toContain("/contact")
    })
    it("moderate includes calculators and about", () => {
      expect(MODERATE_PREFETCH_URLS).toContain("/calculators")
      expect(MODERATE_PREFETCH_URLS).toContain("/about")
    })
    it("conservative includes calculator slugs", () => {
      expect(CONSERVATIVE_PREFETCH_URLS).toContain("/calculators/mortgage-payment")
    })
  })

  describe("getSpeculationRulesJson", () => {
    it("returns valid JSON", () => {
      const json = getSpeculationRulesJson()
      expect(() => JSON.parse(json)).not.toThrow()
    })
    it("includes prefetch with three eagerness levels", () => {
      const parsed = JSON.parse(getSpeculationRulesJson())
      expect(parsed.prefetch).toBeDefined()
      expect(Array.isArray(parsed.prefetch)).toBe(true)
      expect(parsed.prefetch.length).toBe(3)
      const eagernesses = parsed.prefetch.map((p: { eagerness: string }) => p.eagerness)
      expect(eagernesses).toContain("eager")
      expect(eagernesses).toContain("moderate")
      expect(eagernesses).toContain("conservative")
    })
    it("each entry has source document and urls", () => {
      const parsed = JSON.parse(getSpeculationRulesJson())
      for (const rule of parsed.prefetch) {
        expect(rule.source).toBe("document")
        expect(Array.isArray(rule.urls)).toBe(true)
      }
    })
  })
})
