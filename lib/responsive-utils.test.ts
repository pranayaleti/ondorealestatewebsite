import { describe, it, expect } from "vitest"
import {
  breakpoints,
  getCurrentBreakpoint,
  isBreakpoint,
  responsiveGrid,
  responsiveSpacing,
  responsiveTypography,
  responsiveVisibility,
  touchFriendly,
  mobileFirst,
  patterns,
  responsiveImages,
  responsiveForms,
} from "./responsive-utils"

describe("responsive-utils", () => {
  describe("breakpoints", () => {
    it("has xs through 2xl", () => {
      expect(breakpoints.xs).toBe(0)
      expect(breakpoints.sm).toBe(640)
      expect(breakpoints.md).toBe(768)
      expect(breakpoints.lg).toBe(1024)
      expect(breakpoints.xl).toBe(1280)
      expect(breakpoints["2xl"]).toBe(1536)
    })
  })

  describe("getCurrentBreakpoint", () => {
    it("returns 2xl for width >= 1536", () => {
      expect(getCurrentBreakpoint(1536)).toBe("2xl")
      expect(getCurrentBreakpoint(2000)).toBe("2xl")
    })
    it("returns xl for width >= 1280 and < 1536", () => {
      expect(getCurrentBreakpoint(1280)).toBe("xl")
      expect(getCurrentBreakpoint(1400)).toBe("xl")
    })
    it("returns lg for width >= 1024 and < 1280", () => {
      expect(getCurrentBreakpoint(1024)).toBe("lg")
    })
    it("returns md for width >= 768 and < 1024", () => {
      expect(getCurrentBreakpoint(768)).toBe("md")
    })
    it("returns sm for width >= 640 and < 768", () => {
      expect(getCurrentBreakpoint(640)).toBe("sm")
    })
    it("returns xs for width < 640", () => {
      expect(getCurrentBreakpoint(0)).toBe("xs")
      expect(getCurrentBreakpoint(639)).toBe("xs")
    })
  })

  describe("isBreakpoint", () => {
    it("returns true when width >= breakpoint", () => {
      expect(isBreakpoint("md", 768)).toBe(true)
      expect(isBreakpoint("md", 1000)).toBe(true)
    })
    it("returns false when width < breakpoint", () => {
      expect(isBreakpoint("md", 767)).toBe(false)
    })
  })

  describe("responsiveGrid", () => {
    it("getGridCols returns classes for cols", () => {
      const out = responsiveGrid.getGridCols({ xs: 1, md: 2 })
      expect(out).toContain("grid-cols-1")
      expect(out).toContain("md:grid-cols-2")
    })
    it("getGap returns gap classes", () => {
      const out = responsiveGrid.getGap({ xs: 4, lg: 6 })
      expect(out).toContain("gap-4")
      expect(out).toContain("lg:gap-6")
    })
  })

  describe("responsiveSpacing", () => {
    it("getPadding returns padding classes", () => {
      const out = responsiveSpacing.getPadding({ xs: 2, sm: 4 })
      expect(out).toContain("p-2")
      expect(out).toContain("sm:p-4")
    })
    it("getMargin returns margin classes", () => {
      const out = responsiveSpacing.getMargin({ xs: 1 })
      expect(out).toContain("m-1")
    })
  })

  describe("responsiveTypography", () => {
    it("getTextSize returns text size classes", () => {
      const out = responsiveTypography.getTextSize({ xs: "sm", md: "lg" })
      expect(out).toContain("text-sm")
      expect(out).toContain("md:text-lg")
    })
    it("getFontWeight returns font weight classes", () => {
      const out = responsiveTypography.getFontWeight({ xs: "bold" })
      expect(out).toContain("font-bold")
    })
  })

  describe("responsiveVisibility", () => {
    it("getVisibility returns hide/show classes", () => {
      const out = responsiveVisibility.getVisibility({ xs: "show", md: "hide" })
      expect(out).toContain("block")
      expect(out).toContain("md:hidden")
    })
    it("getVisibility xs hide returns hidden", () => {
      const out = responsiveVisibility.getVisibility({ xs: "hide" })
      expect(out).toContain("hidden")
    })
  })

  describe("touchFriendly", () => {
    it("has minTouchTarget and button styles", () => {
      expect(touchFriendly.minTouchTarget).toContain("44px")
      expect(touchFriendly.button).toBeDefined()
      expect(touchFriendly.input).toBeDefined()
    })
  })

  describe("mobileFirst", () => {
    it("has container and cardGrid", () => {
      expect(mobileFirst.container).toContain("container")
      expect(mobileFirst.cardGrid).toContain("grid")
    })
  })

  describe("patterns", () => {
    it("has hero, card, form, nav, footer", () => {
      expect(patterns.hero).toBeDefined()
      expect(patterns.card).toBeDefined()
      expect(patterns.form).toBeDefined()
      expect(patterns.nav).toBeDefined()
      expect(patterns.footer).toBeDefined()
    })
  })

  describe("responsiveImages", () => {
    it("has container, image, aspectRatio", () => {
      expect(responsiveImages.container).toBeDefined()
      expect(responsiveImages.image).toBeDefined()
      expect(responsiveImages.aspectRatio.square).toBe("aspect-square")
      expect(responsiveImages.aspectRatio.video).toBe("aspect-video")
    })
  })

  describe("responsiveForms", () => {
    it("has field, row, buttons, label, input", () => {
      expect(responsiveForms.field).toBeDefined()
      expect(responsiveForms.row).toContain("grid")
      expect(responsiveForms.buttons).toBeDefined()
      expect(responsiveForms.label).toBeDefined()
      expect(responsiveForms.input).toBeDefined()
    })
  })
})
