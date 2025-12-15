"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { useAuth } from "@/lib/auth-context"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams?.get("type") || "tenant"
  const { login } = useAuth()

  const [activeTab, setActiveTab] = useState<string>(userType)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Basic validation
    if (!email?.trim()) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    if (!password?.trim()) {
      setError("Please enter your password")
      setIsLoading(false)
      return
    }

    const result = await login(email.trim(), password, type as "tenant" | "owner" | "admin")

    if (result.success) {
      // Redirect based on user role
      if (type === "owner" || type === "admin") {
        router.push("/dashboard")
      } else {
        router.push("/properties")
      }
    } else {
      setError(result.error || "Login failed. Please check your credentials and try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Sign In | OnDo Real Estate"
        description="Sign in to continue to your tenant or owner portal."
        pathname="/auth"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Auth", url: `${SITE_URL}/auth` },
        ])}
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to <span className="text-primary">OnDo</span> Real Estate</CardTitle>
          <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tenant">Tenant</TabsTrigger>
              <TabsTrigger value="owner">Property Owner</TabsTrigger>
            </TabsList>
            <TabsContent value="tenant">
              <form onSubmit={(e) => handleLogin(e, "tenant")}>
                <div className="grid gap-4">
                  {error && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-email">Email</Label>
                    <Input
                      id="tenant-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      disabled={isLoading}
                      aria-describedby="tenant-email-error"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tenant-password">Password</Label>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="tenant-password"
                      name="password"
                      type="password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="owner">
              <form onSubmit={(e) => handleLogin(e, "owner")}>
                <div className="grid gap-4">
                  {error && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="owner-email">Email</Label>
                    <Input
                      id="owner-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="owner-password">Password</Label>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="owner-password"
                      name="password"
                      type="password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          {/* Sign up is currently disabled
          <p className="text-center text-sm text-foreground/70">
            Don't have an account?{" "}
            <Link href="/auth?type=owner" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          */}
          <div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
