# Testing Guide

## Setup

- **Runner:** [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/react) and **jsdom**.
- **Coverage:** V8 via `@vitest/coverage-v8`; thresholds: **90%** lines/statements/functions, **70%** branches on covered files.

## Commands

```bash
npm run test          # Watch mode
npm run test:run      # Single run
npm run test:coverage # Single run with coverage report
```

## What’s covered

Coverage is collected only for modules that have tests (goal: 90% on this set):

**Lib**

- `lib/mortgage-utils.ts` – PI, LTV, PMI/MIP, credit score
- `lib/validations.ts` – Zod schemas (contact, lead, login, search, etc.)
- `lib/utils.ts` – `cn()` class merge
- `lib/backend.ts` – `backendUrl()`
- `lib/security.ts` – sanitize, validation, `SecureStorage`, `RateLimiter`, `Blacklist`
- `lib/task-scheduler.ts` – debounce, throttle, `processInChunks`, etc.
- `lib/speculation-rules.ts` – prefetch URL lists and JSON output
- `lib/accessibility.ts` – focus, contrast, keyboard, screen reader, `aria`
- `lib/error-handler.ts` – `AppError` hierarchy, `handleApiError`, `withRetry`, etc.
- `lib/blacklist.ts` – user/property/IP/content checks (with mocked `fetch`)
- `lib/site.ts` – site constants
- `lib/seo.ts` – JSON-LD generators (Service, FAQ, LocalBusiness, etc.)
- `lib/image-utils.ts` – `getOptimizedImagePath`, `getImageSrc`

**Components**

- `components/ui/button.tsx` – render, variants, onClick, disabled
- `components/loading.tsx` – render
- `components/error-boundary.tsx` – children, fallback, default Card UI, reset

## Adding tests

1. Place tests next to the module: `*.test.ts` or `*.test.tsx`.
2. Use `describe` / `it` and `expect` from Vitest.
3. For components: `render`, `screen`, `fireEvent` from `@testing-library/react`.
4. Mock `fetch` or `next/navigation` where needed (see `lib/blacklist.test.ts` and setup).
5. To include a new file in coverage, add it to `coverage.include` in `vitest.config.ts` and add tests so thresholds are still met.

## Coverage thresholds

Defined in `vitest.config.ts`:

- **Lines:** 90%
- **Statements:** 90%
- **Functions:** 90%
- **Branches:** 70%

If you add many branches (e.g. complex conditionals), you may need more tests or a temporary branch-threshold adjustment.
