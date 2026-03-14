# AI-Enhanced Calculators Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Claude Haiku AI analysis (deal score + market context + recommendations) to all 17 real estate calculators, with mobile-responsive side-by-side layout and upgraded PDF export.

**Architecture:** A new public `POST /api/calculators/analyze` endpoint in OndoREBackend calls Claude Haiku and returns structured JSON (`dealScore`, `scoreLabel`, `marketContext`, `recommendations`). The frontend calls this via a shared hook triggered by a "Get AI Analysis" button in the results panel. All 17 calculators are updated to a responsive two-panel layout and use `@react-pdf/renderer` for PDF export.

**Tech Stack:** Express + Zod + Anthropic SDK (backend); React + Next.js Pages Router + Vitest + @react-pdf/renderer (frontend); Claude Haiku (`claude-haiku-4-5-20251001`)

---

## Chunk 1: Backend — Calculator AI Endpoint

### Task 1: Add env flag and rate limiter

**Files:**
- Modify: `OndoREBackend/src/config/env.ts`
- Modify: `OndoREBackend/src/middleware/rateLimitMiddleware.ts`

- [ ] **Step 1: Add `ENABLE_CALCULATOR_AI` to env schema**

In `OndoREBackend/src/config/env.ts`, add to the `envSchema` object after the `ANTHROPIC_API_KEY` line:

```typescript
  // Optional — Calculator AI (Haiku). Defaults off; set to "true" to enable.
  ENABLE_CALCULATOR_AI: z.enum(["true", "false"]).optional().default("false"),
  ANTHROPIC_CALCULATOR_MODEL: z.string().optional().default("claude-haiku-4-5-20251001"),
```

- [ ] **Step 2: Add `calculatorAiLimiter` to rate limit middleware**

In `OndoREBackend/src/middleware/rateLimitMiddleware.ts`, append after the `assistantChatLimiter` export:

```typescript
/**
 * Rate limit for public calculator AI endpoint.
 * Permissive for public users; API key stays server-side.
 */
export const calculatorAiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20 * devMultiplier,
  message: "Too many analysis requests. Please try again in a minute.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: clientIp,
});
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend
git add src/config/env.ts src/middleware/rateLimitMiddleware.ts
git commit -m "feat: add ENABLE_CALCULATOR_AI env flag and calculator AI rate limiter"
```

---

### Task 2: Calculator controller

**Files:**
- Create: `OndoREBackend/src/controllers/calculatorController.ts`

- [ ] **Step 1: Create the controller**

Create `OndoREBackend/src/controllers/calculatorController.ts`:

```typescript
import { Request, Response } from 'express';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env';
import logger from '../utils/logger';

const CALCULATOR_TYPES = [
  'roi', 'mortgage', 'cap-rate', 'cash-on-cash', 'dscr', 'grm',
  'fifty-percent', 'one-percent', 'affordability', 'buying-power',
  'closing-cost', 'home-sale', 'income', 'refinance', 'rent-vs-own',
  'retirement', 'temporary-buydown',
] as const;

const PROPERTY_TYPES = ['Single Family', 'Multi-Family', 'Condo', 'Commercial'] as const;

const analyzeSchema = z.object({
  calculatorType: z.enum(CALCULATOR_TYPES),
  inputs: z.record(z.unknown()),
  results: z.record(z.unknown()),
  location: z.string().max(100).optional(),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
});

function getScoreLabel(score: number): 'Strong Buy' | 'Caution' | 'Pass' {
  if (score >= 70) return 'Strong Buy';
  if (score >= 40) return 'Caution';
  return 'Pass';
}

function buildSystemPrompt(calculatorType: string): string {
  const prompts: Record<string, string> = {
    'roi': 'You analyze real estate ROI calculations. Key metrics: annualROI, totalROI, cashOnCashReturn, annualCashFlow.',
    'mortgage': 'You analyze mortgage payment calculations. Key metrics: monthlyPayment, totalInterest, loanToValue.',
    'cap-rate': 'You analyze capitalization rate calculations. Key metrics: capRate, netOperatingIncome, grossRentalIncome.',
    'cash-on-cash': 'You analyze cash-on-cash return calculations. Key metrics: cashOnCashReturn, annualCashFlow, totalCashInvested.',
    'dscr': 'You analyze debt service coverage ratio calculations. Key metrics: dscr, netOperatingIncome, annualDebtService.',
    'grm': 'You analyze gross rent multiplier calculations. Key metrics: grm, annualRent, propertyValue.',
    'fifty-percent': 'You analyze the 50% rule for rental properties. Key metrics: estimatedExpenses, netOperatingIncome, monthlyRent.',
    'one-percent': 'You analyze the 1% rule for rental properties. Key metrics: onePercentCheck, monthlyRent, purchasePrice.',
    'affordability': 'You analyze home affordability. Key metrics: maxAffordablePrice, monthlyPayment, debtToIncomeRatio.',
    'buying-power': 'You analyze buying power. Key metrics: maximumLoanAmount, estimatedPurchasePrice, monthlyPayment.',
    'closing-cost': 'You analyze closing costs. Key metrics: totalClosingCosts, lenderFees, titleFees.',
    'home-sale': 'You analyze home sale profit. Key metrics: netProceeds, agentCommission, totalCosts.',
    'income': 'You analyze income qualification for mortgages. Key metrics: requiredIncome, frontEndRatio, backEndRatio.',
    'refinance': 'You analyze mortgage refinance scenarios. Key metrics: monthlySavings, breakEvenMonths, totalSavings.',
    'rent-vs-own': 'You analyze rent vs. own scenarios. Key metrics: fiveYearRentCost, fiveYearOwnCost, breakEvenYear.',
    'retirement': 'You analyze retirement savings with real estate. Key metrics: projectedValue, monthlyContribution, returnRate.',
    'temporary-buydown': 'You analyze temporary rate buydown costs and savings. Key metrics: buydownCost, monthlySavings, breakEvenMonths.',
  };
  return prompts[calculatorType] ?? 'You analyze real estate financial calculations.';
}

export async function analyzeCalculator(req: Request, res: Response): Promise<void> {
  if (env.ENABLE_CALCULATOR_AI !== 'true') {
    res.status(503).json({ message: 'Calculator AI analysis is not enabled.' });
    return;
  }

  if (!env.ANTHROPIC_API_KEY) {
    res.status(503).json({ message: 'AI analysis is not configured.' });
    return;
  }

  let validated: z.infer<typeof analyzeSchema>;
  try {
    validated = analyzeSchema.parse(req.body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: err.errors });
      return;
    }
    throw err;
  }

  const { calculatorType, inputs, results, location, propertyType } = validated;

  const locationCtx = location ? `Location: ${location}. ` : '';
  const typeCtx = propertyType ? `Property type: ${propertyType}. ` : '';

  const userMessage = `${locationCtx}${typeCtx}
