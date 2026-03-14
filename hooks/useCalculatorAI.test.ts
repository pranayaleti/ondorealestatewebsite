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
