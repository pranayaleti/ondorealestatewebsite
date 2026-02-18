import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn (utils)", () => {
  it("merges single class", () => {
    expect(cn("foo")).toBe("foo")
  })
  it("merges multiple classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })
  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible")
  })
  it("handles tailwind conflict (last wins via twMerge)", () => {
    expect(cn("p-4", "p-2")).toBe("p-2")
  })
  it("handles undefined and null", () => {
    expect(cn("a", undefined, null, "b")).toBe("a b")
  })
})
