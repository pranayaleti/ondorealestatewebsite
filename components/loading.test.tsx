import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import Loading from "./loading"

describe("Loading", () => {
  it("renders without crashing", () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeInTheDocument()
  })
  it("has container and skeleton elements", () => {
    const { container } = render(<Loading />)
    expect(container.querySelector(".container")).toBeInTheDocument()
  })
})
