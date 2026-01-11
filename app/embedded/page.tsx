"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import {
  Users,
  Megaphone,
  Trophy,
  MessageCircle,
  Heart,
  Share,
  UserPlus,
  Crown,
  Zap,
  TrendingUp,
  Star,
  Calendar,
  MapPin,
  Hash,
  ExternalLink,
  Plus
} from "lucide-react"

export default function EmbeddedPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-gradient-to-br from-background via-background to-muted/20">
          <div className="@container/main flex flex-1 flex-col gap-6 py-6 md:gap-8 md:py-8">
            <div className="px-4 lg:px-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Creator Network</h1>
                  <p className="text-muted-foreground mt-1">
                    Connect, collaborate, and grow with the Gen Z creator community.
                  </p>
                </div>
              </div>
            </div>

            {/* Network Metrics */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Network Size"
                  value="12.4K"
                  description="Connected creators"
                  icon={Users}
                  trend="up"
                  trendValue="156"
                />
                <MetricCard
                  title="Active Collabs"
                  value="89"
                  description="Ongoing projects"
                  icon={Trophy}
                  trend="up"
                  trendValue="23"
                />
                <MetricCard
                  title="Shoutouts Sent"
                  value="247"
                  description="This month"
                  icon={Megaphone}
                  trend="up"
                  trendValue="67"
                />
                <MetricCard
                  title="Viral Boost"
                  value="2.3x"
                  description="Avg engagement increase"
                  icon={TrendingUp}
                  trend="up"
                  trendValue="12"
                />
              </div>
            </div>

            {/* Main Network Tools */}
            <div className="px-4 lg:px-6">
              <Tabs defaultValue="discover" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50 border">
                  <TabsTrigger value="discover" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Discover
                  </TabsTrigger>
                  <TabsTrigger value="shoutouts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    Shoutouts
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Challenges
                  </TabsTrigger>
                  <TabsTrigger value="collabs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Collabs
                  </TabsTrigger>
                </TabsList>

                {/* Creator Discovery Tab */}
                <TabsContent value="discover" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Find Creators
                        </CardTitle>
                        <CardDescription>
                          Discover creators in your niche for collaboration opportunities
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content Niche</label>
                          <div className="flex flex-wrap gap-2">
                            {["Dance", "Fashion", "Cooking", "Comedy", "Fitness", "Beauty", "Tech"].map((niche) => (
                              <Badge key={niche} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {niche}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Audience Size</label>
                          <div className="flex gap-2">
                            {["Micro (1K-10K)", "Mid (10K-100K)", "Macro (100K+)", "Any"].map((size) => (
                              <Badge key={size} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full gap-2">
                          <Users className="h-4 w-4" />
                          Discover Creators
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Recommended Creators</h3>
                      {[
                        { name: "DanceQueen2026", followers: "89K", niche: "Dance", engagement: "12.4%", avatar: "/avatars/dance.jpg" },
                        { name: "FashionIcon", followers: "156K", niche: "Fashion", engagement: "9.8%", avatar: "/avatars/fashion.jpg" },
                        { name: "ComedyGold", followers: "234K", niche: "Comedy", engagement: "15.2%", avatar: "/avatars/comedy.jpg" },
                        { name: "FitLifeDaily", followers: "78K", niche: "Fitness", engagement: "11.7%", avatar: "/avatars/fitness.jpg" }
                      ].map((creator) => (
                        <Card key={creator.name} className="border-border/50 bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={creator.avatar} />
                                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{creator.name}</p>
                                  <p className="text-xs text-muted-foreground">{creator.followers} followers • {creator.niche}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="text-xs mb-1">
                                  {creator.engagement} engagement
                                </Badge>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" className="h-7 text-xs">
                                    <UserPlus className="h-3 w-3 mr-1" />
                                    Connect
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Shoutouts Tab */}
                <TabsContent value="shoutouts" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Megaphone className="h-5 w-5 text-primary" />
                          Shoutout Marketplace
                        </CardTitle>
                        <CardDescription>
                          Request shoutouts from influencers to boost your reach
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Content Link</label>
                          <Input placeholder="https://tiktok.com/@yourusername/video/123" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Desired Reach</label>
                          <div className="flex gap-2">
                            {["10K-50K", "50K-100K", "100K-500K", "500K+"].map((reach) => (
                              <Badge key={reach} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {reach}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full gap-2">
                          <Megaphone className="h-4 w-4" />
                          Find Shoutout Partners
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Available Shoutouts</h3>
                      {[
                        { influencer: "ViralKing", followers: "2.1M", price: "$50", niche: "Dance", availability: "Available now" },
                        { influencer: "TrendSetter", followers: "890K", price: "$25", niche: "Fashion", availability: "2 days" },
                        { influencer: "ComedyStar", followers: "1.5M", price: "$75", niche: "Comedy", availability: "Available now" }
                      ].map((shoutout) => (
                        <Card key={shoutout.influencer} className="border-border/50 bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{shoutout.influencer}</p>
                                <p className="text-xs text-muted-foreground">{shoutout.followers} followers • {shoutout.niche}</p>
                                <p className="text-xs text-green-600">{shoutout.availability}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">{shoutout.price}</p>
                                <Button size="sm" variant="outline" className="h-7 text-xs mt-1">
                                  Request
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Challenges Tab */}
                <TabsContent value="challenges" className="mt-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      title="#DanceChallenge2026"
                      description="Show off your best moves to this viral beat!"
                      icon={Trophy}
                      badge="2.3M entries"
                      action={{
                        label: "Join Challenge",
                        onClick: () => console.log("Joining dance challenge"),
                        variant: "default"
                      }}
                    />
                    <FeatureCard
                      title="#FashionNova"
                      description="Sustainable fashion hauls under $50"
                      icon={Star}
                      badge="890K entries"
                      action={{
                        label: "Participate",
                        onClick: () => console.log("Participating in fashion challenge"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="#ComedyHour"
                      description="Make us laugh for a chance to go viral"
                      icon={Heart}
                      badge="1.2M entries"
                      action={{
                        label: "Enter Now",
                        onClick: () => console.log("Entering comedy challenge"),
                        variant: "outline"
                      }}
                    />
                  </div>

                  <div className="mt-8">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-primary" />
                          Challenge Leaderboard
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { rank: 1, creator: "DancePro", points: 15420, badge: "👑" },
                            { rank: 2, creator: "FashionGuru", points: 12890, badge: "🥈" },
                            { rank: 3, creator: "ComedyKing", points: 11250, badge: "🥉" },
                            { rank: 4, creator: "ViralStar", points: 9870, badge: "⭐" },
                            { rank: 5, creator: "TrendMaster", points: 8760, badge: "🌟" }
                          ].map((entry) => (
                            <div key={entry.creator} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{entry.badge}</span>
                                <div>
                                  <p className="font-medium text-sm">#{entry.rank} {entry.creator}</p>
                                  <p className="text-xs text-muted-foreground">{entry.points.toLocaleString()} points</p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="h-7 text-xs">
                                View Profile
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Collabs Tab */}
                <TabsContent value="collabs" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          Active Collaborations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">Dance Duo Project</h4>
                            <Badge variant="outline" className="text-xs">In Progress</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Collaborating with @DanceQueen2026 on viral choreography
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Due: Dec 15</span>
                            <span>Progress: 65%</span>
                          </div>
                        </div>

                        <div className="p-4 bg-muted/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">Fashion Collab</h4>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Completed</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Sustainable fashion showcase with @FashionIcon
                          </p>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              View Results
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs">
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Plus className="h-5 w-5 text-primary" />
                          Start New Collab
                        </CardTitle>
                        <CardDescription>
                          Find creators for your next big project
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Project Type</label>
                          <div className="flex flex-wrap gap-2">
                            {["Duet", "Stitch", "Joint Video", "Series", "Challenge"].map((type) => (
                              <Badge key={type} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Project Description</label>
                          <Input placeholder="Brief description of your collab idea..." />
                        </div>
                        <Button className="w-full gap-2">
                          <Users className="h-4 w-4" />
                          Find Collaboration Partners
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
