'use client';
import { useState, useEffect, useCallback } from 'react';
import { cacheGet, cacheSet, TTL } from './idb-cache';

interface Options {
  ttlMs?: number;
  skip?: boolean;
}

interface State<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useCachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: Options = {}
) {
  const { ttlMs = TTL.MEDIUM, skip = false } = options;
  const [state, setState] = useState<State<T>>({ data: null, loading: !skip, error: null });

  const load = useCallback(async (forceRefresh = false) => {
    if (skip) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      if (!forceRefresh) {
        const cached = await cacheGet<T>(key);
        if (cached !== null) {
          setState({ data: cached, loading: false, error: null });
          return;
        }
      }
      const fresh = await fetcher();
      await cacheSet(key, fresh, ttlMs);
      setState({ data: fresh, loading: false, error: null });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err instanceof Error ? err : new Error(String(err)) }));
    }
  }, [key, fetcher, ttlMs, skip]);

  useEffect(() => { load(); }, [load]);

  return { ...state, refresh: () => load(true) };
}
