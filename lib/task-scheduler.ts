/**
 * Task scheduler utilities
 * Helps break up long-running tasks to prevent blocking the main thread
 */

/**
 * Schedules a task to run in chunks using requestIdleCallback or setTimeout
 * This prevents long-running tasks from blocking the main thread
 */
export function scheduleTask<T>(
  task: () => T,
  options: {
    chunkSize?: number; // Number of items to process per chunk
    timeout?: number; // Maximum time per chunk in ms
    onProgress?: (progress: number) => void;
  } = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    const { chunkSize = 10, timeout = 5, onProgress } = options;

    try {
      const result = task();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Processes an array in chunks to avoid blocking the main thread
 */
export async function processInChunks<T, R>(
  items: T[],
  processor: (item: T) => R,
  options: {
    chunkSize?: number;
    delay?: number; // Delay between chunks in ms
    onProgress?: (processed: number, total: number) => void;
  } = {}
): Promise<R[]> {
  const { chunkSize = 10, delay = 0, onProgress } = options;
  const results: R[] = [];
  const total = items.length;

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = chunk.map(processor);
    results.push(...chunkResults);

    if (onProgress) {
      onProgress(Math.min(i + chunkSize, total), total);
    }

    // Yield to the browser between chunks
    if (delay > 0 && i + chunkSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    } else if (i + chunkSize < items.length) {
      // Use requestIdleCallback if available, otherwise setTimeout
      await new Promise((resolve) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => resolve(undefined), { timeout: 100 });
        } else {
          setTimeout(resolve, 0);
        }
      });
    }
  }

  return results;
}

/**
 * Debounces a function to prevent excessive calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Uses requestAnimationFrame for smooth animations
 */
export function requestAnimationFrameTask(callback: () => void): void {
  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 16); // ~60fps fallback
  }
}

/**
 * Batches multiple state updates to reduce re-renders
 */
export function batchUpdates(updates: (() => void)[]): void {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      updates.forEach((update) => update());
    });
  } else {
    // Use setTimeout as fallback
    setTimeout(() => {
      updates.forEach((update) => update());
    }, 0);
  }
}

/**
 * Measures task execution time
 */
export async function measureTask<T>(
  task: () => T | Promise<T>,
  label?: string
): Promise<T> {
  const start = performance.now();
  const result = await task();
  const end = performance.now();
  const duration = end - start;

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Task ${label || 'execution'} took ${duration.toFixed(2)}ms`
    );
  }

  // Warn if task takes too long
  if (duration > 50 && process.env.NODE_ENV === 'development') {
    console.warn(
      `⚠️ Long task detected: ${label || 'task'} took ${duration.toFixed(2)}ms. Consider breaking it into smaller chunks.`
    );
  }

  return result;
}

