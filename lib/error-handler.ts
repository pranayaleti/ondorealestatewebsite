// Error handling utilities

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Insufficient permissions") {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Resource conflict") {
    super(message, 409)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Rate limit exceeded") {
    super(message, 429)
  }
}

// Error handler for API routes
export const handleApiError = (error: unknown) => {
  console.error("API Error:", error)

  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
      isOperational: error.isOperational,
    }
  }

  // Handle Zod validation errors
  if (error && typeof error === "object" && "issues" in error) {
    return {
      error: "Validation failed",
      statusCode: 400,
      details: (error as any).issues,
    }
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as any
    switch (prismaError.code) {
      case "P2002":
        return {
          error: "A record with this information already exists",
          statusCode: 409,
        }
      case "P2025":
        return {
          error: "Record not found",
          statusCode: 404,
        }
      default:
        return {
          error: "Database error occurred",
          statusCode: 500,
        }
    }
  }

  // Generic error
  return {
    error: "An unexpected error occurred",
    statusCode: 500,
  }
}

// Client-side error handler
export const handleClientError = (error: unknown, context?: string) => {
  console.error(`Client Error${context ? ` in ${context}` : ""}:`, error)

  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    }
  }

  return {
    message: "An unexpected error occurred",
    name: "UnknownError",
  }
}

// Error boundary error handler
export const handleErrorBoundaryError = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error("Error Boundary caught an error:", error, errorInfo)

  // In production, you might want to send this to an error reporting service
  if (process.env.NODE_ENV === "production") {
    // Example: send to Sentry, LogRocket, etc.
    // Sentry.captureException(error, { extra: errorInfo })
  }

  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
  }
}

// Async error wrapper
export const asyncHandler = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      throw handleApiError(error)
    }
  }
}

// Retry mechanism for failed requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (i === maxRetries) {
        throw lastError
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }

  throw lastError!
}

// Error logging utility
export const logError = (error: unknown, context?: string, metadata?: Record<string, any>) => {
  const errorInfo = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context,
    metadata,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  }

  console.error("Error logged:", errorInfo)

  // In production, send to monitoring service
  if (process.env.NODE_ENV === "production") {
    // Example: send to monitoring service
    // monitoringService.captureException(error, errorInfo)
  }
}

export default {
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
}
