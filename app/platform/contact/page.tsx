"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitPropertyInquiry } from "@/lib/api/inquiries"

export default function PlatformContactPage() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await submitPropertyInquiry({
      propertyId: "general-contact",
      fullName: formState.fullName,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
    })

    setStatusMessage(
      result.queued ? "Saved offline and queued for sync." : "Message delivered successfully."
    )
    setFormState({ fullName: "", email: "", phone: "", message: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Agent</CardTitle>
        <CardDescription>This form supports offline draft + background sync submissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="contact-name">Full Name</Label>
            <Input
              id="contact-name"
              value={formState.fullName}
              onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              value={formState.phone}
              onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={formState.message}
              onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
            />
          </div>
          <Button type="submit">Send Message</Button>
          {statusMessage ? <p className="text-sm text-foreground/80">{statusMessage}</p> : null}
        </form>
      </CardContent>
    </Card>
  )
}
