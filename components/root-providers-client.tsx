"use client"

import type { ReactNode } from "react"
import { RootProviders } from "@/components/root-providers"

export function RootProvidersClient({ children }: { children: ReactNode }) {
  return <RootProviders>{children}</RootProviders>
}
