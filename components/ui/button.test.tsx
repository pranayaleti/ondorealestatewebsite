import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button, buttonVariants } from "./button"

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })
  it("calls onClick when clicked", () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>OK</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  it("applies variant class via buttonVariants", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>)
    const btn = container.querySelector("button")
    expect(btn?.className).toContain("destructive")
  })
  it("applies size class", () => {
    const { container } = render(<Button size="lg">Large</Button>)
    const btn = container.querySelector("button")
    expect(btn?.className).toMatch(/lg|h-11/)
  })
  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})

describe("buttonVariants", () => {
  it("returns base classes for default", () => {
    const cn = buttonVariants()
    expect(cn).toContain("inline-flex")
  })
  it("accepts variant and size", () => {
    const cn = buttonVariants({ variant: "outline", size: "sm" })
    expect(cn).toBeTruthy()
  })
})