Calculator inputs: ${JSON.stringify(inputs, null, 2)}
Calculated results: ${JSON.stringify(results, null, 2)}

Respond with ONLY valid JSON (no markdown, no prose):
{
  "dealScore": <integer 0-100>,
  "marketContext": "<1-3 sentences about how these numbers compare to typical market ranges>",
  "recommendations": ["<actionable advice 1>", "<actionable advice 2>", "<actionable advice 3>"]
}`;

  try {
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: env.ANTHROPIC_CALCULATOR_MODEL,
      max_tokens: 400,
      system: `You are a real estate investment analyst. ${buildSystemPrompt(calculatorType)} Be concise and specific. Focus on whether numbers are good, average, or poor for the market. Give 2-4 actionable recommendations. Score deals 0-100 where 70+ is Strong Buy, 40-69 is Caution, 0-39 is Pass.`,
      messages: [{ role: 'user', content: userMessage }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    let parsed: { dealScore: number; marketContext: string; recommendations: string[] };
    try {
      parsed = JSON.parse(text);
    } catch {
      logger.warn('Calculator AI returned non-JSON response', { calculatorType, text });
      res.status(502).json({ message: 'AI returned an unexpected response format.' });
      return;
    }

    const dealScore = Math.min(100, Math.max(0, Math.round(parsed.dealScore ?? 50)));
    res.json({
      dealScore,
      scoreLabel: getScoreLabel(dealScore),
      marketContext: parsed.marketContext ?? '',
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 4) : [],
    });
  } catch (err) {
    logger.error('Calculator AI analysis failed', { err, calculatorType });
    res.status(500).json({ message: 'AI analysis failed. Please try again.' });
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend
git add src/controllers/calculatorController.ts
git commit -m "feat: add calculatorController with Haiku AI analysis"
```

---

### Task 3: Calculator route and server registration

**Files:**
- Create: `OndoREBackend/src/routes/calculatorRoutes.ts`
- Modify: `OndoREBackend/server.ts`

- [ ] **Step 1: Create the route file**

Create `OndoREBackend/src/routes/calculatorRoutes.ts`:

```typescript
import { Router } from 'express';
import { calculatorAiLimiter } from '../middleware/rateLimitMiddleware';
import * as calculatorController from '../controllers/calculatorController';

const router = Router();

// Public endpoint — no auth required. Rate-limited per IP.
router.post('/analyze', calculatorAiLimiter, calculatorController.analyzeCalculator);

export default router;
```

- [ ] **Step 2: Register route in server.ts AND server-hono.ts**

In `OndoREBackend/server.ts`, add the import alongside the other route imports (after the `vendorRoutes` import line):

```typescript
import calculatorRoutes from "./src/routes/calculatorRoutes";
```

Then, add the route registration alongside the other `app.use` calls (after the vendor routes registration):

```typescript
app.use("/api/calculators", calculatorRoutes);
```

