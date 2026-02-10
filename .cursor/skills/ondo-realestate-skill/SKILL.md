---
name: ondo-realestate-skill
description: Project-specific guidance for working on the Ondo real estate Next.js application, including architecture, conventions, and when to reuse existing utilities and components.
---

# Ondo Real Estate Project Skill

## When to use this skill

Use this skill whenever:
- Working on pages or components in this repo.
- Modifying calculators, dashboards, search, or auth flows.
- Updating SEO, analytics, or Supabase integration.

## Architecture overview

- Framework: Next.js app router (TypeScript, React).
- Styling: Tailwind CSS with design tokens from `src/styles/design-tokens.json` and `_design-tokens.css`.
- Routing: Primary routes live under `app/` using app router conventions.
- Legacy calculators are under `pages/calculators/` and may be gradually migrated.
- Shared UI components live in `components/`, grouped by domain (e.g., search, dashboard, calculators).
- Shared logic and utilities live in `lib/` (auth, SEO, performance, analytics, mortgage math, etc.).

## General implementation rules

1. **Prefer reuse over new code**
   - Before adding new utilities, search `lib/` and `components/` for similar behavior.
   - Reuse existing SEO helpers in `lib/seo.ts` and `lib/site.ts` for metadata.
   - Reuse analytics helpers (e.g. `lib/analytics.ts`, `lib/supabase-analytics.ts`) instead of direct calls.

2. **TypeScript and safety**
   - Do not introduce `any` unless absolutely necessary; prefer precise types or generics.
   - Fix type errors rather than suppressing them.
   - Match existing type patterns in `lib/types.ts` and `types/`.

3. **Styling and design tokens**
   - Use Tailwind utility classes, aligning colors/spacings with tokens from `src/styles/_design-tokens.css`.
   - Avoid hard-coding hex colors when a tokenized class or CSS variable exists.
   - Maintain responsive behavior; test layouts at mobile and desktop breakpoints.

4. **Accessibility and performance**
   - Follow patterns from `lib/accessibility.ts` and `lib/performance.ts` where relevant.
   - Use semantic HTML and ARIA attributes consistent with existing components.
   - Avoid unnecessary client components; keep components server-side unless they need interactivity.

5. **Auth and session patterns**
   - Use helpers in `lib/auth-context.tsx` and `lib/session-utils.ts` to work with user state.
   - When touching auth routes under `app/auth/` or `app/login/`, mirror existing flows and error handling.

## Workflow guidance

When implementing a feature:
1. Identify the relevant route under `app/` (or `pages/calculators/` for legacy calculators).
2. Check `components/` for existing UI patterns to reuse.
3. Look in `lib/` for accompanying business logic (mortgage math, search, SEO, etc.).
4. Add or update tests/logic in the closest existing module rather than creating distant new ones.
5. Run type checking and fix any new type errors introduced.

## Examples

- **Adding a new calculator page**
  - Start from an existing calculator in `pages/calculators/` and reuse its structure.
  - Keep all math in small pure functions (either colocated or in `lib/mortgage-utils.ts`), and keep components focused on rendering and user interaction.

- **Updating SEO for a route**
  - Use the shared site metadata patterns from `lib/seo.ts` and `lib/site.ts`.
  - Avoid duplicating large metadata objects; instead call helpers that compute them.

