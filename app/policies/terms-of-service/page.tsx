"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Sparkles } from "lucide-react"

export default function TermsOfServicePage() {
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
                    <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                    <p className="text-muted-foreground mt-1">
                      The rules and regulations for using Musarty
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Terms of Service for Musarty
                    </CardTitle>
                    <CardDescription>
                      Last updated: November 2026
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[70vh] pr-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                          By accessing and using Musarty's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>

                        <h2>2. Description of Service</h2>
                        <p>
                          Musarty provides AI-powered content creation tools, trend analysis, and creator workflow automation services. Our platform helps content creators discover trends, plan content calendars, and optimize their creative process.
                        </p>

                        <h2>3. User Accounts</h2>
                        <p>
                          To access certain features of our service, you must create an account. You are responsible for:
                        </p>
                        <ul>
                          <li>Maintaining the confidentiality of your account credentials</li>
                          <li>All activities that occur under your account</li>
                          <li>Notifying us immediately of any unauthorized use</li>
                          <li>Providing accurate and complete information during registration</li>
                        </ul>

                        <h2>4. Acceptable Use Policy</h2>
                        <p>
                          You agree to use our services only for lawful purposes and in accordance with our <a href="/policies/acceptable-use-policy" className="text-primary hover:underline">Acceptable Use Policy</a>. You agree not to:
                        </p>
                        <ul>
                          <li>Use the service for any unlawful purpose or to solicit others to perform unlawful acts</li>
                          <li>Attempt to gain unauthorized access to any part of the service</li>
                          <li>Interfere with or disrupt the service or servers</li>
                          <li>Upload malicious code, viruses, or harmful content</li>
                          <li>Impersonate any person or entity</li>
                          <li>Violate any applicable laws or regulations</li>
                        </ul>

                        <h2>5. Content Ownership and Rights</h2>
                        <p>
                          You retain ownership of the content you create using our services. However, by using our platform, you grant us a limited license to process, store, and analyze your content for the purpose of providing our services.
                        </p>

                        <h2>6. Subscription and Billing</h2>
                        <p>
                          Some features require a paid subscription. Billing occurs on a recurring basis (monthly) unless otherwise specified. You can cancel your subscription at any time, but refunds are subject to our refund policy.
                        </p>

                        <h2>7. Token Usage</h2>
                        <p>
                          Our service uses a token-based system for AI requests. Tokens are consumed based on usage and cannot be transferred between accounts. Unused tokens do not roll over to the next billing period.
                        </p>

                        <h2>8. Privacy and Data Protection</h2>
                        <p>
                          Your privacy is important to us. Our collection and use of personal information is governed by our <a href="/policies/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
                        </p>

                        <h2>9. Intellectual Property</h2>
                        <p>
                          The service and its original content, features, and functionality are owned by Musarty and are protected by copyright, trademark, and other intellectual property laws.
                        </p>

                        <h2>10. Disclaimers</h2>
                        <p>
                          The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including but not limited to implied warranties of merchantability and fitness for a particular purpose.
                        </p>

                        <h2>11. Limitation of Liability</h2>
                        <p>
                          In no event shall Musarty be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>

                        <h2>12. Termination</h2>
                        <p>
                          We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the service will cease immediately.
                        </p>

                        <h2>13. Governing Law</h2>
                        <p>
                          These Terms shall be interpreted and governed by the laws of the jurisdiction in which Musarty operates, without regard to conflict of law provisions.
                        </p>

                        <h2>14. Changes to Terms</h2>
                        <p>
                          We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this page and updating the "Last updated" date.
                        </p>

                        <h2>15. Contact Information</h2>
                        <p>
                          If you have any questions about these Terms, please contact us at:
                        </p>
                        <ul>
                          <li>Email: legal@musarty.com</li>
                          <li>Address: [Company Address]</li>
                        </ul>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
