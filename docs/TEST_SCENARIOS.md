# Test Scenarios & Coverage

This document summarizes test case scenarios across the codebase. Run `npm run test:coverage` to enforce **90%** thresholds (lines, statements, functions; 70% branches).

## Coverage summary (target: 90%)

| Metric     | Threshold | Current |
|-----------|------------|---------|
| Statements| 90%        | 93.43%  |
| Branches  | 70%        | 78.39%  |
| Functions | 90%        | 98.42%  |
| Lines     | 90%        | 93.43%  |

## Test files and scenarios

### Lib (unit tests)

| File | Scenarios |
|------|-----------|
| **lib/accessibility.test.ts** | generateId, announceToScreenReader (append/remove with fake timers), focus (focusFirst, focusLast, trapFocus Tab/Shift+Tab), contrast (getLuminance, getContrastRatio, meetsWCAGAA), keyboard (arrow nav vertical/horizontal, Enter/Space activation), screenReader (hide/show, createScreenReaderText), aria (formField, button, modal) |
| **lib/analytics.test.ts** | trackPageView, trackEvent, trackFormSubmission (success/error), trackPropertyView, trackSearch, trackLeadGeneration (with/without propertyId), trackCalculatorUsage, trackEngagement; performanceTracking (trackWebVitals, trackPageLoad); ecommerceTracking (trackPropertyInterest, trackLeadConversion) |
| **lib/backend.test.ts** | backendUrl with/without leading slash, BACKEND_BASE_URL from env |
| **lib/blacklist.test.ts** | checkUserBlacklist (API error, network error, success, cache); checkPropertyBlacklist, checkIPBlacklist; clearBlacklistCache; getClientIP (x-forwarded-for, no headers, unknown); validateContent (API error, success false/no data, no match, pattern match, fetch throw) |
| **lib/config.test.ts** | config object (site, analytics, api, env); validateConfig (returns true when URL set, throws in dev when URL missing) |
| **lib/error-handler.test.ts** | AppError, ValidationError, AuthenticationError, AuthorizationError, NotFoundError, ConflictError, RateLimitError; handleApiError (AppError, Zod-like, Prisma P2002/P2025, generic); handleClientError; withRetry (success, retry then throw); handleErrorBoundaryError; asyncHandler; logError |
| **lib/image-utils.test.ts** | getOptimizedImagePath (non-png/jpg, server branch, client with webp); getImageSrc (known webp list, unknown, path with dir) |
| **lib/mortgage-utils.test.ts** | Monthly payment, amortization, affordability, DTI, LTV, refi savings, buy/sell calculators (30 tests) |
| **lib/performance.test.ts** | measurePageLoad (null when no navigation entry), measureWebVitals, logMetrics (dev vs prod); imageOptimization (getResponsiveSizes, generateSrcSet); lazyLoading (createObserver, lazyLoadImage); bundleAnalysis getBundleInfo |
| **lib/responsive-utils.test.ts** | breakpoints, getCurrentBreakpoint, isBreakpoint; responsiveGrid, responsiveSpacing, responsiveTypography, responsiveVisibility; touchFriendly, mobileFirst, patterns, responsiveImages, responsiveForms |
| **lib/seo.test.ts** | generateServiceJsonLd, generateFAQJsonLd, generateBreadcrumbJsonLd, generateLocalBusinessJsonLd, generateOrganizationJsonLd, generateWebsiteJsonLd, getCanonicalUrl, etc. |
| **lib/security.test.ts** | sanitizeInput (non-string, script, javascript:, trim); isValidEmail, isValidPhone, isValidZipCode; sanitizeFormData (nested); generateSecureToken; isSecureContext; SecureStorage (setItem, getItem, removeItem); RateLimiter (isAllowed, reset); Blacklist (isUserAgentBlacklisted, isDomainBlacklisted, addPattern, addUserAgent) |
| **lib/site.test.ts** | SITE_NAME, SITE_URL, SITE_PHONE, SITE_ADDRESS_OBJ, SITE_EMAILS, SITE_SOCIALS |
| **lib/speculation-rules.test.ts** | getSpeculationRulesJson (eager, moderate, conservative rules) |
| **lib/task-scheduler.test.ts** | scheduleTask (resolve, reject); processInChunks (onProgress, delay); debounce, throttle (fake timers); requestAnimationFrameTask; batchUpdates; measureTask |
| **lib/utils.test.ts** | cn (classnames merge), formatCurrency, formatDate |
| **lib/validations.test.ts** | emailValidation, phoneValidation, contactFormSchema, leadFormSchema, maintenanceRequestSchema, etc. |

### Components

| File | Scenarios |
|------|-----------|
| **components/error-boundary.test.tsx** | Renders children when no error; renders fallback when child throws; resetError from fallback; default Card UI when no fallback; window.gtag called in componentDidCatch; Try Again resets then child re-throws |
| **components/loading.test.tsx** | Renders loading spinner and text |
| **components/ui/button.test.tsx** | Variants (default, destructive, outline, secondary, ghost, link), sizes, asChild, disabled, click handler |

## Running tests

```bash
npm run test          # watch mode
npm run test:run      # single run
npm run test:coverage # run with coverage (enforces 90% thresholds)
```

## Adding new tests

- Place `*.test.ts` or `*.test.tsx` next to the module or in the same directory.
- Use Vitest (`describe`, `it`, `expect`, `vi`) and `@testing-library/react` for components.
- For coverage, add the new file to `coverage.include` in `vitest.config.ts` if it should count toward the 90% target.
