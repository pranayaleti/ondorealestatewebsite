"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import SEO from "@/components/seo"
import { SITE_URL } from "@/lib/site"
import { generateBreadcrumbJsonLd } from "@/lib/seo"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background dark:bg-transparent">
      <SEO
        title="Error | OnDo Real Estate"
        description="An unexpected error occurred. Please try again or return home."
        pathname="/error"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Error", url: `${SITE_URL}/error` },
        ])}
      />
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl">Something went wrong!</CardTitle>
          <CardDescription>We apologize for the inconvenience. An unexpected error has occurred.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-center">
          <p>Error code: {error.digest}</p>
          <p className="mt-2">Please try again or contact support if the problem persists.</p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button variant="outline" onClick={reset}>
            Try Again
          </Button>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
