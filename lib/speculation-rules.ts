/**
 * Speculation Rules API – prefetch and prerender rules for same-origin navigation.
 * Used in root layout to improve perceived performance (instant navigations).
 *
 * Rules:
 * - Only public, same-origin URLs; no auth/dashboard/owner/tenant (user-specific).
 * - No prerender for pages that trigger side effects or reflect authenticated state.
 * - Eager: above-the-fold / primary CTAs. Moderate: visible/near-viewport links.
 * - Conservative: prefetch on hover or when link becomes visible (footer, secondary).
 */

/** Primary nav and home – prefetch as soon as the rule is seen (eager). */
export const EAGER_PREFETCH_URLS: string[] = [
  "/",
  "/buy",
  "/sell",
  "/properties",
  "/property-management",
  "/loans",
  "/notary",
  "/contact",
]

/** Secondary nav and high-traffic pages – prefetch when link is visible (moderate). */
export const MODERATE_PREFETCH_URLS: string[] = [
  "/calculators",
  "/resources",
  "/news",
  "/blog",
  "/why-utah",
  "/founders-letter",
  "/about",
  "/faq",
  "/refinance/process",
  "/sweepstakes",
  "/accessibility",
  "/privacy-policy",
  "/terms-of-service",
  "/sitemap",
  "/login",
  "/auth",
  "/buy/first-time",
  "/buy/second-home",
  "/buy/fixed-rate",
  "/buy/rates",
  "/loans/conventional",
  "/about/history",
  "/about/team",
  "/about/careers",
  "/faq/general-faqs",
  "/faq/payments-faqs",
]

/**
 * Footer and secondary links – prefetch on hover or when visible (conservative).
 * Keeps bandwidth usage low while still speeding up likely next navigations.
 */
export const CONSERVATIVE_PREFETCH_URLS: string[] = [
  "/buy/30-year",
  "/buy/15-year",
  "/buy/adjustable-rate",
  "/loans/fha",
  "/loans/va",
  "/loans/usda",
  "/loans/heloc",
  "/loans/reverse",
  "/loans/jumbo",
  "/calculators/mortgage-payment",
  "/calculators/affordability",
  "/calculators/income",
  "/calculators/closing-cost",
  "/calculators/refinance",
  "/calculators/home-sale",
  "/calculators/buying-power",
  "/about/giving-back",
  "/about/news",
  "/about/investor-relations",
  "/about/testimonials",
  "/faq/tenant-faqs",
  "/faq/owner-faqs",
  "/faq/notary-faqs",
  "/faq/loans-faqs",
  "/faq/loan-payoffs-faqs",
  "/faq/hardship-faqs",
  "/faq/escrow-faqs",
  "/faq/disaster-faqs",
  "/faq/buying-selling-faqs",
]

/**
 * Build speculation rules JSON for script type="speculationrules".
 * Prefetch only (no prerender) to avoid side effects and double analytics.
 * Same-origin only (relative URLs); no user-specific or token-bearing URLs.
 * source "list" = explicit URLs; eagerness: eager = immediately, moderate = when visible, conservative = on hover/visible.
 */
export function getSpeculationRulesJson(): string {
  const rules: {
    prefetch?: Array<{
      source: "list";
      urls: string[];
      eagerness: "eager" | "moderate" | "conservative";
    }>;
  } = {
    prefetch: [
      { source: "list", urls: EAGER_PREFETCH_URLS, eagerness: "eager" },
      { source: "list", urls: MODERATE_PREFETCH_URLS, eagerness: "moderate" },
      { source: "list", urls: CONSERVATIVE_PREFETCH_URLS, eagerness: "conservative" },
    ],
  };
  return JSON.stringify(rules);
}
