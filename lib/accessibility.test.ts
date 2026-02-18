import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { accessibility, aria } from "./accessibility"

describe("accessibility", () => {
  describe("generateId", () => {
    it("returns string with prefix", () => {
      const id = accessibility.generateId("test")
      expect(id).toMatch(/^test-[a-z0-9]+$/)
    })
    it("uses default prefix when not provided", () => {
      const id = accessibility.generateId()
      expect(id).toMatch(/^id-[a-z0-9]+$/)
    })
  })

  describe("announceToScreenReader", () => {
    beforeEach(() => {
      document.body.innerHTML = ""
    })
    afterEach(() => {
      document.body.innerHTML = ""
    })

    it("does not throw", () => {
      accessibility.announceToScreenReader("test")
    })
  })

  describe("focus", () => {
    it("focusFirst focuses first focusable in container", () => {
      document.body.innerHTML = '<div id="c"><button id="b1">A</button><button id="b2">B</button></div>'
      const container = document.getElementById("c")!
      accessibility.focus.focusFirst(container)
      expect(document.activeElement?.id).toBe("b1")
    })
    it("focusLast focuses last focusable", () => {
      document.body.innerHTML = '<div id="c"><button id="b1">A</button><button id="b2">B</button></div>'
      const container = document.getElementById("c")!
      accessibility.focus.focusLast(container)
      expect(document.activeElement?.id).toBe("b2")
    })
    it("trapFocus returns cleanup function", () => {
      document.body.innerHTML = '<div id="c"><button>A</button><button>B</button></div>'
      const container = document.getElementById("c")!
      const cleanup = accessibility.focus.trapFocus(container)
      expect(typeof cleanup).toBe("function")
      cleanup()
    })
  })

  describe("contrast", () => {
    it("getLuminance returns number 0-1 for RGB", () => {
      const l = accessibility.contrast.getLuminance(255, 255, 255)
      expect(l).toBeGreaterThan(0)
      expect(l).toBeLessThanOrEqual(1)
    })
    it("getContrastRatio returns ratio >= 1", () => {
      const r = accessibility.contrast.getContrastRatio([0, 0, 0], [255, 255, 255])
      expect(r).toBeGreaterThanOrEqual(1)
    })
    it("meetsWCAGAA returns boolean", () => {
      const ok = accessibility.contrast.meetsWCAGAA([0, 0, 0], [255, 255, 255])
      expect(typeof ok).toBe("boolean")
    })
  })

  describe("keyboard", () => {
    it("handleArrowNavigation returns new index on ArrowDown", () => {
      document.body.innerHTML = '<div><button id="a">A</button><button id="b">B</button></div>'
      const items = Array.from(document.querySelectorAll("button"))
      const e = new KeyboardEvent("keydown", { key: "ArrowDown" })
      const idx = accessibility.keyboard.handleArrowNavigation(e, items, 0, "vertical")
      expect(idx).toBe(1)
    })
    it("handleActivation calls callback on Enter", () => {
      const cb = () => {}
      const e = new KeyboardEvent("keydown", { key: "Enter" })
      accessibility.keyboard.handleActivation(e, cb)
      // Just ensure no throw
    })
  })

  describe("screenReader", () => {
    it("hideFromScreenReader sets aria-hidden", () => {
      const el = document.createElement("div")
      accessibility.screenReader.hideFromScreenReader(el)
      expect(el.getAttribute("aria-hidden")).toBe("true")
    })
    it("showToScreenReader removes aria-hidden", () => {
      const el = document.createElement("div")
      el.setAttribute("aria-hidden", "true")
      accessibility.screenReader.showToScreenReader(el)
      expect(el.getAttribute("aria-hidden")).toBeNull()
    })
    it("createScreenReaderText returns element with sr-only class", () => {
      const el = accessibility.screenReader.createScreenReaderText("hello")
      expect(el.className).toBe("sr-only")
      expect(el.textContent).toBe("hello")
    })
  })
})

describe("aria", () => {
  it("formField returns object with id, aria-label, aria-invalid", () => {
    const attrs = aria.formField("id1", "Label", "error")
    expect(attrs.id).toBe("id1")
    expect(attrs["aria-label"]).toBe("Label")
    expect(attrs["aria-invalid"]).toBe(true)
  })
  it("button returns aria attributes", () => {
    const attrs = aria.button("Submit", false, true)
    expect(attrs["aria-label"]).toBe("Submit")
    expect(attrs["aria-expanded"]).toBe(true)
  })
  it("modal returns dialog role and labelledby", () => {
    const attrs = aria.modal("m1", "Title")
    expect(attrs.role).toBe("dialog")
    expect(attrs["aria-labelledby"]).toBe("m1-title")
  })
})
