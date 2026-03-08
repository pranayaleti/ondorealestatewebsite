import { describe, it, expect } from "vitest";
import {
  calculateMonthlyPI,
  getLtv,
  getProgramDTI,
  estimateConventionalPmiAnnualFactor,
  getProgramMI,
  clampCreditScore,
  applyFinancedUpfrontToLoan,
} from "./mortgage-utils";

describe("mortgage-utils", () => {
  describe("calculateMonthlyPI", () => {
    it("returns 0 when principal 0", () => {
      expect(calculateMonthlyPI(0, 5, 30)).toBe(0);
    });

    it("returns principal / n when rate 0", () => {
      expect(calculateMonthlyPI(360000, 0, 30)).toBe(360000 / (30 * 12));
    });

    it("computes correct P&I for typical loan", () => {
      const pi = calculateMonthlyPI(200_000, 4.5, 30);
      expect(pi).toBeGreaterThan(900);
      expect(pi).toBeLessThan(1100);
    });
  });

  describe("getLtv", () => {
    it("returns 0 when homePrice <= 0", () => {
      expect(getLtv(0, 0)).toBe(0);
      expect(getLtv(-1, 0)).toBe(0);
    });

    it("returns loan/homePrice", () => {
      expect(getLtv(100_000, 20_000)).toBe(0.8);
      expect(getLtv(100_000, 0)).toBe(1);
    });
  });

  describe("applyFinancedUpfrontToLoan", () => {
    it("adds upfront fee when financed", () => {
      expect(applyFinancedUpfrontToLoan(100_000, 2000, true)).toBe(102_000);
    });

    it("does not add when not financed", () => {
      expect(applyFinancedUpfrontToLoan(100_000, 2000, false)).toBe(100_000);
    });
  });

  describe("getProgramDTI", () => {
    it("returns conventional 28/36 by default", () => {
      const d = getProgramDTI("conventional");
      expect(d.frontPercent).toBe(28);
      expect(d.backPercent).toBe(36);
    });

    it("returns FHA 31/43", () => {
      const d = getProgramDTI("fha");
      expect(d.frontPercent).toBe(31);
      expect(d.backPercent).toBe(43);
    });

    it("returns VA 0/41", () => {
      const d = getProgramDTI("va");
      expect(d.frontPercent).toBe(0);
      expect(d.backPercent).toBe(41);
    });

    it("returns USDA 29/41", () => {
      const d = getProgramDTI("usda");
      expect(d.frontPercent).toBe(29);
      expect(d.backPercent).toBe(41);
    });
  });

  describe("estimateConventionalPmiAnnualFactor", () => {
    it("returns 0 when LTV < 80%", () => {
      expect(estimateConventionalPmiAnnualFactor(0.79, 700)).toBe(0);
    });

    it("returns higher factor for lower credit", () => {
      const high = estimateConventionalPmiAnnualFactor(0.9, 760);
      const low = estimateConventionalPmiAnnualFactor(0.9, 650);
      expect(low).toBeGreaterThan(high);
    });
  });

  describe("getProgramMI", () => {
    it("conventional: no PMI when LTV < 80%", () => {
      const r = getProgramMI("conventional", 150_000, 200_000, 740, 30, 50_000);
      expect(r.monthlyMI).toBe(0);
      expect(r.upfrontFee).toBe(0);
    });

    it("conventional: has PMI when LTV >= 80%", () => {
      const r = getProgramMI("conventional", 180_000, 200_000, 740, 30, 20_000);
      expect(r.monthlyMI).toBeGreaterThan(0);
      expect(r.description).toContain("PMI");
    });

    it("FHA returns upfront and monthly MIP", () => {
      const r = getProgramMI("fha", 200_000, 200_000, 700, 30, 0);
      expect(r.upfrontFee).toBeGreaterThan(0);
      expect(r.monthlyMI).toBeGreaterThan(0);
      expect(r.description).toBe("FHA MIP");
    });

    it("VA returns no monthly MI, has upfront fee", () => {
      const r = getProgramMI("va", 200_000, 250_000, 700, 30, 50_000);
      expect(r.monthlyMI).toBe(0);
      expect(r.upfrontFee).toBeGreaterThan(0);
    });

    it("USDA returns monthly and upfront", () => {
      const r = getProgramMI("usda", 200_000, 200_000, 700, 30, 0);
      expect(r.monthlyMI).toBeGreaterThan(0);
      expect(r.upfrontFee).toBeGreaterThan(0);
    });

    it("handles homePrice 0 without throwing", () => {
      const r = getProgramMI("conventional", 0, 0, 740, 30, 0);
      expect(r.monthlyMI).toBe(0);
      expect(r.upfrontFee).toBe(0);
    });
  });

  describe("clampCreditScore", () => {
    it("clamps to 300-850", () => {
      expect(clampCreditScore(200)).toBe(300);
      expect(clampCreditScore(900)).toBe(850);
      expect(clampCreditScore(740)).toBe(740);
    });

    it("returns 740 for NaN/Infinity", () => {
      expect(clampCreditScore(NaN)).toBe(740);
      expect(clampCreditScore(Infinity)).toBe(740);
      expect(clampCreditScore(-Infinity)).toBe(740);
    });

    it("rounds to integer", () => {
      expect(clampCreditScore(739.6)).toBe(740);
    });
  });
});
