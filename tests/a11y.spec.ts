import { test, expect } from "@playwright/test"
import { analyze } from "@axe-core/playwright"

const routes = [
  "/",
  "/feedback",
  "/founders-letter",
  "/accessibility",
  "/contact",
  "/dashboard",
  // Primary marketing flows
  "/buy",
  "/sell",
  "/properties",
  "/loans",
  "/investments",
  // Auth and portals
  "/login",
  "/tenant",
  "/owner",
  "/platform",
]

test.describe("Accessibility smoke tests", () => {
  for (const route of routes) {
    test(`page ${route} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" })

      const results = await analyze(page, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa"],
        },
        resultTypes: ["violations"],
      })

      const seriousViolations = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      )

      if (seriousViolations.length > 0) {
        // Log a concise summary to help debugging in CI
        // without overwhelming the output.
        console.warn(
          `\nAccessibility violations on ${route}:\n` +
            seriousViolations
              .map(
                (v) =>
                  `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})`,
              )
              .join("\n"),
        )
      }

      expect.soft(seriousViolations, `Serious/critical a11y violations on ${route}`).toEqual([])
    })
  }
})

