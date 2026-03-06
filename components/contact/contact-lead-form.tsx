"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SITE_PHONE } from "@/lib/site"
import { submitContactLead, type ContactLeadSource } from "@/lib/leads-api"
import { CheckCircle, AlertCircle } from "lucide-react"

const DEFAULT_SOURCE: ContactLeadSource = "website"

export function ContactLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage(null)

    const result = await submitContactLead({
      name: formData.name.trim(),
      email: formData.email.trim(),
      ...(formData.phone.trim() && { phone: formData.phone.trim() }),
      ...(formData.message.trim() && { message: formData.message.trim() }),
      source: DEFAULT_SOURCE,
    })

    if ("error" in result) {
      setSubmitStatus("error")
      setErrorMessage(result.error)
    } else {
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
    }
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="dark:text-foreground">Get in touch</CardTitle>
        <CardDescription>
          Send us a message and we&apos;ll get back to you within one business day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
            <CheckCircle className="text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-700 dark:text-green-300 font-semibold">
                Message sent!
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                We&apos;ll be in touch within one business day.
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
            <AlertCircle className="text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300">
              {errorMessage ?? `Something went wrong. Please try again or call us at ${SITE_PHONE}.`}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name *</Label>
            <Input
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email *</Label>
            <Input
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              className="min-h-[120px]"
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="How can we help?"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2 inline-block" />
                Sending...
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
