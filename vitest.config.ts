import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "out", "e2e"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov", "html"],
      // Include only modules that have corresponding tests (goal: 90% on this set)
      include: [
        "lib/mortgage-utils.ts",
        "lib/validations.ts",
        "lib/utils.ts",
        "lib/backend.ts",
        "lib/security.ts",
        "lib/task-scheduler.ts",
        "lib/speculation-rules.ts",
        "lib/accessibility.ts",
        "lib/error-handler.ts",
        "lib/blacklist.ts",
        "lib/site.ts",
        "lib/seo.ts",
        "lib/image-utils.ts",
        "components/ui/button.tsx",
        "components/loading.tsx",
        "components/error-boundary.tsx",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/vitest.setup.ts",
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 70,
        statements: 90,
      },
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
