"use client"

import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Lock, AlertTriangle, Sparkles, ExternalLink } from "lucide-react"

const policies = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information.",
    icon: Shield,
    url: "/policies/privacy-policy",
    lastUpdated: "November 2026"
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    description: "The rules and regulations for using our platform.",
    icon: FileText,
    url: "/policies/terms-of-service",
    lastUpdated: "November 2026"
  },
  {
    id: "cookie-policy",
    title: "Cookie Policy",
    description: "Information about how we use cookies and tracking technologies.",
    icon: Lock,
    url: "/policies/cookie-policy",
    lastUpdated: "November 2026"
  },
  {
    id: "acceptable-use-policy",
    title: "Acceptable Use Policy",
    description: "Guidelines for appropriate use of our platform and services.",
    icon: AlertTriangle,
    url: "/policies/acceptable-use-policy",
    lastUpdated: "November 2026"
  }
]

export default function Page() {
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
                    <h1 className="text-4xl font-bold tracking-tight">Policies</h1>
                    <p className="text-muted-foreground mt-1">
                      Important legal documents and guidelines for using our platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Cards */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                  {policies.map((policy) => {
                    const IconComponent = policy.icon
                    return (
                      <Link key={policy.id} href={policy.url}>
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                          <CardHeader className="text-center">
                            <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl">{policy.title}</CardTitle>
                            <CardDescription>{policy.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                              <span>Read full policy</span>
                              <ExternalLink className="h-3 w-3" />
                            </div>
                            <div className="text-center mt-2">
                              <span className="text-xs text-muted-foreground">
                                Last updated: {policy.lastUpdated}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
