"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Calendar, CreditCard, Loader2 } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { backendUrl } from "@/lib/backend"
import { supabase } from "@/lib/supabase"
import { StripePaymentForm } from "@/components/stripe-payment-form"

export default function PaymentsPage() {
  const [paymentAmount, setPaymentAmount] = useState("1250.00")
  const [isCreatingIntent, setIsCreatingIntent] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const { toast } = useToast()

  const amountNumber = parseFloat(paymentAmount) || 0

  const handlePay = async () => {
    if (amountNumber < 0.5) {
      toast({ title: "Invalid amount", description: "Minimum payment is $0.50" })
      return
    }

    setIsCreatingIntent(true)
    try {
      const session = supabase ? (await supabase.auth.getSession()).data.session : null
      const token = session?.access_token ?? null

      const res = await fetch(backendUrl("/payments/create-payment-intent"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amountCents: Math.round(amountNumber * 100),
          paymentType: "rent",
          description: "Monthly Rent Payment",
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create payment")
      }

      setClientSecret(data.clientSecret)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment setup failed."
      toast({ title: "Error", description: message })
    } finally {
      setIsCreatingIntent(false)
    }
  }

  const handlePaymentSuccess = () => {
    setClientSecret(null)
    toast({
      title: "Payment successful",
      description: `Your payment of $${amountNumber.toFixed(2)} has been processed.`,
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <SEO
        title="Tenant Payments | Ondo Real Estate"
        description="Make rent payments, manage payment methods, and view payment history in the tenant portal."
        pathname="/tenant/payments"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Tenant", url: `${SITE_URL}/tenant` },
          { name: "Payments", url: `${SITE_URL}/tenant/payments` },
        ])}
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/tenant">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-foreground/70">Manage your rent payments and view payment history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Pay your rent securely via Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            {clientSecret ? (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
                  Paying <strong>${amountNumber.toFixed(2)}</strong> — enter your payment details below.
                </div>
                <StripePaymentForm
                  clientSecret={clientSecret}
                  amount={Math.round(amountNumber * 100)}
                  onSuccess={handlePaymentSuccess}
                  onError={(msg) => toast({ title: "Payment failed", description: msg })}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setClientSecret(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/70" />
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="pl-9"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handlePay}
                  disabled={isCreatingIntent}
                >
                  {isCreatingIntent ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparing payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ${amountNumber.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-foreground/50">
                  Payments are processed securely by Stripe. Your card details never touch our servers.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Current balance and upcoming payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Current Balance</span>
                <span className="font-medium">$1,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Due Date</span>
                <span className="font-medium">1st of each month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Status</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Payment Breakdown</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Base Rent</span>
                  <span>$1,200.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Utilities</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t mt-1">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">$1,250.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "May 1, 2023", ref: "#12458", amount: "$1,250.00" },
              { date: "April 1, 2023", ref: "#12345", amount: "$1,250.00" },
              { date: "March 1, 2023", ref: "#12234", amount: "$1,250.00" },
            ].map((payment) => (
              <div key={payment.ref} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-foreground/70" />
                  <div className="text-sm font-medium">{payment.date}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm">Monthly Rent - 123 Main St, Apt 4B</div>
                  <div className="text-xs text-foreground/70">Payment {payment.ref}</div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-muted text-green-800 hover:bg-muted">
                    Completed
                  </Badge>
                </div>
                <div className="text-sm font-medium text-right">{payment.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
