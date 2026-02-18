import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  scheduleTask,
  processInChunks,
  debounce,
  throttle,
  requestAnimationFrameTask,
  batchUpdates,
  measureTask,
} from "./task-scheduler"

describe("task-scheduler", () => {
  describe("scheduleTask", () => {
    it("resolves with task return value", async () => {
      const result = await scheduleTask(() => 42)
      expect(result).toBe(42)
    })
    it("rejects when task throws", async () => {
      await expect(
        scheduleTask(() => {
          throw new Error("fail")
        })
      ).rejects.toThrow("fail")
    })
  })

  describe("processInChunks", () => {
    it("processes all items", async () => {
      const items = [1, 2, 3, 4, 5]
      const out = await processInChunks(items, (x) => x * 2)
      expect(out).toEqual([2, 4, 6, 8, 10])
    })
    it("calls onProgress", async () => {
      const progress: number[] = []
      await processInChunks([1, 2, 3], (x) => x, {
        chunkSize: 2,
        onProgress: (p) => progress.push(p),
      })
      expect(progress.length).toBeGreaterThan(0)
    })
  })

  describe("debounce", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it("invokes function after wait", () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced()
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe("throttle", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it("invokes immediately then blocks", () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      throttled()
      expect(fn).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(100)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe("requestAnimationFrameTask", () => {
    it("calls callback", () => {
      const fn = vi.fn()
      requestAnimationFrameTask(fn)
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(fn).toHaveBeenCalled()
          resolve()
        }, 20)
      })
    })
  })

  describe("batchUpdates", () => {
    it("calls all updates", () => {
      const a = vi.fn()
      const b = vi.fn()
      batchUpdates([a, b])
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(a).toHaveBeenCalled()
          expect(b).toHaveBeenCalled()
          resolve()
        }, 10)
      })
    })
  })

  describe("measureTask", () => {
    it("returns task result", async () => {
      const result = await measureTask(async () => "ok")
      expect(result).toBe("ok")
    })
  })
})
