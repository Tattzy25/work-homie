"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap } from "lucide-react"

export default function Page() {
  return (
    <SidebarProvider className="sidebar-vars">
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-gradient-to-br from-background via-background to-muted/20">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="px-4 lg:px-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
                    <p className="text-muted-foreground mt-1">
                      Choose the perfect plan for your content creation needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                  {/* Free Plan */}
                  <Card className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Free Package</CardTitle>
                        <Badge variant="secondary">Popular</Badge>
                      </div>
                      <CardDescription>
                        Perfect for getting started with basic content creation tools.
                      </CardDescription>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">💰 What's Included:</h4>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="font-medium">100 FREE tokens to start</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            🚀 Use tokens for AI analysis, content creation, and trend insights
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            💡 1 token = 1 AI request (like asking for trend analysis or content ideas)
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">✨ Features:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Basic AI trend analysis 📈
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Simple content calendar 📅
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Creator community access 👥
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" asChild>
                        <a href="/checkout?plan=free">Get Started Free</a>
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Pro Plan */}
                  <Card className="relative border-primary">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">Pro Package</CardTitle>
                      <CardDescription>
                        Unlock the full power of AI-driven content creation.
                      </CardDescription>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$49</span>
                        <span className="text-muted-foreground">flat rate</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">💰 What's Included:</h4>
                        <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="font-medium text-primary">UNLIMITED tokens 🔥</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            🚀 Go wild with AI - unlimited trend analysis, content ideas, and viral predictions
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            💡 1 token = 1 AI request (same as free plan)
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">🚀 Everything in Free, plus:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Advanced AI trend analysis 📈
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Unlimited content calendar 📅
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Pro video editing tools 🎥
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Creator workflow automation 🤖
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Priority support 💬
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a href="/checkout?plan=pro">Upgrade to Pro</a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="px-4 lg:px-6">
                <div className="max-w-6xl mx-auto mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">📊 Plan Comparison</h2>
                    <p className="text-muted-foreground">See exactly what you get with each plan</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left font-semibold">Plan</th>
                          <th className="border border-border p-4 text-center font-semibold">Price</th>
                          <th className="border border-border p-4 text-center font-semibold">Tokens Included</th>
                          <th className="border border-border p-4 text-center font-semibold">AI Requests</th>
                          <th className="border border-border p-4 text-center font-semibold">Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 font-medium">Free Package</td>
                          <td className="border border-border p-4 text-center">$0/month</td>
                          <td className="border border-border p-4 text-center">100</td>
                          <td className="border border-border p-4 text-center">100 AI requests</td>
                          <td className="border border-border p-4 text-sm">Basic tools, community access</td>
                        </tr>
                        <tr className="bg-primary/5">
                          <td className="border border-border p-4 font-medium text-primary">Pro Package 🔥</td>
                          <td className="border border-border p-4 text-center text-primary font-bold">$49/month</td>
                          <td className="border border-border p-4 text-center text-primary font-bold">Unlimited</td>
                          <td className="border border-border p-4 text-center text-primary font-bold">Unlimited AI requests</td>
                          <td className="border border-border p-4 text-sm">Everything + pro tools, priority support</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-medium">Mini Boost</td>
                          <td className="border border-border p-4 text-center">$9</td>
                          <td className="border border-border p-4 text-center">500</td>
                          <td className="border border-border p-4 text-center">500 AI requests</td>
                          <td className="border border-border p-4 text-sm">Extra tokens only</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-medium">Creator Pack</td>
                          <td className="border border-border p-4 text-center">$19</td>
                          <td className="border border-border p-4 text-center">1,200</td>
                          <td className="border border-border p-4 text-center">1,200 AI requests</td>
                          <td className="border border-border p-4 text-sm">Extra tokens only</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-medium">Power Pack</td>
                          <td className="border border-border p-4 text-center">$39</td>
                          <td className="border border-border p-4 text-center">3,000</td>
                          <td className="border border-border p-4 text-center">3,000 AI requests</td>
                          <td className="border border-border p-4 text-sm">Extra tokens only</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Token Packages */}
              <div className="px-4 lg:px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">💎 Token Boost Packages</h2>
                    <p className="text-muted-foreground">Need more tokens? Grab extra packs anytime! 🔄</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="text-lg">Mini Boost</CardTitle>
                        <CardDescription>Perfect for testing new ideas</CardDescription>
                        <div className="text-2xl font-bold text-primary">$9</div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">500</div>
                        <p className="text-sm text-muted-foreground">tokens</p>
                        <p className="text-xs mt-2">💡 That's 500 AI requests!</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" size="sm" asChild>
                          <a href="/checkout?plan=mini-boost">Buy Now</a>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="text-center border-primary">
                      <CardHeader>
                        <CardTitle className="text-lg">Creator Pack</CardTitle>
                        <CardDescription>Most popular choice</CardDescription>
                        <div className="text-2xl font-bold text-primary">$19</div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2 text-primary">1,200</div>
                        <p className="text-sm text-muted-foreground">tokens</p>
                        <p className="text-xs mt-2">🚀 Enough for a month's content!</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" size="sm" asChild>
                          <a href="/checkout?plan=creator-pack">Buy Now</a>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="text-lg">Power Pack</CardTitle>
                        <CardDescription>For serious creators</CardDescription>
                        <div className="text-2xl font-bold text-primary">$39</div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">3,000</div>
                        <p className="text-sm text-muted-foreground">tokens</p>
                        <p className="text-xs mt-2">🔥 Go viral all month long!</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" size="sm" asChild>
                          <a href="/checkout?plan=power-pack">Buy Now</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                      💳 Tokens never expire • 🔄 Auto-renew available • 📞 Support included
                    </p>
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
