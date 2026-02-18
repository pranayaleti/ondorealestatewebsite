import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
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
    it("appends and removes announcement element when window is defined", () => {
      vi.useFakeTimers()
      accessibility.announceToScreenReader("hello", "assertive")
      const live = document.querySelector('[aria-live="assertive"]')
      expect(live).toBeTruthy()
      expect(live?.textContent).toBe("hello")
      vi.advanceTimersByTime(1100)
      expect(document.querySelector('[aria-live="assertive"]')).toBeNull()
      vi.useRealTimers()
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
    it("trapFocus Tab cycles from last to first", () => {
      document.body.innerHTML = '<div id="c"><button id="b1">A</button><button id="b2">B</button></div>'
      const container = document.getElementById("c")!
      const [b1, b2] = [document.getElementById("b1")!, document.getElementById("b2")!]
      accessibility.focus.trapFocus(container)
      b2.focus()
      const e = new KeyboardEvent("keydown", { key: "Tab", bubbles: true })
      Object.defineProperty(e, "preventDefault", { value: vi.fn() })
      container.dispatchEvent(e)
      expect(document.activeElement?.id).toBe("b1")
    })
    it("trapFocus Shift+Tab cycles from first to last", () => {
      document.body.innerHTML = '<div id="c"><button id="b1">A</button><button id="b2">B</button></div>'
      const container = document.getElementById("c")!
      const [b1] = [document.getElementById("b1")!]
      accessibility.focus.trapFocus(container)
      b1.focus()
      const e = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true })
      Object.defineProperty(e, "preventDefault", { value: vi.fn() })
      container.dispatchEvent(e)
      expect(document.activeElement?.id).toBe("b2")
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
      const cb = vi.fn()
      const e = new KeyboardEvent("keydown", { key: "Enter" })
      accessibility.keyboard.handleActivation(e, cb)
      expect(cb).toHaveBeenCalledTimes(1)
    })
    it("handleActivation calls callback on Space", () => {
      const cb = vi.fn()
      const e = new KeyboardEvent("keydown", { key: " " })
      accessibility.keyboard.handleActivation(e, cb)
      expect(cb).toHaveBeenCalledTimes(1)
    })
    it("handleArrowNavigation horizontal ArrowRight", () => {
      document.body.innerHTML = '<div><button id="a">A</button><button id="b">B</button></div>'
      const items = Array.from(document.querySelectorAll("button"))
      const e = new KeyboardEvent("keydown", { key: "ArrowRight" })
      const idx = accessibility.keyboard.handleArrowNavigation(e, items, 0, "horizontal")
      expect(idx).toBe(1)
    })
    it("handleArrowNavigation returns currentIndex for other keys", () => {
      const items = [document.createElement("button")]
      const e = new KeyboardEvent("keydown", { key: "Escape" })
      const idx = accessibility.keyboard.handleArrowNavigation(e, items, 0, "vertical")
      expect(idx).toBe(0)
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
  it("formField includes aria-describedby when description and error provided", () => {
    const attrs = aria.formField("f1", "Label", "err", "desc")
    expect(attrs["aria-describedby"]).toContain("f1-description")
    expect(attrs["aria-describedby"]).toContain("f1-error")
  })
  it("formField aria-describedby undefined when no description or error", () => {
    const attrs = aria.formField("f2", "Label")
    expect(attrs["aria-describedby"]).toBeUndefined()
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
