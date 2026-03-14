# AI-Enhanced Calculators — Design Spec
**Date:** 2026-03-13
**Status:** Approved
**Scope:** All 17 real estate calculators in OndoREui

---

## Overview

Enhance all 17 real estate calculators in OndoREui with:
1. AI-powered deal analysis (deal score + market context + actionable advice)
2. Redesigned side-by-side layout with mobile-responsive stacking
3. Upgraded PDF export using `@react-pdf/renderer` with AI analysis included
4. Ondo brand colors used as subtle accents (not dominant)
5. Cost-efficient Claude Haiku for AI calls

---

## 1. UI Layout

### Desktop (≥768px) — Side-by-Side
- **Left panel:** all calculator inputs (existing fields + two new optional fields: `location` text input, `propertyType` dropdown)
- **Right panel:** results metrics grid (top) + AI analysis panel (bottom) + PDF download button (bottom of right panel)
- Inputs and results panels are equal width, separated by a subtle border

### Mobile (<768px) — Stacked
- Inputs section at top (full width)
- Results metrics grid below inputs
- AI Insights as a collapsible accordion below results (collapsed by default, tappable to expand)
- PDF download button full-width at bottom

### AI Panel (right panel, desktop) / Accordion (mobile)
Contains three sub-sections rendered after AI response arrives:
1. **Deal Score** — numeric 0–100 with a horizontal score bar; badge label (e.g. "Strong Buy", "Caution", "Pass")
2. **Market Context** — 1–3 sentences from Claude about how the numbers compare to typical ranges for the property type and location
3. **Recommendations** — 2–4 bullet points of actionable advice (e.g. "Negotiate purchase price to X to push COC above Y%")

AI panel shows a skeleton loader while the request is in flight. If the AI call fails, show a subtle inline error ("Analysis unavailable") without breaking the calculator.

### Branding
- Ondo primary orange (`#F97316`) used sparingly: section labels, score bar fill, AI panel left border, badge backgrounds, PDF button, PDF header accent
- Dark backgrounds: `#111827` (dark), `#1F2937` (elevated)
- All other UI elements use existing neutral Tailwind classes from the current design system

---

## 2. Two New Optional Inputs (all calculators)

| Field | Type | Purpose |
|-------|------|---------|
| `location` | `string` (free text) | Passed to Claude for market context. E.g. "Austin, TX" |
| `propertyType` | `select` | Options: Single Family, Multi-Family, Condo, Commercial. Passed to Claude for context |

These are optional — calculator math works without them. AI analysis degrades gracefully when omitted (Claude gives general rather than location-specific context).

---

## 3. Backend — New Endpoint

### `POST /api/calculators/analyze`

**Request body:**
```json
{
  "calculatorType": "roi | mortgage | cap-rate | cash-on-cash | dscr | grm | fifty-percent | one-percent | affordability | buying-power | closing-cost | home-sale | income | refinance | rent-vs-own | retirement | temporary-buydown",
  "inputs": { /* key-value map of all calculator inputs */ },
  "results": { /* key-value map of all computed outputs */ },
  "location": "Austin, TX",          // optional
  "propertyType": "Single Family"    // optional
}
```

**Response:**
```json
{
  "dealScore": 82,
  "scoreLabel": "Strong Buy",
  "marketContext": "Cap rate and cash-on-cash returns exceed typical ranges for single-family rentals in Austin, TX...",
  "recommendations": [
    "Negotiate purchase price to $432K to push cash-on-cash above 14%",
    "DSCR of 1.24 qualifies for DSCR loan products (minimum 1.20)",
    "Property meets the 1% monthly rent rule — solid cash flow basis"
  ]
}
```

**Implementation:**
- Route: `src/routes/calculatorRoutes.ts` (new file)
- Controller: `src/controllers/calculatorController.ts` (new file)
- Reuses existing Anthropic client from `assistantService.ts`
- Model: `claude-haiku-4-5-20251001` (verified model ID per Anthropic SDK — Haiku 4.5)
- Prompt: structured system prompt per calculator type, with inputs/results injected. Response requested as JSON.
- No auth required (calculators are public-facing)
- Rate limit: 20 req/min per IP (use existing rate-limit middleware) — intentionally permissive for public users; backend holds the API key server-side so there is no key exposure to clients
- Token budget: enforce `max_tokens: 400` on every Haiku call to cap cost per request (~$0.001 worst case)
- Add an env flag `ENABLE_CALCULATOR_AI=true` — if unset or false, endpoint returns 503 so the feature can be toggled without a deploy
- Backend CORS: the `/api/calculators/analyze` route must allow unauthenticated cross-origin POST from the OndoREui domain (add to existing CORS config alongside other public routes)

### Score Label Thresholds
The backend computes `scoreLabel` from `dealScore` before returning:

| Score | Label |
|-------|-------|
| 70–100 | Strong Buy |
| 40–69 | Caution |
| 0–39 | Pass |

Claude returns the raw numeric score; the backend maps it to the label string.

### propertyType Validation
The backend validates `propertyType` against the enum `["Single Family", "Multi-Family", "Condo", "Commercial"]` and returns 400 if an invalid value is provided. If omitted, Claude is prompted without a property type constraint.

### Prompt Strategy
Each calculator type gets a short system prompt describing what metrics matter for that calculator. The user message contains the inputs and results as a JSON block. Claude is instructed to return valid JSON only (no prose wrapping).

---

## 4. Frontend — Shared AI Hook

### AIAnalysis Type

Canonical TypeScript interface shared across hook, panel, and PDF component:

