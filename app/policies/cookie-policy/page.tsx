"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Lock, Sparkles } from "lucide-react"

export default function CookiePolicyPage() {
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
                    <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
                    <p className="text-muted-foreground mt-1">
                      Information about how we use cookies and tracking technologies
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Cookie Policy for Musarty
                    </CardTitle>
                    <CardDescription>
                      Last updated: November 2026
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[70vh] pr-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <h2>What Are Cookies</h2>
                        <p>
                          Cookies are small text files that are stored on your computer, tablet, or mobile device when you visit our website or use our services. They allow us to remember your preferences, analyze site traffic, and provide personalized content.
                        </p>

                        <h2>How We Use Cookies</h2>
                        <p>We use cookies to:</p>
                        <ul>
                          <li>Remember your login status and preferences</li>
                          <li>Analyze how you use our website and services</li>
                          <li>Provide personalized content and recommendations</li>
                          <li>Enable social media features and integrations</li>
                          <li>Improve our website's performance and user experience</li>
                          <li>Prevent fraud and enhance security</li>
                        </ul>

                        <h2>Types of Cookies We Use</h2>

                        <h3>Essential Cookies</h3>
                        <p>
                          These cookies are necessary for the website to function properly. They enable core functionality such as page navigation, access to secure areas, and basic site features. The website cannot function properly without these cookies.
                        </p>

                        <h3>Analytics Cookies</h3>
                        <p>
                          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                        </p>

                        <h3>Functional Cookies</h3>
                        <p>
                          These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and other customizable features.
                        </p>

                        <h3>Marketing Cookies</h3>
                        <p>
                          These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. They may be set by our advertising partners.
                        </p>

                        <h2>Third-Party Cookies</h2>
                        <p>
                          Some cookies may be set by third-party services that appear on our pages, such as:
                        </p>
                        <ul>
                          <li>Google Analytics (for website analytics)</li>
                          <li>Social media plugins (for sharing content)</li>
                          <li>Payment processors (for secure transactions)</li>
                          <li>Customer support widgets</li>
                        </ul>

                        <h2>Managing Cookies</h2>
                        <p>You can control and manage cookies in several ways:</p>

                        <h3>Browser Settings</h3>
                        <p>
                          Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 'Options' or 'Preferences' menu of your browser. You can set your browser to block or alert you about cookies, but please note that some parts of our site may not work properly without cookies.
                        </p>

                        <h3>Opt-out Links</h3>
                        <p>
                          You can opt out of interest-based advertising by visiting the following links:
                        </p>
                        <ul>
                          <li><a href="http://www.aboutads.info/choices" className="text-primary hover:underline">Digital Advertising Alliance</a></li>
                          <li><a href="http://www.youronlinechoices.com/" className="text-primary hover:underline">Your Online Choices</a></li>
                        </ul>

                        <h3>Do Not Track</h3>
                        <p>
                          Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activity tracked. Currently, we do not respond to "Do Not Track" signals.
                        </p>

                        <h2>Cookies and Mobile Devices</h2>
                        <p>
                          When you access our services on a mobile device, we may use similar technologies like cookies to enhance your experience and provide our services.
                        </p>

                        <h2>Changes to This Cookie Policy</h2>
                        <p>
                          We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                          If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                        </p>
                        <ul>
                          <li>Email: privacy@musarty.com</li>
                          <li>Subject: Cookie Policy Inquiry</li>
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
