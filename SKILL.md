# OndoREui — Skill

## Description

This skill provides context for working on the **Ondo Real Estate consumer-facing UI** — Next.js 15 App Router site for public pages, property search, mortgage calculators, and user-facing dashboards. Uses design tokens for styling; prefers server components.

## When to use

- Adding or changing public pages, property search, calculators, or auth flows in the consumer app.
- Working on SEO, analytics, accessibility, or performance utilities in `lib/`.
- Implementing design tokens or Tailwind usage (tokens in `src/styles/design-tokens.json` and `_design-tokens.css`).
- Integrating WebMCP tools (contact, investments, mortgage) or Supabase client-side usage.

## Instructions

1. **Design tokens**: Use Tailwind classes that align with `src/styles/_design-tokens.css`. Do not hard-code hex when a token or variable exists.
2. **Server vs client**: Prefer server components. Use `"use client"` only when the component needs interactivity (state, events, browser APIs).
3. **Reuse**: Before adding utilities, check `lib/` and `components/` for existing behavior.
4. **Auth**: Use `useAuth()` from `lib/auth-context.tsx` and helpers from `lib/session-utils.ts`. Mirror existing flows in `app/auth/` and login.
5. **SEO**: Use `lib/seo.ts` and `lib/site.ts`; do not duplicate metadata objects.
6. **Analytics**: Use `lib/analytics.ts` and `lib/supabase-analytics.ts`; do not call analytics APIs directly in components.
7. **Accessibility**: Follow `lib/accessibility.ts`; semantic HTML and ARIA consistent with existing components.
8. **Calculators**: New calculators in `pages/calculators/`. Keep math in pure functions in `lib/mortgage-utils.ts`.
9. **TypeScript**: Strict; no `any` unless unavoidable. Use types from `lib/types.ts` and `types/`.
10. **Supabase**: Env `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Prefer server actions or API routes over direct Supabase calls from client components.

## Key paths

- Routes: `app/` (App Router), `app/auth/`, `pages/calculators/` (legacy).
- Components: `components/` by domain (search, dashboard, calculators).
- Lib: `lib/auth-context.tsx`, `lib/session-utils.ts`, `lib/seo.ts`, `lib/site.ts`, `lib/analytics.ts`, `lib/mortgage-utils.ts`, `lib/accessibility.ts`, `lib/performance.ts`, `lib/types.ts`.
- Styles: `src/styles/design-tokens.json`, `src/styles/_design-tokens.css`.
- WebMCP: `docs/WEBMCP.md` (contact, investments, mortgage tools).

## References

- Workspace context: `../soul.md`, `../identity.md`, `../.cursor/rules/shared-context.mdc`.
- Architecture: `../ARCHITECTURE.md`.
- This repo: `AGENTS.md`.
