"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Sparkles } from "lucide-react"

export default function AcceptableUsePolicyPage() {
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
                    <h1 className="text-4xl font-bold tracking-tight">Acceptable Use Policy</h1>
                    <p className="text-muted-foreground mt-1">
                      Guidelines for appropriate use of Musarty platform and services
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Acceptable Use Policy for Musarty
                    </CardTitle>
                    <CardDescription>
                      Last updated: November 2026
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[70vh] pr-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <h2>Purpose</h2>
                        <p>
                          This Acceptable Use Policy outlines acceptable practices for using Musarty's platform and services. By using our services, you agree to comply with this policy. We reserve the right to suspend or terminate accounts that violate these guidelines.
                        </p>

                        <h2>Permitted Use</h2>
                        <p>
                          You may use Musarty's services for lawful purposes, including but not limited to:
                        </p>
                        <ul>
                          <li>Creating and sharing original content</li>
                          <li>Analyzing trends and market insights</li>
                          <li>Collaborating with other content creators</li>
                          <li>Using AI tools to enhance your creative process</li>
                          <li>Educational and research purposes</li>
                        </ul>

                        <h2>Prohibited Activities</h2>
                        <p>You may not:</p>

                        <h3>Illegal Activities</h3>
                        <ul>
                          <li>Violate any applicable local, state, national, or international law or regulation</li>
                          <li>Infringe on intellectual property rights, including copyrights, trademarks, and trade secrets</li>
                          <li>Distribute illegal content, including but not limited to child exploitation material, violent content, or hate speech</li>
                          <li>Engage in fraud, scams, or phishing attempts</li>
                          <li>Impersonate individuals, organizations, or entities</li>
                        </ul>

                        <h3>System Abuse</h3>
                        <ul>
                          <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                          <li>Distribute viruses, malware, or other harmful code</li>
                          <li>Interfere with or disrupt our services or servers</li>
                          <li>Use automated tools to access our services without permission</li>
                          <li>Bypass rate limits or usage restrictions</li>
                        </ul>

                        <h3>Content Violations</h3>
                        <ul>
                          <li>Upload or share content that violates our <a href="/policies/terms-of-service" className="text-primary hover:underline">Terms of Service</a></li>
                          <li>Post spam, excessive promotional content, or unsolicited messages</li>
                          <li>Harass, intimidate, or abuse other users</li>
                          <li>Share private or confidential information without authorization</li>
                          <li>Create fake accounts or manipulate platform metrics</li>
                        </ul>

                        <h2>AI Usage Guidelines</h2>
                        <p>
                          When using our AI-powered features, you agree to:
                        </p>
                        <ul>
                          <li>Use AI tools responsibly and ethically</li>
                          <li>Not generate content that promotes harm, discrimination, or illegal activities</li>
                          <li>Properly attribute AI-generated content when required</li>
                          <li>Not use AI to create deepfakes or misleading content</li>
                          <li>Respect copyright and intellectual property laws</li>
                        </ul>

                        <h2>Token Usage</h2>
                        <p>
                          Our token-based system is designed for fair usage. You may not:
                        </p>
                        <ul>
                          <li>Abuse the token system through excessive or unnecessary requests</li>
                          <li>Share account credentials to bypass token limits</li>
                          <li>Use multiple accounts to circumvent usage restrictions</li>
                          <li>Resell or transfer tokens between accounts</li>
                        </ul>

                        <h2>Community Guidelines</h2>
                        <p>
                          When interacting with our community features:
                        </p>
                        <ul>
                          <li>Treat other users with respect and professionalism</li>
                          <li>Provide constructive feedback and support</li>
                          <li>Do not engage in toxic behavior or harassment</li>
                          <li>Report inappropriate content or behavior to our moderation team</li>
                          <li>Maintain the integrity of collaborative spaces</li>
                        </ul>

                        <h2>Account Security</h2>
                        <p>You are responsible for:</p>
                        <ul>
                          <li>Maintaining the confidentiality of your account credentials</li>
                          <li>All activities that occur under your account</li>
                          <li>Notifying us immediately of any unauthorized access</li>
                          <li>Using strong, unique passwords</li>
                          <li>Enabling two-factor authentication when available</li>
                        </ul>

                        <h2>Enforcement</h2>
                        <p>
                          We reserve the right to:
                        </p>
                        <ul>
                          <li>Monitor usage patterns and content for violations</li>
                          <li>Suspend or terminate accounts that violate this policy</li>
                          <li>Remove content that violates our guidelines</li>
                          <li>Take legal action when necessary</li>
                          <li>Cooperate with law enforcement authorities</li>
                        </ul>

                        <h2>Reporting Violations</h2>
                        <p>
                          If you encounter content or behavior that violates this Acceptable Use Policy, please report it to:
                        </p>
                        <ul>
                          <li>Email: abuse@musarty.com</li>
                          <li>Subject: Policy Violation Report</li>
                          <li>Include: Description of the violation, relevant URLs, and any supporting evidence</li>
                        </ul>

                        <h2>Changes to This Policy</h2>
                        <p>
                          We may update this Acceptable Use Policy at any time. We will notify users of material changes via email or platform notifications. Continued use of our services constitutes acceptance of the updated policy.
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                          For questions about this Acceptable Use Policy, please contact us at:
                        </p>
                        <ul>
                          <li>Email: support@musarty.com</li>
                          <li>Subject: Acceptable Use Policy Inquiry</li>
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