In `OndoREBackend/server-hono.ts`, add the same import and registration in the equivalent positions (after the vendorRoutes import and registration). The pattern is identical — import then `expressApp.use("/api/calculators", calculatorRoutes)`.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify the disabled-flag path via unit import**

Rather than starting a full HTTP server, verify the guard logic by importing the controller directly:

```bash
cd /Users/pranay/Documents/RE/OndoREBackend && npx ts-node -e "
process.env.ENABLE_CALCULATOR_AI = 'false';
process.env.JWT_SECRET = 'test-secret-minimum-32-characters-long';
process.env.SUPABASE_URL = 'https://placeholder.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'placeholder';
import('./src/controllers/calculatorController').then(m => {
  const mockRes = { status: (c: number) => ({ json: (b: unknown) => console.log('Status:', c, JSON.stringify(b)) }) };
  m.analyzeCalculator({} as any, mockRes as any);
});
" 2>/dev/null
```

Expected output: `Status: 503 {"message":"Calculator AI analysis is not enabled."}`

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend
git add src/routes/calculatorRoutes.ts server.ts server-hono.ts
git commit -m "feat: register public POST /api/calculators/analyze route"
```

---

## Chunk 2: Frontend Foundation

### Task 4: Extend Vitest config to include hooks directory

**Files:**
- Modify: `OndoREui/vitest.config.ts`

- [ ] **Step 1: Add hooks to vitest include list**

In `OndoREui/vitest.config.ts`, change the `include` array:

```typescript
// Before:
include: ["lib/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}"],
// After:
include: ["lib/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}", "hooks/**/*.test.{ts,tsx}"],
```

Also update the `coverage.include` array:
```typescript
// Before:
include: ["lib/**/*.ts", "lib/**/*.tsx", "components/**/*.ts", "components/**/*.tsx"],
// After:
include: ["lib/**/*.ts", "lib/**/*.tsx", "components/**/*.ts", "components/**/*.tsx", "hooks/**/*.ts", "hooks/**/*.tsx"],
```

- [ ] **Step 2: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add vitest.config.ts
git commit -m "chore: add hooks/ to vitest include and coverage paths"
```

---

### Task 5: API module and AIAnalysis type

**Files:**
- Create: `OndoREui/lib/api/calculators.ts`
- Create: `OndoREui/lib/api/calculators.test.ts`

- [ ] **Step 1: Write the failing test**

Create `OndoREui/lib/api/calculators.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeCalculator } from './calculators';

describe('analyzeCalculator', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('posts to /api/calculators/analyze and returns AIAnalysis', async () => {
    const mockResponse = {
      dealScore: 82,
      scoreLabel: 'Strong Buy',
      marketContext: 'Above market average.',
      recommendations: ['Negotiate price down 5%'],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await analyzeCalculator({
      calculatorType: 'roi',
      inputs: { purchasePrice: 450000 },
      results: { capRate: 8.4 },
      location: 'Austin, TX',
      propertyType: 'Single Family',
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/calculators/analyze'),
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.dealScore).toBe(82);
    expect(result.scoreLabel).toBe('Strong Buy');
  });

  it('throws with server message when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'AI analysis is not configured.' }),
    } as Response);

    await expect(
      analyzeCalculator({ calculatorType: 'roi', inputs: {}, results: {} })
    ).rejects.toThrow('AI analysis is not configured.');
  });

  it('threads the AbortSignal through to fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ dealScore: 50, scoreLabel: 'Caution', marketContext: '', recommendations: [] }),
    } as Response);

    const controller = new AbortController();
    await analyzeCalculator({ calculatorType: 'roi', inputs: {}, results: {} }, controller.signal);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal: controller.signal })
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run lib/api/calculators.test.ts
```

Expected: FAIL — `analyzeCalculator` not found.

- [ ] **Step 3: Create the API module**

Create `OndoREui/lib/api/calculators.ts`:

```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000';

export interface AIAnalysis {
  dealScore: number;
  scoreLabel: 'Strong Buy' | 'Caution' | 'Pass';
  marketContext: string;
  recommendations: string[];
}

export interface AnalyzeRequest {
  calculatorType: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  location?: string;
  propertyType?: string;
}

export async function analyzeCalculator(
  params: AnalyzeRequest,
  signal?: AbortSignal
): Promise<AIAnalysis> {
  const res = await fetch(`${BACKEND_URL}/api/calculators/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    signal,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? 'AI analysis failed');
  }

  return data as AIAnalysis;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run lib/api/calculators.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add lib/api/calculators.ts lib/api/calculators.test.ts
git commit -m "feat: add analyzeCalculator API module with AIAnalysis type"
```

---

### Task 6: Shared AI hook

**Files:**
- Create: `OndoREui/hooks/useCalculatorAI.ts`
- Create: `OndoREui/hooks/useCalculatorAI.test.ts`

- [ ] **Step 1: Write the failing test**

Create `OndoREui/hooks/useCalculatorAI.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculatorAI } from './useCalculatorAI';
import * as calculatorsApi from '../lib/api/calculators';

