"use client"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IconUser, IconSparkles, IconCamera, IconBell, IconShield, IconCreditCard } from "@tabler/icons-react"

export default function AccountPage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Content creator passionate about TikTok trends and viral marketing.",
    website: "https://johndoe.com",
    location: "Los Angeles, CA"
  })

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    trendAlerts: true,
    billingAlerts: true,
    marketingEmails: false
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    alert("🎉 Profile updated successfully!")
  }

  const handleSaveNotifications = () => {
    alert("🔔 Notification preferences updated!")
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
                    <h1 className="text-4xl font-bold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground mt-1">
                      Manage your profile, preferences, and account information
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
                  {/* Profile Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconUser className="h-5 w-5" />
                        Profile Information
                      </CardTitle>
                      <CardDescription>
                        Update your personal information and profile details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/avatars/user.jpg" alt={profileData.name} />
                          <AvatarFallback className="text-lg">JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            <IconCamera className="h-4 w-4 mr-2" />
                            Change Avatar
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Profile Form */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => handleProfileUpdate("name", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleProfileUpdate("email", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            value={profileData.bio}
                            onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://yourwebsite.com"
                            value={profileData.website}
                            onChange={(e) => handleProfileUpdate("website", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="City, Country"
                            value={profileData.location}
                            onChange={(e) => handleProfileUpdate("location", e.target.value)}
                          />
                        </div>
                      </div>

                      <Button onClick={handleSaveProfile} className="w-full">
                        Save Profile Changes
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Account Details */}
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconCreditCard className="h-5 w-5" />
                          Current Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">Pro Package</h3>
                            <p className="text-sm text-muted-foreground">Unlimited tokens</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                        <Button variant="outline" className="w-full mt-4" asChild>
                          <a href="/account/billing">Manage Billing</a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconBell className="h-5 w-5" />
                          Notification Preferences
                        </CardTitle>
                        <CardDescription>
                          Choose what notifications you'd like to receive
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Email Updates</Label>
                            <p className="text-xs text-muted-foreground">Important account updates</p>
                          </div>
                          <Switch
                            checked={notifications.emailUpdates}
                            onCheckedChange={(checked) => handleNotificationChange("emailUpdates", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Trend Alerts</Label>
                            <p className="text-xs text-muted-foreground">New trending topics notifications</p>
                          </div>
                          <Switch
                            checked={notifications.trendAlerts}
                            onCheckedChange={(checked) => handleNotificationChange("trendAlerts", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Billing Alerts</Label>
                            <p className="text-xs text-muted-foreground">Payment and billing notifications</p>
                          </div>
                          <Switch
                            checked={notifications.billingAlerts}
                            onCheckedChange={(checked) => handleNotificationChange("billingAlerts", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Marketing Emails</Label>
                            <p className="text-xs text-muted-foreground">Product updates and promotions</p>
                          </div>
                          <Switch
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                          />
                        </div>

                        <Button onClick={handleSaveNotifications} className="w-full" variant="outline">
                          Save Notification Settings
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Account Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconShield className="h-5 w-5" />
                          Account Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full" onClick={() => alert("🔒 Password change form would open")}>
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => alert("📥 Data export initiated")}>
                          Export My Data
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => {
                            if (confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.")) {
                              alert("😢 Account deletion would be processed...")
                            }
                          }}
                        >
                          Delete Account
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