```typescript
// lib/api/calculators.ts (also export from here)
export interface AIAnalysis {
  dealScore: number          // 0–100
  scoreLabel: 'Strong Buy' | 'Caution' | 'Pass'
  marketContext: string      // 1–3 sentences
  recommendations: string[]  // 2–4 bullet strings
}
```

### Shared Hook: `hooks/useCalculatorAI.ts`

```typescript
// Signature
function useCalculatorAI(params: {
  calculatorType: string
  inputs: Record<string, unknown>
  results: Record<string, unknown>
  location?: string
  propertyType?: string
}): {
  data: AIAnalysis | null
  loading: boolean
  error: string | null
  analyze: () => void   // call explicitly to trigger
}
```

- **Triggered explicitly** — the hook exposes an `analyze()` function. Calculator pages call it inside the existing "Calculate" button handler, after local math completes. It does NOT auto-fire on state change to avoid wasting Haiku budget on incomplete inputs.
- Cancels in-flight requests if `analyze()` is called again before previous resolves (AbortController)
- Cached per unique stringified `{ inputs }` key in component state (no persistence needed)
- Only fires if at least the primary numeric inputs are non-zero

### Shared AI Panel Component

New component: `components/calculators/AIInsightsPanel.tsx`

Props: `{ analysis: AIAnalysis | null, loading: boolean, error: string | null }`

Renders:
- **Loading:** skeleton bars (score bar placeholder + 3 text line skeletons)
- **Error:** subtle muted text "AI analysis unavailable"
- **Data:** score bar + market context + recommendations bullets

Used by all 17 calculator pages by dropping `<AIInsightsPanel />` into the right panel.

---

## 5. PDF Export — Upgrade to @react-pdf/renderer

Replace current `html2canvas + jsPDF` approach with `@react-pdf/renderer`.

### Next.js SSR Note
`@react-pdf/renderer` runs in a Web Worker and is incompatible with SSR. The `PDFDownloadLink` component must be dynamically imported with `ssr: false`:

```typescript
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(m => m.PDFDownloadLink),
  { ssr: false }
)
```

### New shared component: `components/calculators/CalculatorPDFDocument.tsx`

A React PDF document component accepting:
```typescript
interface PDFProps {
  calculatorType: string
  title: string          // e.g. "ROI Investment Report"
  inputs: Record<string, string>   // human-readable label → value
  results: Record<string, string>  // human-readable label → value
  analysis?: AIAnalysis            // optional — included if AI ran
  location?: string
  generatedAt: Date
}
```

### PDF Layout (single column, mobile-readable)
1. **Header** — dark background (`#111827`), "ONDO" wordmark in orange, report title, location + date, deal score badge (if AI ran)
2. **Score bar** — orange gradient fill, 0–100 scale (if AI ran)
3. **Metrics grid** — 2-column grid, each cell: label + bold value + market comparison if available
4. **AI Analysis section** — orange left border, market context paragraph, recommendations as bullet list (if AI ran)
5. **Inputs summary** — small gray pill badges listing all inputs
6. **Footer** — "ondo.com" in orange, "AI analysis by Claude Haiku" in muted gray

### Key design decisions
- Programmatic layout (no DOM screenshot) → crisp text at any zoom level
- Single-column structure renders well on phone screens when PDF is viewed in mobile browser
- Orange used only in: header "ONDO" text, score bar fill, AI section left border, footer brand text

---

## 6. Files Changed

### OndoREui (Next.js)

The calculators live in the **Pages Router** (`pages/calculators/`) — this is intentional co-existence with the App Router. New shared components and hooks live at the repo root level alongside existing `components/`, `hooks/`, and `lib/` directories (not under `app/`).

| File | Action |
|------|--------|
| `pages/calculators/*.tsx` (all 17) | Add location/propertyType inputs, adopt side-by-side layout, call `analyze()` in Calculate handler, add `<AIInsightsPanel>`, replace PDF download with `@react-pdf/renderer` |
| `hooks/useCalculatorAI.ts` | New — shared AI fetch hook (root `hooks/` dir) |
| `components/calculators/AIInsightsPanel.tsx` | New — shared AI UI component |
| `components/calculators/CalculatorPDFDocument.tsx` | New — shared PDF document component |
| `lib/api/calculators.ts` | New — plain `fetch` (no auth token) to `POST /api/calculators/analyze`. Does not use existing auth helpers since the endpoint is public. Exports `AIAnalysis` interface. |

### OndoREBackend (Express)
| File | Action |
|------|--------|
| `src/routes/calculatorRoutes.ts` | New — registers POST route |
| `src/controllers/calculatorController.ts` | New — calls Haiku, returns JSON |
| `server.ts` / `server-hono.ts` | Register calculator routes |

---

## 7. Dependencies

### OndoREui — add
```
@react-pdf/renderer  ^4.x
```

### OndoREui — remove (after migration complete)
```
html2canvas
jspdf
```

No new backend dependencies — reuses existing `@anthropic-ai/sdk`.

---

## 8. Non-Goals (out of scope)
- Streaming AI responses (can add later)
- Persisting AI results to database
- User-specific personalization of AI prompts
- Amortization chart changes
- Any other calculator logic changes (math stays the same)

---

## 9. Success Criteria
- All 17 calculators show AI panel after calculation
- AI response p50 latency under 3 seconds (measured from button click to panel render, on a warm Haiku endpoint)
- Layout works on 375px mobile width without horizontal scroll
- PDF downloads include AI section when analysis is available
- PDF is readable on mobile browser at default zoom
- AI calls use Haiku model only (verified in backend logs)
- No regressions to existing calculator math
