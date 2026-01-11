"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IconCreditCard, IconSparkles, IconDownload, IconReceipt, IconCalendar, IconBolt } from "@tabler/icons-react"

export default function BillingPage() {
  const currentPlan = {
    name: "Pro Package",
    price: 49,
    tokens: "Unlimited",
    nextBilling: "Dec 15, 2026",
    status: "Active"
  }

  const paymentHistory = [
    {
      id: "INV-001",
      date: "Nov 15, 2026",
      amount: 49,
      status: "Paid",
      description: "Pro Package - Monthly"
    },
    {
      id: "INV-002",
      date: "Oct 15, 2026",
      amount: 49,
      status: "Paid",
      description: "Pro Package - Monthly"
    },
    {
      id: "INV-003",
      date: "Sep 15, 2026",
      amount: 49,
      status: "Paid",
      description: "Pro Package - Monthly"
    }
  ]

  const tokenUsage = {
    used: 1250,
    total: "Unlimited",
    percentage: 0 // Unlimited, so 0%
  }

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
                    <IconSparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Billing & Payments</h1>
                    <p className="text-muted-foreground mt-1">
                      Manage your subscription, payment methods, and billing history
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
                  {/* Current Plan & Usage */}
                  <div className="space-y-6">
                    {/* Current Subscription */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconCreditCard className="h-5 w-5" />
                          Current Subscription
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{currentPlan.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              ${currentPlan.price}/month • {currentPlan.tokens} tokens
                            </p>
                          </div>
                          <Badge variant={currentPlan.status === "Active" ? "default" : "secondary"}>
                            {currentPlan.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Next billing date</span>
                            <span className="font-medium">{currentPlan.nextBilling}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Payment method</span>
                            <span className="font-medium">•••• •••• •••• 4242</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Button variant="outline" className="w-full" asChild>
                            <a href="/pricing">Change Plan</a>
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => alert("⏸️ Subscription paused")}>
                            Pause Subscription
                          </Button>
                          <Button variant="destructive" className="w-full" onClick={() => {
                            if (confirm("⚠️ Are you sure you want to cancel your subscription?")) {
                              alert("😢 Subscription cancelled")
                            }
                          }}>
                            Cancel Subscription
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Token Usage */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconBolt className="h-5 w-5" />
                          Token Usage
                        </CardTitle>
                        <CardDescription>
                          Your AI request usage this month
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Used this month</span>
                            <span className="font-semibold">
                              {tokenUsage.used.toLocaleString()} requests
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Monthly limit</span>
                            <span className="font-semibold text-primary">
                              {tokenUsage.total}
                            </span>
                          </div>

                          {tokenUsage.total !== "Unlimited" && (
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${tokenUsage.percentage}%` }}
                              />
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground">
                            🔥 You're crushing it! Keep creating amazing content.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payment History & Methods */}
                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>
                          Manage your saved payment methods
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 12/26</p>
                            </div>
                          </div>
                          <Badge>Primary</Badge>
                        </div>

                        <div className="space-y-2">
                          <Button variant="outline" className="w-full" onClick={() => alert("💳 Add new card form would open")}>
                            Add Payment Method
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => alert("🔄 Update billing info form would open")}>
                            Update Billing Address
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Billing History */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconReceipt className="h-5 w-5" />
                          Billing History
                        </CardTitle>
                        <CardDescription>
                          View and download your past invoices
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {paymentHistory.map((invoice) => (
                            <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <IconReceipt className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{invoice.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {invoice.date} • {invoice.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${invoice.amount}</p>
                                <Button variant="ghost" size="sm" onClick={() => alert(`📄 Downloading ${invoice.id}...`)}>
                                  <IconDownload className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button variant="outline" className="w-full mt-4" onClick={() => alert("📧 All invoices sent to your email!")}>
                          Email All Invoices
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Billing Address */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconCalendar className="h-5 w-5" />
                          Billing Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">
                            123 Content Creator St<br />
                            Los Angeles, CA 90210<br />
                            United States
                          </p>
                        </div>

                        <Button variant="outline" className="w-full mt-4" onClick={() => alert("✏️ Edit address form would open")}>
                          Update Address
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