vi.mock('../lib/api/calculators');

const mockAnalysis = {
  dealScore: 75,
  scoreLabel: 'Strong Buy' as const,
  marketContext: 'Above market.',
  recommendations: ['Lower price'],
};

describe('useCalculatorAI', () => {
  beforeEach(() => vi.resetAllMocks());

  it('starts with null data and not loading', () => {
    const { result } = renderHook(() =>
      useCalculatorAI({ calculatorType: 'roi', inputs: {}, results: {} })
    );
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetches analysis when analyze() is called', async () => {
    vi.mocked(calculatorsApi.analyzeCalculator).mockResolvedValue(mockAnalysis);

    const { result } = renderHook(() =>
      useCalculatorAI({ calculatorType: 'roi', inputs: { purchasePrice: 450000 }, results: { capRate: 8.4 } })
    );

    await act(async () => { result.current.analyze(); });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockAnalysis);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    vi.mocked(calculatorsApi.analyzeCalculator).mockRejectedValue(new Error('AI failed'));

    const { result } = renderHook(() =>
      useCalculatorAI({ calculatorType: 'roi', inputs: {}, results: {} })
    );

    await act(async () => { result.current.analyze(); });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('AI failed');
  });

  it('does not fire if primary inputs are zero', async () => {
    const spy = vi.mocked(calculatorsApi.analyzeCalculator);

    const { result } = renderHook(() =>
      useCalculatorAI({ calculatorType: 'roi', inputs: { purchasePrice: 0 }, results: {} })
    );

    await act(async () => { result.current.analyze(); });

    expect(spy).not.toHaveBeenCalled();
    expect(result.current.error).toContain('Enter values');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run hooks/useCalculatorAI.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create the hook**

Create `OndoREui/hooks/useCalculatorAI.ts`:

```typescript
import { useState, useCallback, useRef } from 'react';
import { analyzeCalculator, AIAnalysis, AnalyzeRequest } from '../lib/api/calculators';

interface UseCalculatorAIResult {
  data: AIAnalysis | null;
  loading: boolean;
  error: string | null;
  analyze: () => void;
}

function hasNonZeroInputs(inputs: Record<string, unknown>): boolean {
  return Object.values(inputs).some(
    (v) => typeof v === 'number' && v > 0
  );
}

export function useCalculatorAI(params: AnalyzeRequest): UseCalculatorAIResult {
  const [data, setData] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const analyze = useCallback(() => {
    if (!hasNonZeroInputs(params.inputs)) {
      setError('Enter values before requesting AI analysis.');
      return;
    }

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    analyzeCalculator(params, controller.signal)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setError(err.message ?? 'AI analysis failed.');
        setLoading(false);
      });
  }, [params.calculatorType, params.location, params.propertyType,
      JSON.stringify(params.inputs), JSON.stringify(params.results)]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, analyze };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run hooks/useCalculatorAI.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add hooks/useCalculatorAI.ts hooks/useCalculatorAI.test.ts
git commit -m "feat: add useCalculatorAI hook with explicit analyze() trigger"
```

---

### Task 7: AIInsightsPanel component

**Files:**
- Create: `OndoREui/components/calculators/AIInsightsPanel.tsx`
- Create: `OndoREui/components/calculators/AIInsightsPanel.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `OndoREui/components/calculators/AIInsightsPanel.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AIInsightsPanel } from './AIInsightsPanel';

const mockAnalysis = {
  dealScore: 82,
  scoreLabel: 'Strong Buy' as const,
  marketContext: 'Cap rate exceeds market average.',
  recommendations: ['Negotiate price to $432K', 'DSCR qualifies for DSCR loans'],
};

describe('AIInsightsPanel', () => {
  it('renders nothing when no data, no loading, no error', () => {
    const { container } = render(
      <AIInsightsPanel analysis={null} loading={false} error={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders skeleton when loading', () => {
    render(<AIInsightsPanel analysis={null} loading={true} error={null} />);
    expect(screen.getByTestId('ai-panel-skeleton')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<AIInsightsPanel analysis={null} loading={false} error="AI failed" />);
    expect(screen.getByText(/AI analysis unavailable/i)).toBeInTheDocument();
  });

  it('renders deal score and label', () => {
    render(<AIInsightsPanel analysis={mockAnalysis} loading={false} error={null} />);
    expect(screen.getByText('82 / 100')).toBeInTheDocument();
    expect(screen.getByText(/Strong Buy/)).toBeInTheDocument();
  });

  it('renders market context', () => {
    render(<AIInsightsPanel analysis={mockAnalysis} loading={false} error={null} />);
    expect(screen.getByText(/Cap rate exceeds market average/)).toBeInTheDocument();
  });

  it('renders all recommendations', () => {
    render(<AIInsightsPanel analysis={mockAnalysis} loading={false} error={null} />);
    expect(screen.getByText(/Negotiate price/)).toBeInTheDocument();
    expect(screen.getByText(/DSCR qualifies/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run components/calculators/AIInsightsPanel.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create the component**

Create `OndoREui/components/calculators/AIInsightsPanel.tsx`:

```typescript
import React from 'react';
import { AIAnalysis } from '@/lib/api/calculators';

interface Props {
  analysis: AIAnalysis | null;
  loading: boolean;
  error: string | null;
}

const SCORE_COLORS: Record<string, string> = {
  'Strong Buy': 'bg-green-500 text-white',
  'Caution': 'bg-yellow-500 text-white',
  'Pass': 'bg-red-500 text-white',
};

export function AIInsightsPanel({ analysis, loading, error }: Props) {
  if (!analysis && !loading && !error) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-foreground">🤖 AI Analysis</span>
        {analysis && (
          <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${SCORE_COLORS[analysis.scoreLabel] ?? ''}`}>
            {analysis.scoreLabel} · {analysis.dealScore}
          </span>
        )}
      </div>

      {loading && (
        <div data-testid="ai-panel-skeleton" className="space-y-2 animate-pulse">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-11/12" />
          <div className="h-2 bg-muted rounded w-3/4 mt-3" />
          <div className="h-2 bg-muted rounded w-4/5" />
          <div className="h-2 bg-muted rounded w-2/3" />
        </div>
      )}

      {error && !loading && (
        <p className="text-sm text-muted-foreground">AI analysis unavailable.</p>
      )}

      {analysis && !loading && (
        <>
          {/* Score bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Deal Score</span>
              <span className="font-semibold text-foreground">{analysis.dealScore} / 100</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${analysis.dealScore}%`,
                  background: analysis.dealScore >= 70
                    ? 'linear-gradient(90deg, #16a34a, #22c55e)'
                    : analysis.dealScore >= 40
                    ? 'linear-gradient(90deg, #ca8a04, #eab308)'
                    : 'linear-gradient(90deg, #dc2626, #ef4444)',
                }}
              />
            </div>
          </div>

          {/* Market context */}
          {analysis.marketContext && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Market Context</p>
              <p className="text-sm text-foreground leading-relaxed">{analysis.marketContext}</p>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Recommendations</p>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-1.5">
                    <span className="text-accent shrink-0">·</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run components/calculators/AIInsightsPanel.test.tsx
```

Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add components/calculators/AIInsightsPanel.tsx components/calculators/AIInsightsPanel.test.tsx
git commit -m "feat: add AIInsightsPanel component with score bar and recommendations"
```

---

### Task 8: Install @react-pdf/renderer and create PDF component

**Files:**
- Create: `OndoREui/components/calculators/CalculatorPDFDocument.tsx`

- [ ] **Step 1: Install dependency**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npm install @react-pdf/renderer
```

Expected: package added, no peer-dependency errors.

- [ ] **Step 2: Create the PDF document component**

Create `OndoREui/components/calculators/CalculatorPDFDocument.tsx`:

```typescript
import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Font,
} from '@react-pdf/renderer';
import { AIAnalysis } from '@/lib/api/calculators';

interface PDFProps {
  calculatorType: string;
  title: string;
  inputs: Record<string, string>;
  results: Record<string, string>;
  analysis?: AIAnalysis;
  location?: string;
  generatedAt: Date;
}

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', padding: 32 },
  header: { backgroundColor: '#111827', padding: 16, marginBottom: 16, borderRadius: 4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brandText: { color: '#f97316', fontSize: 10, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  titleText: { color: '#f9fafb', fontSize: 9, fontFamily: 'Helvetica-Bold', marginTop: 2 },
  subText: { color: '#6b7280', fontSize: 7, marginTop: 2 },
  scoreBadge: { backgroundColor: '#f97316', borderRadius: 8, padding: '3 8' },
  scoreBadgeNum: { color: '#ffffff', fontSize: 14, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
  scoreBadgeLabel: { color: '#fed7aa', fontSize: 7, textAlign: 'center' },
  scoreBarBg: { backgroundColor: '#1f2937', height: 5, borderRadius: 3, marginTop: 10 },
  scoreBarFill: { height: 5, borderRadius: 3 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  metricCell: { width: '47%', border: '1 solid #fed7aa', borderRadius: 4, padding: 6 },
  metricLabel: { color: '#9ca3af', fontSize: 7, marginBottom: 2 },
  metricValue: { color: '#111827', fontSize: 13, fontFamily: 'Helvetica-Bold' },
  metricSub: { color: '#f97316', fontSize: 7 },
  aiSection: { borderLeft: '3 solid #f97316', backgroundColor: '#fff7ed', padding: '8 10', marginBottom: 12, borderRadius: '0 4 4 0' },
  aiLabel: { color: '#f97316', fontSize: 8, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  aiText: { color: '#374151', fontSize: 8, lineHeight: 1.5, marginBottom: 5 },
  aiBullet: { color: '#374151', fontSize: 7.5, lineHeight: 1.6, marginBottom: 1 },
  inputSection: { borderTop: '1 solid #e5e7eb', paddingTop: 8 },
  inputLabel: { color: '#9ca3af', fontSize: 7, marginBottom: 4, textTransform: 'uppercase' },
  inputPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  inputPill: { backgroundColor: '#f3f4f6', borderRadius: 3, padding: '2 6' },
  inputPillText: { color: '#374151', fontSize: 7 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 6, borderTop: '1 solid #e5e7eb' },
  footerBrand: { color: '#f97316', fontSize: 8, fontFamily: 'Helvetica-Bold' },
  footerMuted: { color: '#9ca3af', fontSize: 7 },
  sectionLabel: { color: '#6b7280', fontSize: 7, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
});

function scoreBarColor(score: number): string {
  if (score >= 70) return '#16a34a';
  if (score >= 40) return '#ca8a04';
  return '#dc2626';
}

export function CalculatorPDFDocument({
  calculatorType: _calculatorType, title, inputs, results, analysis, location, generatedAt,
}: PDFProps) {
  const dateStr = generatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const locationStr = [location].filter(Boolean).join(' · ');
  const subline = [locationStr, dateStr].filter(Boolean).join(' · ');

  const resultEntries = Object.entries(results);
  const inputEntries = Object.entries(inputs);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.brandText}>ONDO</Text>
              <Text style={styles.titleText}>{title}</Text>
              {subline ? <Text style={styles.subText}>{subline}</Text> : null}
            </View>
            {analysis && (
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeNum}>{analysis.dealScore}</Text>
                <Text style={styles.scoreBadgeLabel}>{analysis.scoreLabel}</Text>
              </View>
            )}
          </View>
          {analysis && (
            <View style={styles.scoreBarBg}>
              <View style={[styles.scoreBarFill, {
                width: `${analysis.dealScore}%`,
                backgroundColor: scoreBarColor(analysis.dealScore),
              }]} />
            </View>
          )}
        </View>

        {/* Metrics grid — first 4 results */}
        {resultEntries.length > 0 && (
          <View>
            <Text style={styles.sectionLabel}>Results</Text>
            <View style={styles.metricsGrid}>
              {resultEntries.slice(0, 4).map(([label, value]) => (
                <View key={label} style={styles.metricCell}>
                  <Text style={styles.metricLabel}>{label.toUpperCase()}</Text>
                  <Text style={styles.metricValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* AI Analysis */}
        {analysis && (
          <View style={styles.aiSection}>
            <Text style={styles.aiLabel}>🤖 AI Analysis — Powered by Claude</Text>
            {analysis.marketContext ? <Text style={styles.aiText}>{analysis.marketContext}</Text> : null}
            {analysis.recommendations.map((rec, i) => (
              <Text key={i} style={styles.aiBullet}>· {rec}</Text>
            ))}
          </View>
        )}

        {/* Input summary */}
        {inputEntries.length > 0 && (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Inputs</Text>
            <View style={styles.inputPills}>
              {inputEntries.map(([label, value]) => (
                <View key={label} style={styles.inputPill}>
                  <Text style={styles.inputPillText}>{label}: {value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>ondo.com</Text>
          <Text style={styles.footerMuted}>AI analysis by Claude Haiku</Text>
        </View>
      </Page>
    </Document>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add components/calculators/CalculatorPDFDocument.tsx package.json package-lock.json
git commit -m "feat: add CalculatorPDFDocument with Ondo branding and AI section"
```

---

## Chunk 3: Apply to All 17 Calculators

**Overview:** Each calculator page gets the same treatment:
1. Add `location` (text) and `propertyType` (select) optional state fields
2. Layout is already `grid-cols-1 lg:grid-cols-2` in most calculators — left panel = inputs, right panel = results
3. Wire `useCalculatorAI` — AI trigger is a **dedicated "Get AI Analysis" button** in the results panel (separate from any auto-calculation that happens via useEffect). This is intentional: calculators auto-calculate math on input change; AI is triggered explicitly to avoid wasting Haiku budget.
4. Add optional location/propertyType inputs + "Get AI Analysis" button at bottom of the results panel
5. Add `<AIInsightsPanel>` below the button
6. Replace `html2canvas + jsPDF` PDF download with `<PDFDownloadLink>` using `<CalculatorPDFDocument>`

The ROI calculator is the **reference implementation** (Task 9). Tasks 9–24 follow the exact same pattern — read what the calculator calculates, map inputs/results, apply the pattern.

---

### Task 9: ROI Calculator — reference implementation

**Files:**
- Modify: `OndoREui/pages/calculators/roi-calculator.tsx`

- [ ] **Step 1: Add location/propertyType state**

In the `ROICalculator` component, add two new state fields after the existing `results` state:

```typescript
const [location, setLocation] = useState('');
const [propertyType, setPropertyType] = useState('');
```

- [ ] **Step 2: Wire the AI hook**

Add after the state declarations:

```typescript
const { data: aiAnalysis, loading: aiLoading, error: aiError, analyze } = useCalculatorAI({
  calculatorType: 'roi',
  inputs: formData as unknown as Record<string, unknown>,
  results: results as unknown as Record<string, unknown> ?? {},
  location: location || undefined,
  propertyType: propertyType || undefined,
});
```

Add the import at the top:
```typescript
import { useCalculatorAI } from '@/hooks/useCalculatorAI';
import { AIInsightsPanel } from '@/components/calculators/AIInsightsPanel';
import dynamic from 'next/dynamic';
import { CalculatorPDFDocument } from '@/components/calculators/CalculatorPDFDocument';
import type { AIAnalysis } from '@/lib/api/calculators';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFDownloadLink),
  { ssr: false }
);
```

- [ ] **Step 3: Restructure the outer layout**

The outer grid `grid grid-cols-1 lg:grid-cols-2 gap-8` (line ~213) stays — it's already the right structure. The left panel holds inputs, the right panel holds results. Update the right panel card to also contain the `<AIInsightsPanel>` and PDF button.

Find the results section (the second `bg-card rounded-lg shadow-lg p-6` block) and add at the bottom of that block, after all existing result items:

```tsx
{/* Optional inputs for AI context */}
<div className="mt-6 pt-6 border-t border-border space-y-3">
  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI Context (optional)</p>
  <input
    type="text"
    placeholder="Location, e.g. Austin, TX"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none"
  />
  <select
    value={propertyType}
    onChange={(e) => setPropertyType(e.target.value)}
    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none"
  >
    <option value="">Property type (optional)</option>
    <option>Single Family</option>
    <option>Multi-Family</option>
    <option>Condo</option>
    <option>Commercial</option>
  </select>
  <button
    onClick={() => { calculateROI(); analyze(); }}
    className="w-full py-2 text-sm font-semibold rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
  >
    Get AI Analysis
  </button>
</div>

<AIInsightsPanel analysis={aiAnalysis} loading={aiLoading} error={aiError} />

{/* PDF Download */}
{results && (
  <div className="mt-4">
    <PDFDownloadLink
      document={
        <CalculatorPDFDocument
          calculatorType="roi"
          title="ROI Investment Report"
          inputs={{
            'Purchase Price': `$${formData.purchasePrice.toLocaleString()}`,
            'Monthly Rent': `$${formData.monthlyRent.toLocaleString()}`,
            'Down Payment': `$${formData.downPayment.toLocaleString()}`,
            'Interest Rate': `${formData.interestRate}%`,
            'Loan Term': `${formData.loanTerm} years`,
          }}
          results={{
            'Total ROI': `${results.totalROI.toFixed(2)}%`,
            'Annual ROI': `${results.annualROI.toFixed(2)}%`,
            'Cash-on-Cash': `${results.cashOnCashReturn.toFixed(2)}%`,
            'Annual Cash Flow': `$${results.annualCashFlow.toFixed(0)}`,
          }}
          analysis={aiAnalysis ?? undefined}
          location={location || undefined}
          generatedAt={new Date()}
        />
      }
      fileName="ondo-roi-report.pdf"
    >
      {({ loading: pdfLoading }) => (
        <button
          disabled={pdfLoading}
          className="w-full py-2 text-sm font-medium rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
        >
          {pdfLoading ? 'Generating PDF…' : '⬇ Download PDF Report'}
        </button>
      )}
    </PDFDownloadLink>
  </div>
)}
```

- [ ] **Step 4: Remove old html2canvas/jsPDF imports and downloadPDF function**

Remove any `import html2canvas` and `import jsPDF` lines and any `downloadPDF` function from the file.

- [ ] **Step 5: Verify the page compiles**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Smoke test in browser**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npm run dev
```

Open http://localhost:3000/calculators/roi-calculator. Verify:
- Layout is two columns on wide screen, single column on narrow
- "Get AI Analysis" button appears
- Clicking it shows a loading skeleton, then AI panel with score + context + recommendations
- "Download PDF Report" button appears; clicking generates a PDF with the AI section

- [ ] **Step 7: Commit**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add pages/calculators/roi-calculator.tsx
git commit -m "feat(roi): add AI analysis panel and PDF export with Ondo branding"
```

---

### Tasks 10–25: Remaining 16 Calculators

Apply the same pattern from Task 8 to each remaining calculator. For each file:
- Add `location` / `propertyType` state
- Add `useCalculatorAI` hook with the correct `calculatorType` string (see table below)
- Add optional AI context inputs + "Get AI Analysis" button at bottom of inputs or results panel
- Add `<AIInsightsPanel>`
- Replace old PDF download with `<PDFDownloadLink>` + `<CalculatorPDFDocument>` — map the calculator's key inputs and results to human-readable labels

**Calculator type mapping:**

| File | calculatorType | title | Key results to map |
|------|---------------|-------|-------------------|
| `mortgage-payment-calculator.tsx` | `mortgage` | Mortgage Payment Report | Monthly Payment, Total Interest, Total Cost |
| `cap-rate-calculator.tsx` | `cap-rate` | Cap Rate Report | Cap Rate, NOI, Gross Income |
| `cash-on-cash-calculator.tsx` | `cash-on-cash` | Cash-on-Cash Return Report | COC Return, Annual Cash Flow, Cash Invested |
| `dscr-calculator.tsx` | `dscr` | DSCR Analysis Report | DSCR, NOI, Annual Debt Service |
| `grm-calculator.tsx` | `grm` | Gross Rent Multiplier Report | GRM, Annual Rent, Property Value |
| `fifty-percent-rule-calculator.tsx` | `fifty-percent` | 50% Rule Analysis | Estimated Expenses, NOI, Monthly Rent |
| `one-percent-rule-calculator.tsx` | `one-percent` | 1% Rule Check | 1% Threshold, Monthly Rent, Purchase Price |
| `affordability-calculator.tsx` | `affordability` | Affordability Report | Max Price, Monthly Payment, DTI |
| `buying-power-calculator.tsx` | `buying-power` | Buying Power Report | Max Loan, Est. Purchase Price, Payment |
| `closing-cost-calculator.tsx` | `closing-cost` | Closing Cost Report | Total Costs, Lender Fees, Title Fees |
| `home-sale-calculator.tsx` | `home-sale` | Home Sale Profit Report | Net Proceeds, Commission, Total Costs |
| `income-calculator.tsx` | `income` | Income Qualification Report | Required Income, Front-End Ratio, Back-End |
| `refinance-calculator.tsx` | `refinance` | Refinance Analysis Report | Monthly Savings, Break-Even Months, Total Savings |
| `rent-vs-own-calculator.tsx` | `rent-vs-own` | Rent vs. Own Report | 5yr Rent Cost, 5yr Own Cost, Break-Even Year |
| `retirement-calculator.tsx` | `retirement` | Retirement Savings Report | Projected Value, Monthly Contribution, Return Rate |
| `temporary-buydown-calculator.tsx` | `temporary-buydown` | Buydown Analysis Report | Buydown Cost, Monthly Savings, Break-Even |

**For each calculator:**

- [ ] Read the file to identify: (a) the results state object keys, (b) the key formData fields
- [ ] Add the same 5 additions as Task 8 (state, hook, optional inputs UI, AIInsightsPanel, PDFDownloadLink)
- [ ] Remove old html2canvas/jsPDF code if present
- [ ] Run `npx tsc --noEmit` — fix any type errors
- [ ] Commit:
  ```bash
  git add pages/calculators/<filename>.tsx
  git commit -m "feat(<calc-name>): add AI analysis panel and PDF export"
  ```

Repeat for each of the 16 files. Do them one at a time, committing after each.

---

## Final Verification

- [ ] **Run all frontend tests**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx vitest run
```

Expected: all tests pass.

- [ ] **TypeScript clean on both repos**

```bash
cd /Users/pranay/Documents/RE/OndoREui && npx tsc --noEmit
cd /Users/pranay/Documents/RE/OndoREBackend && npx tsc --noEmit
```

Expected: no errors in either.

- [ ] **Start backend with AI enabled**

```bash
cd /Users/pranay/Documents/RE/OndoREBackend
ENABLE_CALCULATOR_AI=true ANTHROPIC_API_KEY=<your-key> npm run dev
```

Expected: server starts on port 3000, no startup errors.

- [ ] **Verify Haiku model in backend logs**

After clicking "Get AI Analysis" on any calculator, check backend console output for a log line containing `claude-haiku-4-5-20251001`. The controller logs the model via the `ANTHROPIC_CALCULATOR_MODEL` env var. Confirm no Sonnet or Opus model appears in calculator-related requests.

- [ ] **End-to-end smoke test**

With backend running and frontend on `npm run dev` (http://localhost:3000):
1. Open 5 calculators across categories (e.g. roi, mortgage, affordability, retirement, dscr) — verify two-panel layout renders on desktop
2. Resize browser to 375px width — verify inputs stack above results, AI accordion is collapsed
3. Click "Get AI Analysis" on each of the 5 — verify AI panel appears with score, market context, and at least 2 recommendations
4. Download PDF from one calculator with AI analysis — verify AI section present and text is crisp (not a blurry screenshot)
5. Download PDF from one calculator without clicking "Get AI Analysis" — verify PDF generates cleanly without the AI section

- [ ] **Final commit (stage only calculator pages)**

```bash
cd /Users/pranay/Documents/RE/OndoREui
git add pages/calculators/
git commit -m "feat: complete AI calculator enhancement — all 17 calculators"
```
