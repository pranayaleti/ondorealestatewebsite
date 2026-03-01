import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Ondo Platform",
    template: "%s | Ondo Platform",
  },
  description:
    "Startup-ready progressive web app experience for public browsing and role-based real estate operations.",
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <div className="container py-8">{children}</div>
}
