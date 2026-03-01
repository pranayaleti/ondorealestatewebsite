import { postJson } from "@/lib/api/http"
import type { PropertyInquiryPayload } from "@/lib/api/types"
import { enqueueSyncItem, triggerSync } from "@/lib/pwa/offline-queue"

interface SubmissionResult {
  queued: boolean
  success: boolean
}

export async function submitPropertyInquiry(payload: PropertyInquiryPayload): Promise<SubmissionResult> {
  const requestPayload = {
    ...payload,
    submittedAt: payload.submittedAt ?? new Date().toISOString(),
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    await enqueueSyncItem("propertyInquiry", "/api/leads/submit", requestPayload)
    await triggerSync("propertyInquiry")
    return { success: true, queued: true }
  }

  try {
    await postJson("/api/leads/submit", requestPayload)
    return { success: true, queued: false }
  } catch {
    await enqueueSyncItem("propertyInquiry", "/api/leads/submit", requestPayload)
    await triggerSync("propertyInquiry")
    return { success: true, queued: true }
  }
}
