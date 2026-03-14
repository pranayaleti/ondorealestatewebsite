import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Health",
  description: "System health status",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
