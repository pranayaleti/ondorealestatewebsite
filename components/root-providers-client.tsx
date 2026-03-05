"use client"

import dynamic from "next/dynamic"

const RootProviders = dynamic(
  () => import("@/components/root-providers").then((m) => ({ default: m.RootProviders })),
  { ssr: false, loading: () => null }
)

export function RootProvidersClient({ children }: { children: React.ReactNode }) {
  return <RootProviders>{children}</RootProviders>
}
