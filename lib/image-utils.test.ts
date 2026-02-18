import { describe, it, expect } from "vitest"
import { getOptimizedImagePath, getImageSrc } from "./image-utils"

describe("image-utils", () => {
  describe("getOptimizedImagePath", () => {
    it("returns original for non-png/jpg", () => {
      expect(getOptimizedImagePath("/img/photo.svg")).toBe("/img/photo.svg")
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
  })
})
