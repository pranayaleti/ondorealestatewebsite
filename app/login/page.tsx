import { redirect } from "next/navigation"

/**
 * /login is linked to from external sources (emails, old bookmarks, header CTA).
 * The canonical auth page lives at /auth — redirect permanently.
 */
export default function LoginRedirect() {
  redirect("/auth")
}
