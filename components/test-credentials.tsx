"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TestCredentialsProps {
  onFill: (email: string, password: string, role: "tenant" | "owner" | "admin") => void
}

export function TestCredentials({ onFill }: TestCredentialsProps) {
  const credentials = [
    {
      title: "Admin Account",
      email: "admin@ondorealestate.com",
      password: "ondo123",
      role: "Administrator" as const,
      loginRole: "admin" as const,
    },
    {
      title: "Tenant Account",
      email: "tenant@ondorealestate.com",
      password: "ondo123",
      role: "Tenant" as const,
      loginRole: "tenant" as const,
    },
    {
      title: "Owner Account",
      email: "owner@ondorealestate.com",
      password: "ondo123",
      role: "Owner" as const,
      loginRole: "owner" as const,
    },
  ]

  return (
    <div className="w-full space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary mb-1">Test Credentials</h3>
        <p className="text-sm text-foreground/70">Use these credentials to sign in for testing purposes</p>
      </div>

      {credentials.map((cred) => (
        <Card key={cred.title} className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{cred.title}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFill(cred.email, cred.password, cred.loginRole)}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Fill
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-foreground/70 w-20">Email:</span>
                <span className="text-foreground font-mono">{cred.email}</span>
              </div>
              <div className="flex">
                <span className="text-foreground/70 w-20">Password:</span>
                <span className="text-foreground font-mono">{cred.password}</span>
              </div>
              <div className="flex">
                <span className="text-foreground/70 w-20">Role:</span>
                <span className="text-foreground">{cred.role}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

