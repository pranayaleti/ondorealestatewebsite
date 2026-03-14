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
