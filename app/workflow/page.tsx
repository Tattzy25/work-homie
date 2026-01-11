"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import {
  Sparkles,
  Zap,
  Wand2,
  Hash,
  Camera,
  Music,
  Users,
  Megaphone,
  Trophy,
  Bell,
  Share,
  Smartphone,
  Palette,
  Scissors,
  Film,
  TrendingUp,
  Plus,
  CheckCircle,
  Clock,
  Target,
  Heart
} from "lucide-react"

export default function WorkflowPage() {
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
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Creator Workflow</h1>
                  <p className="text-muted-foreground mt-1">
                    AI-powered content creation tools designed for Gen Z creators. From idea to viral hit in minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Ideas Generated"
                  value="247"
                  description="This week"
                  icon={Sparkles}
                  trend="up"
                  trendValue="23"
                />
                <MetricCard
                  title="Captions Created"
                  value="1.2K"
                  description="AI-generated"
                  icon={Wand2}
                  trend="up"
                  trendValue="45"
                />
                <MetricCard
                  title="Hashtags Found"
                  value="5.8K"
                  description="Trending tags"
                  icon={Hash}
                  trend="up"
                  trendValue="156"
                />
                <MetricCard
                  title="Videos Edited"
                  value="89"
                  description="This month"
                  icon={Film}
                  trend="up"
                  trendValue="12"
                />
              </div>
            </div>

            {/* Main Workflow Tools */}
            <div className="px-4 lg:px-6">
              <Tabs defaultValue="captions" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50 border">
                  <TabsTrigger value="captions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Wand2 className="h-4 w-4" />
                    AI Captions
                  </TabsTrigger>
                  <TabsTrigger value="hashtags" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Hashtags
                  </TabsTrigger>
                  <TabsTrigger value="effects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    AR Effects
                  </TabsTrigger>
                  <TabsTrigger value="music" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    Sound Discovery
                  </TabsTrigger>
                </TabsList>

                {/* AI Captions Tab */}
                <TabsContent value="captions" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Wand2 className="h-5 w-5 text-primary" />
                          AI Caption Generator
                        </CardTitle>
                        <CardDescription>
                          Generate viral captions that resonate with Gen Z audiences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Video Topic</label>
                          <Input placeholder="e.g., Morning dance routine, Vegan cooking tips..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Target Audience</label>
                          <Input placeholder="e.g., Gen Z fashion, Fitness enthusiasts..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tone</label>
                          <div className="flex gap-2">
                            {["Viral", "Relatable", "Humorous", "Motivational", "Trendy"].map((tone) => (
                              <Badge key={tone} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {tone}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full gap-2">
                          <Sparkles className="h-4 w-4" />
                          Generate Captions
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Generated Captions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg border">
                          <p className="text-sm leading-relaxed mb-3">
                            "POV: You wake up and choose violence 💃✨ Starting my day with moves that could make the floor jealous! Who's joining the dance revolution? 🔥 #DanceTok #MorningVibes #ViralDance"
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Viral Potential: 92%</Badge>
                            <Button size="sm" variant="outline" className="h-7 text-xs">Copy</Button>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/20 rounded-lg border">
                          <p className="text-sm leading-relaxed mb-3">
                            "That feeling when your morning routine slaps harder than your alarm ⏰💥 Coffee? Nah, I run on good vibes and questionable dance moves! 🌅 #MorningRoutine #DanceChallenge #GenZ"
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Viral Potential: 87%</Badge>
                            <Button size="sm" variant="outline" className="h-7 text-xs">Copy</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Hashtags Tab */}
                <TabsContent value="hashtags" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Hash className="h-5 w-5 text-primary" />
                          Smart Hashtag Generator
                        </CardTitle>
                        <CardDescription>
                          Get trending hashtags that actually work for your content
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content Type</label>
                          <Input placeholder="e.g., Dance, Fashion, Cooking, Comedy..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Target Platform</label>
                          <div className="flex gap-2">
                            {["TikTok", "Instagram", "Twitter", "All"].map((platform) => (
                              <Badge key={platform} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Find Hashtags
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Trending Hashtags</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-3">
                          {[
                            { tag: "#DanceChallenge2026", posts: "2.1M", growth: "+156%" },
                            { tag: "#ViralMorning", posts: "890K", growth: "+89%" },
                            { tag: "#GenZTok", posts: "1.2M", growth: "+234%" },
                            { tag: "#SlayOrNah", posts: "567K", growth: "+67%" },
                            { tag: "#TrendTok", posts: "3.4M", growth: "+312%" }
                          ].map((hashtag) => (
                            <div key={hashtag.tag} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{hashtag.tag}</p>
                                <p className="text-xs text-muted-foreground">{hashtag.posts} posts</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                  {hashtag.growth}
                                </Badge>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-2">
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* AR Effects Tab */}
                <TabsContent value="effects" className="mt-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      title="AR Face Filters"
                      description="Instagram/TikTok-style face filters that make your content pop"
                      icon={Camera}
                      badge="Trending"
                      action={{
                        label: "Apply Filter",
                        onClick: () => console.log("Applying AR filter"),
                        variant: "default"
                      }}
                    />
                    <FeatureCard
                      title="Background Effects"
                      description="Dynamic backgrounds that react to your movements"
                      icon={Palette}
                      badge="Viral"
                      action={{
                        label: "Add Effect",
                        onClick: () => console.log("Adding background effect"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="Text Animations"
                      description="Eye-catching text overlays with smooth animations"
                      icon={Sparkles}
                      badge="Popular"
                      action={{
                        label: "Animate Text",
                        onClick: () => console.log("Animating text"),
                        variant: "outline"
                      }}
                    />
                  </div>
                </TabsContent>

                {/* Music/Sound Tab */}
                <TabsContent value="music" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Music className="h-5 w-5 text-primary" />
                          Sound Discovery
                        </CardTitle>
                        <CardDescription>
                          Find trending sounds and music that match your vibe
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Genre/Mood</label>
                          <div className="flex flex-wrap gap-2">
                            {["Hip Hop", "Pop", "Electronic", "Trending", "Viral", "Chill", "Energetic"].map((genre) => (
                              <Badge key={genre} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full gap-2">
                          <Music className="h-4 w-4" />
                          Discover Sounds
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Trending Sounds</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          {[
                            { title: "Viral Dance Beat", artist: "DJ Fresh", uses: "2.3M", trend: "🔥 Hot" },
                            { title: "Summer Vibes", artist: "Beach Sound", uses: "1.8M", trend: "📈 Rising" },
                            { title: "Gen Z Anthem", artist: "TikTok Stars", uses: "4.1M", trend: "💥 Exploding" }
                          ].map((sound) => (
                            <div key={sound.title} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{sound.title}</p>
                                <p className="text-xs text-muted-foreground">{sound.artist} • {sound.uses} uses</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {sound.trend}
                                </Badge>
                                <Button size="sm" variant="outline" className="h-7 text-xs">Use</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Collaboration Tools */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  title="Creator Collaboration"
                  description="Connect with other creators for duets, shoutouts, and collabs"
                  icon={Users}
                  badge="Network"
                  action={{
                    label: "Find Partners",
                    onClick: () => console.log("Finding collaboration partners"),
                    variant: "default"
                  }}
                />
                <FeatureCard
                  title="Shoutout Requests"
                  description="Request and manage shoutout opportunities with influencers"
                  icon={Megaphone}
                  badge="Viral"
                  action={{
                    label: "Send Request",
                    onClick: () => console.log("Sending shoutout request"),
                    variant: "outline"
                  }}
                />
                <FeatureCard
                  title="Community Challenges"
                  description="Join trending challenges and create viral content together"
                  icon={Trophy}
                  badge="Trending"
                  action={{
                    label: "Join Challenge",
                    onClick: () => console.log("Joining community challenge"),
                    variant: "outline"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
