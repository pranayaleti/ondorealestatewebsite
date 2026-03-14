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
