import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { getOptimizedImagePath, getImageSrc } from "./image-utils"

describe("image-utils", () => {
  describe("getOptimizedImagePath", () => {
    it("returns original for non-png/jpg", () => {
      expect(getOptimizedImagePath("/img/photo.svg")).toBe("/img/photo.svg")
    })
    it("returns webp path for png/jpg on server (window undefined)", () => {
      const orig = globalThis.window
      try {
        ;(globalThis as { window?: unknown }).window = undefined
        expect(getOptimizedImagePath("/img/photo.png")).toBe("/img/photo.webp")
        expect(getOptimizedImagePath("/img/photo.jpg")).toBe("/img/photo.webp")
      } finally {
        ;(globalThis as { window: unknown }).window = orig
      }
    })
    it("returns webp or original on client depending on canvas webp support", () => {
      const orig = document.createElement
      document.createElement = ((tag: string) => {
        const el = orig.call(document, tag) as HTMLElement
        if (tag === "canvas") {
          ;(el as HTMLCanvasElement).toDataURL = vi.fn((type: string) =>
            type === "image/webp" ? "data:image/webp;base64," : "data:image/png;base64,"
          )
        }
        return el
      }) as typeof document.createElement
      expect(getOptimizedImagePath("/img/photo.png")).toBe("/img/photo.webp")
      document.createElement = orig
    })
  })

  describe("getImageSrc", () => {
    it("returns webp for known image names", () => {
      expect(getImageSrc("/modern-office-building.png")).toContain("webp")
      expect(getImageSrc("/founder-image.jpg")).toContain("webp")
    })
    it("returns original when not in hasWebP list", () => {
      expect(getImageSrc("/unknown-image.png")).toBe("/unknown-image.png")
    })
    it("handles path with directory", () => {
      expect(getImageSrc("/images/modern-office-building.png")).toContain("webp")
    })
  })
})
