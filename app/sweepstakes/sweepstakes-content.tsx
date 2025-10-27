"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SweepstakesForm } from "@/components/sweepstakes-form"

function SweepstakesContentInner() {
  const searchParams = useSearchParams()
  const refCode = searchParams?.get('ref') || undefined

  return <SweepstakesForm initialReferralCode={refCode} />
}

export function SweepstakesContent() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      <SweepstakesContentInner />
    </Suspense>
  )
}

