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
