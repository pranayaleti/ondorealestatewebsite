const DEFAULT_BACKEND_BASE_URL = "https://ondorealestateserver.onrender.com"

/**
 * Base URL for the runtime backend used by the static export.
 * Keep this as a public env var so it works client-side.
 */
export const BACKEND_BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL

export function backendUrl(pathname: string) {
  const base = BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  return new URL(normalizedPath, base).toString()
}

