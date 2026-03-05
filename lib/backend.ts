const DEFAULT_BACKEND_BASE_URL = "https://lpklmquhxgbpavjngbby.supabase.co/functions/v1/api"

/**
 * Base URL for the runtime backend used by the static export.
 * Keep this as a public env var so it works client-side.
 * Points to the Supabase Edge Function — Supabase strips the /functions/v1/api prefix
 * before passing the request to Hono, so routes inside the function start at /.
 */
export const BACKEND_BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL

export function backendUrl(pathname: string) {
  const base = (BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL).replace(/\/$/, "")
  // Strip legacy /api prefix — the Edge Function is named "api" so that segment is already
  // consumed by Supabase routing. Routes inside Hono are at / (not /api/).
  const stripped = pathname.replace(/^\/api(?=\/|$)/, "")
  const path = stripped.startsWith("/") ? stripped : `/${stripped}`
  return `${base}${path}`
}

