"use client"

import dynamic from "next/dynamic"

const PushNotificationPrompt = dynamic(
  () => import("@/components/notifications/push-notification-prompt"),
  { ssr: false },
)

export default function PushNotificationPromptLoader() {
  return <PushNotificationPrompt />
}
