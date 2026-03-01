import { postJson } from "@/lib/api/http"
import type { MaintenanceRequestPayload } from "@/lib/api/types"
import { enqueueSyncItem, triggerSync } from "@/lib/pwa/offline-queue"

interface SubmissionResult {
  queued: boolean
  success: boolean
}

export async function submitMaintenanceRequest(
  payload: MaintenanceRequestPayload
): Promise<SubmissionResult> {
  const requestPayload = {
    ...payload,
    submittedAt: payload.submittedAt ?? new Date().toISOString(),
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    await enqueueSyncItem("maintenanceRequest", "/api/leads/submit", {
      ...requestPayload,
      type: "maintenance_request",
    })
    await triggerSync("maintenanceRequest")
    return { success: true, queued: true }
  }

  try {
    await postJson("/api/leads/submit", { ...requestPayload, type: "maintenance_request" })
    return { success: true, queued: false }
  } catch {
    await enqueueSyncItem("maintenanceRequest", "/api/leads/submit", {
      ...requestPayload,
      type: "maintenance_request",
    })
    await triggerSync("maintenanceRequest")
    return { success: true, queued: true }
  }
}
