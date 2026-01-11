"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Sparkles } from "lucide-react"

export default function PrivacyPolicyPage() {
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
                    <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="text-muted-foreground mt-1">
                      How we collect, use, and protect your personal information
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy Policy for Musarty
                    </CardTitle>
                    <CardDescription>
                      Last updated: November 2026
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[70vh] pr-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <h2>1. Information We Collect</h2>
                        <p>
                          We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
                        </p>
                        <ul>
                          <li>Personal information (name, email address, phone number, etc.)</li>
                          <li>Account credentials and profile information</li>
                          <li>Content you create, upload, or share on our platform</li>
                          <li>Communication data when you contact our support team</li>
                          <li>Usage data and analytics about how you interact with our services</li>
                          <li>Device and browser information for technical support</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul>
                          <li>Provide and maintain our content creation services</li>
                          <li>Process transactions and send related billing information</li>
                          <li>Send technical notices, updates, and support messages</li>
                          <li>Communicate with you about products, services, and promotions</li>
                          <li>Analyze usage patterns to improve our services</li>
                          <li>Prevent fraud and ensure platform security</li>
                          <li>Comply with legal obligations</li>
                        </ul>

                        <h2>3. Information Sharing and Disclosure</h2>
                        <p>
                          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following circumstances:
                        </p>
                        <ul>
                          <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                          <li>When required by law or to protect our rights</li>
                          <li>In connection with a business transfer or acquisition</li>
                          <li>With your explicit consent</li>
                        </ul>

                        <h2>4. Data Security</h2>
                        <p>
                          We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul>
                          <li>Encryption of data in transit and at rest</li>
                          <li>Regular security audits and updates</li>
                          <li>Access controls and authentication requirements</li>
                          <li>Employee training on data protection</li>
                        </ul>

                        <h2>5. Your Rights and Choices</h2>
                        <p>You have the following rights regarding your personal information:</p>
                        <ul>
                          <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                          <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                        </ul>

                        <h2>6. Cookies and Tracking Technologies</h2>
                        <p>
                          We use cookies and similar tracking technologies to enhance your experience, analyze usage, and provide personalized content. For detailed information about our cookie practices, please see our <a href="/policies/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
                        </p>

                        <h2>7. International Data Transfers</h2>
                        <p>
                          Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
                        </p>

                        <h2>8. Children's Privacy</h2>
                        <p>
                          Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                        </p>

                        <h2>9. Changes to This Privacy Policy</h2>
                        <p>
                          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>

                        <h2>10. Contact Us</h2>
                        <p>
                          If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <ul>
                          <li>Email: privacy@musarty.com</li>
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
