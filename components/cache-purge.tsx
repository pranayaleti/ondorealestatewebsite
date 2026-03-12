'use client';
import { useEffect } from 'react';
import { cachePurgeExpired } from '@/lib/cache/idb-cache';

export function CachePurge() {
  useEffect(() => {
    cachePurgeExpired().catch(() => {}); // Fire and forget
  }, []);
  return null;
}
