import { describe, it, expect } from "vitest"
import type React from "react"
import {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  handleApiError,
  handleClientError,
  handleErrorBoundaryError,
  asyncHandler,
  withRetry,
  logError,
} from "./error-handler"

describe("error-handler", () => {
  describe("AppError", () => {
    it("sets message and statusCode", () => {
      const e = new AppError("test", 400)
      expect(e.message).toBe("test")
      expect(e.statusCode).toBe(400)
      expect(e.isOperational).toBe(true)
    })
  })

  describe("ValidationError", () => {
    it("extends AppError with 400", () => {
      const e = new ValidationError("invalid")
      expect(e.statusCode).toBe(400)
    })
  })

  describe("AuthenticationError", () => {
    it("default message and 401", () => {
      const e = new AuthenticationError()
      expect(e.statusCode).toBe(401)
    })
  })

  describe("AuthorizationError", () => {
    it("default message and 403", () => {
      const e = new AuthorizationError()
      expect(e.statusCode).toBe(403)
    })
  })

  describe("NotFoundError", () => {
    it("default message and 404", () => {
      const e = new NotFoundError()
      expect(e.statusCode).toBe(404)
    })
  })

  describe("ConflictError", () => {
    it("default message and 409", () => {
      const e = new ConflictError()
      expect(e.statusCode).toBe(409)
    })
  })

  describe("RateLimitError", () => {
    it("default message and 429", () => {
      const e = new RateLimitError()
      expect(e.statusCode).toBe(429)
    })
  })

  describe("handleApiError", () => {
    it("returns error info for AppError", () => {
      const result = handleApiError(new AppError("ops", 500))
      expect(result.error).toBe("ops")
      expect(result.statusCode).toBe(500)
    })
    it("returns validation failed for Zod-like error", () => {
      const result = handleApiError({ issues: [] })
      expect(result.error).toBe("Validation failed")
      expect(result.statusCode).toBe(400)
    })
    it("returns Prisma P2002 conflict", () => {
      const result = handleApiError({ code: "P2002" })
      expect(result.statusCode).toBe(409)
    })
    it("returns Prisma P2025 not found", () => {
      const result = handleApiError({ code: "P2025" })
      expect(result.statusCode).toBe(404)
    })
    it("returns generic for unknown error", () => {
      const result = handleApiError(new Error("random"))
      expect(result.statusCode).toBe(500)
    })
  })

  describe("handleClientError", () => {
    it("returns message for Error instance", () => {
      const result = handleClientError(new Error("client"))
      expect(result.message).toBe("client")
      expect(result.name).toBe("Error")
    })
    it("returns generic for non-Error", () => {
      const result = handleClientError("string")
      expect(result.message).toBe("An unexpected error occurred")
    })
  })

  describe("withRetry", () => {
    it("returns result on first success", async () => {
      const result = await withRetry(async () => "ok", 2, 10)
      expect(result).toBe("ok")
    })
    it("retries then throws after max", async () => {
      let calls = 0
      await expect(
        withRetry(
          async () => {
            calls++
            throw new Error("fail")
          },
          2,
          10
        )
      ).rejects.toThrow("fail")
      expect(calls).toBe(3)
    })
  })

  describe("handleErrorBoundaryError", () => {
    it("returns message and componentStack", () => {
      const err = new Error("boundary")
      const info = { componentStack: " at Component" }
      const result = handleErrorBoundaryError(err, info as React.ErrorInfo)
      expect(result.message).toBe("boundary")
      expect(result.componentStack).toBe(" at Component")
    })
  })

  describe("asyncHandler", () => {
    it("returns result when fn resolves", async () => {
      const fn = asyncHandler(async (x: number) => x + 1)
      await expect(fn(2)).resolves.toBe(3)
    })
    it("throws when fn rejects", async () => {
      const fn = asyncHandler(async () => {
        throw new AppError("ops", 500)
      })
      await expect(fn()).rejects.toBeDefined()
    })
  })

  describe("logError", () => {
    it("does not throw", () => {
      logError(new Error("test"), "context", { key: "value" })
    })
  })
})
