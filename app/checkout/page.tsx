"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, Sparkles, Zap, Shield, Check } from "lucide-react"

const plans = {
  free: {
    name: "Free Package",
    price: 0,
    tokens: 100,
    period: "month",
    features: ["Basic AI trend analysis", "Simple content calendar", "Creator community access"]
  },
  pro: {
    name: "Pro Package",
    price: 49,
    tokens: "Unlimited",
    period: "month",
    features: ["Advanced AI trend analysis", "Unlimited content calendar", "Pro video editing tools", "Creator workflow automation", "Priority support"]
  },
  "mini-boost": {
    name: "Mini Boost",
    price: 9,
    tokens: 500,
    period: "one-time",
    features: ["500 extra tokens", "Instant activation", "Never expires"]
  },
  "creator-pack": {
    name: "Creator Pack",
    price: 19,
    tokens: 1200,
    period: "one-time",
    features: ["1,200 extra tokens", "Instant activation", "Never expires"]
  },
  "power-pack": {
    name: "Power Pack",
    price: 39,
    tokens: 3000,
    period: "one-time",
    features: ["3,000 extra tokens", "Instant activation", "Never expires"]
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan") || "free"

  const selectedPlan = plans[plan as keyof typeof plans] || plans.free

  return (
    <SidebarProvider className="sidebar-vars">
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
    <div className="flex flex-1 flex-col bg-linear-to-br from-background via-background to-muted/20">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="px-4 lg:px-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
                    <p className="text-muted-foreground mt-1">
                      Complete your purchase securely
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
                  {/* Order Summary */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          Order Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{selectedPlan.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedPlan.period === "month" ? "Monthly subscription" : "One-time purchase"}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              ${selectedPlan.price}
                              {selectedPlan.period === "month" && <span className="text-sm font-normal">/mo</span>}
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              <strong>{selectedPlan.tokens}</strong> {typeof selectedPlan.tokens === 'number' ? 'tokens included' : 'tokens'}
                            </span>
                          </div>
                          <div className="ml-6 space-y-1">
                            {selectedPlan.features.map((feature, index) => (
                              <div key={index} className="text-sm text-muted-foreground flex items-center gap-1">
                                <Check className="h-3 w-3 text-green-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-xl">
                            ${selectedPlan.price}
                            {selectedPlan.period === "month" && <span className="text-sm font-normal">/month</span>}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Security Badges */}
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        SSL Encrypted
                      </div>
                      <div className="flex items-center gap-1">
                        <Lock className="h-4 w-4" />
                        Secure Payment
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Information
                      </CardTitle>
                      <CardDescription>
                        Enter your payment details to complete the purchase
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedPlan.period === "month" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-renew" />
                          <Label htmlFor="auto-renew" className="text-sm">
                            Automatically renew subscription monthly
                          </Label>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <a href="/policies" className="text-primary hover:underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/policies" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full" size="lg">
                          💳 Pay with Card - ${selectedPlan.price}
                          {selectedPlan.period === "month" && "/month"}
                        </Button>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or pay with</span>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-paypal hover:bg-paypal-hover text-white"
                          size="lg"
                          onClick={() => {
                            // Mock PayPal integration
                            alert(`🎉 Mock PayPal payment successful!\n\nPlan: ${selectedPlan.name}\nAmount: $${selectedPlan.price}${selectedPlan.period === "month" ? "/month" : ""}\n\nYour tokens will be added to your account instantly!`)
                            // In real implementation, this would redirect to PayPal
                          }}
                        >
                          🅿️ PayPal - ${selectedPlan.price}
                          {selectedPlan.period === "month" && "/month"}
                        </Button>
                      </div>

                      <p className="text-xs text-center text-muted-foreground">
                        🔒 Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
