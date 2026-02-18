import { describe, it, expect } from "vitest"
import {
  calculateMonthlyPI,
  getLtv,
  applyFinancedUpfrontToLoan,
  getProgramDTI,
  estimateConventionalPmiAnnualFactor,
  getProgramMI,
  clampCreditScore,
  type LoanProgram,
} from "./mortgage-utils"

describe("mortgage-utils", () => {
  describe("calculateMonthlyPI", () => {
    it("returns 0 when principal is 0 and rate is 0", () => {
      expect(calculateMonthlyPI(0, 0, 30)).toBe(0)
    })
    it("calculates monthly payment for 0% rate (interest-free)", () => {
      expect(calculateMonthlyPI(120000, 0, 10)).toBe(1000)
    })
    it("calculates standard 30-year mortgage payment", () => {
      const pmt = calculateMonthlyPI(300000, 6.5, 30)
      expect(pmt).toBeGreaterThan(1800)
      expect(pmt).toBeLessThan(2000)
    })
    it("calculates 15-year mortgage payment", () => {
      const pmt = calculateMonthlyPI(200000, 5, 15)
      expect(pmt).toBeGreaterThan(1580)
      expect(pmt).toBeLessThan(1590)
    })
  })

  describe("getLtv", () => {
    it("returns 0 when home price is 0", () => {
      expect(getLtv(0, 50000)).toBe(0)
    })
    it("calculates LTV for 20% down", () => {
      expect(getLtv(300000, 60000)).toBe(0.8)
    })
    it("calculates LTV for no down payment", () => {
      expect(getLtv(200000, 0)).toBe(1)
    })
    it("caps loan at 0 when down payment exceeds price", () => {
      expect(getLtv(100000, 120000)).toBe(0)
    })
  })

  describe("applyFinancedUpfrontToLoan", () => {
    it("adds upfront fee when financed is true", () => {
      expect(applyFinancedUpfrontToLoan(100000, 2000, true)).toBe(102000)
    })
    it("does not add upfront fee when financed is false", () => {
      expect(applyFinancedUpfrontToLoan(100000, 2000, false)).toBe(100000)
    })
  })

  describe("getProgramDTI", () => {
    it("returns conventional 28/36", () => {
      expect(getProgramDTI("conventional")).toEqual({ frontPercent: 28, backPercent: 36 })
    })
    it("returns FHA 31/43", () => {
      expect(getProgramDTI("fha")).toEqual({ frontPercent: 31, backPercent: 43 })
    })
    it("returns VA 0/41", () => {
      expect(getProgramDTI("va")).toEqual({ frontPercent: 0, backPercent: 41 })
    })
    it("returns USDA 29/41", () => {
      expect(getProgramDTI("usda")).toEqual({ frontPercent: 29, backPercent: 41 })
    })
    it("returns conventional for unknown program", () => {
      expect(getProgramDTI("conventional" as LoanProgram)).toEqual({ frontPercent: 28, backPercent: 36 })
    })
  })

  describe("estimateConventionalPmiAnnualFactor", () => {
    it("returns 0 when LTV < 80%", () => {
      expect(estimateConventionalPmiAnnualFactor(0.79, 750)).toBe(0)
    })
    it("returns tier for high credit and LTV > 90%", () => {
      expect(estimateConventionalPmiAnnualFactor(0.91, 760)).toBe(0.004)
    })
    it("returns tier for high credit and LTV 80-90%", () => {
      expect(estimateConventionalPmiAnnualFactor(0.85, 760)).toBe(0.003)
    })
    it("returns higher factor for lower credit", () => {
      // 650 is below 660 so gets 0.015 tier
      expect(estimateConventionalPmiAnnualFactor(0.85, 650)).toBe(0.015)
    })
    it("returns 0.011 for credit 660-699", () => {
      expect(estimateConventionalPmiAnnualFactor(0.85, 680)).toBe(0.011)
    })
    it("returns 0.015 for low credit", () => {
      expect(estimateConventionalPmiAnnualFactor(0.95, 600)).toBe(0.015)
    })
  })

  describe("getProgramMI", () => {
    it("returns no PMI for conventional when LTV < 80%", () => {
      const r = getProgramMI("conventional", 150000, 200000, 750, 30, 50000)
      expect(r.monthlyMI).toBe(0)
      expect(r.description).toContain("No PMI")
    })
    it("returns PMI for conventional when LTV >= 80%", () => {
      const r = getProgramMI("conventional", 250000, 300000, 720, 30, 25000)
      expect(r.monthlyMI).toBeGreaterThan(0)
      expect(r.description).toContain("PMI")
    })
    it("returns FHA MIP with upfront fee", () => {
      const r = getProgramMI("fha", 200000, 250000, 680, 30, 25000)
      expect(r.monthlyMI).toBeGreaterThan(0)
      expect(r.upfrontFee).toBe(200000 * 0.0175)
      expect(r.description).toBe("FHA MIP")
    })
    it("returns VA funding fee, no monthly MI", () => {
      const r = getProgramMI("va", 200000, 250000, 700, 30, 12500)
      expect(r.monthlyMI).toBe(0)
      expect(r.upfrontFee).toBeGreaterThan(0)
    })
    it("returns USDA guarantee fee and monthly", () => {
      const r = getProgramMI("usda", 200000, 250000, 700, 30, 0)
      expect(r.monthlyMI).toBeGreaterThan(0)
      expect(r.upfrontFee).toBe(2000)
    })
  })

  describe("clampCreditScore", () => {
    it("clamps to 740 for NaN/Infinity", () => {
      expect(clampCreditScore(NaN)).toBe(740)
      expect(clampCreditScore(Infinity)).toBe(740)
    })
    it("clamps minimum to 300", () => {
      expect(clampCreditScore(200)).toBe(300)
    })
    it("clamps maximum to 850", () => {
      expect(clampCreditScore(900)).toBe(850)
    })
    it("rounds and keeps valid range", () => {
      expect(clampCreditScore(720.4)).toBe(720)
      expect(clampCreditScore(720.6)).toBe(721)
    })
  })
})
