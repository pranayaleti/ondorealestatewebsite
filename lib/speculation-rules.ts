/**
 * Speculation Rules API – prefetch and prerender rules for same-origin navigation.
 * Used in root layout to improve perceived performance (instant navigations).
 * Only public, same-origin URLs; no auth/dashboard/owner/tenant.
 */

/** Primary nav and home – prefetch as soon as possible (eager). */
export const EAGER_PREFETCH_URLS: string[] = [
  "/",
  "/buy",
  "/sell",
  "/properties",
  "/property-management",
  "/loans",
  "/notary",
];

/** Secondary nav – prefetch when link is visible (moderate). */
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
  "/contact",
  "/accessibility",
  "/privacy-policy",
  "/terms-of-service",
];

/**
 * Build speculation rules JSON for script type="speculationrules".
 * Prefetch only; no prerender for user-specific or dynamic pages.
 */
export function getSpeculationRulesJson(): string {
  const rules: {
    prefetch?: Array<{
      source: "document";
      urls: string[];
      eagerness: "eager" | "moderate" | "conservative";
    }>;
  } = {
    prefetch: [
      { source: "document", urls: EAGER_PREFETCH_URLS, eagerness: "eager" },
      { source: "document", urls: MODERATE_PREFETCH_URLS, eagerness: "moderate" },
    ],
  };
  return JSON.stringify(rules);
}
