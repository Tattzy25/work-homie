"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Share,
  Calendar,
  Target,
  Zap,
  Award,
  Globe,
  Clock,
  Star,
  DollarSign,
  Crown,
  Rocket,
  Play,
  ExternalLink,
  Trophy,
  Sparkles,
  Flame,
  Video,
  Music,
  Camera,
  Settings,
  Plus,
  CheckCircle,
  AlertTriangle,
  Bot,
  Repeat,
  Timer,
  Workflow,
  Cpu,
  Brain,
  Shuffle,
  Circle,
  Hash
} from "lucide-react"

export default function AutomationStudio() {
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
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Automation Studio</h1>
                  <p className="text-muted-foreground mt-1">
                    AI-powered content automation for Gen Z creators. Scale your content without the burnout.
                  </p>
                </div>
              </div>
            </div>

            {/* Automation Metrics */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Posts Automated"
                  value="156"
                  description="This week"
                  icon={Bot}
                  trend="up"
                  trendValue="23"
                />
                <MetricCard
                  title="Time Saved"
                  value="12.5h"
                  description="Weekly automation"
                  icon={Clock}
                  trend="up"
                  trendValue="34%"
                />
                <MetricCard
                  title="Engagement Rate"
                  value="11.2%"
                  description="Auto-generated content"
                  icon={Target}
                  trend="up"
                  trendValue="8.7%"
                />
                <MetricCard
                  title="Active Workflows"
                  value="7"
                  description="Running automations"
                  icon={Workflow}
                  trend="up"
                  trendValue="2"
                />
              </div>
            </div>

            {/* Main Automation Interface */}
            <div className="px-4 lg:px-6">
              <Tabs defaultValue="workflows" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50 border">
                  <TabsTrigger value="workflows" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Workflow className="h-4 w-4" />
                    Workflows
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Shuffle className="h-4 w-4" />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="scheduler" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Scheduler
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>

                {/* Workflows Tab */}
                <TabsContent value="workflows" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Workflow className="h-5 w-5 text-primary" />
                            Active Automations
                          </CardTitle>
                          <CardDescription>
                            Your running content automation workflows
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            {
                              name: "Trend Response Bot",
                              description: "Creates content for trending challenges automatically",
                              status: "active",
                              posts: 12,
                              engagement: "14.2%"
                            },
                            {
                              name: "Caption Generator",
                              description: "AI generates viral captions for all your posts",
                              status: "active",
                              posts: 8,
                              engagement: "11.8%"
                            },
                            {
                              name: "Hashtag Optimizer",
                              description: "Finds and applies trending hashtags",
                              status: "paused",
                              posts: 15,
                              engagement: "9.3%"
                            }
                          ].map((workflow, index) => (
                            <div key={index} className="p-4 bg-muted/20 rounded-lg border">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm">{workflow.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant={workflow.status === 'active' ? "default" : "secondary"}>
                                    {workflow.status}
                                  </Badge>
                                  <Switch checked={workflow.status === 'active'} />
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{workflow.description}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span>{workflow.posts} posts generated</span>
                                <span className="font-medium">{workflow.engagement} avg engagement</span>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Plus className="h-4 w-4 text-primary" />
                            Create New Workflow
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Workflow Type</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose automation type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="trend-responder">Trend Responder</SelectItem>
                                <SelectItem value="content-generator">Content Generator</SelectItem>
                                <SelectItem value="caption-writer">Caption Writer</SelectItem>
                                <SelectItem value="hashtag-finder">Hashtag Optimizer</SelectItem>
                                <SelectItem value="scheduler">Auto Scheduler</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Workflow Name</label>
                            <Input placeholder="e.g., Viral Dance Responder" />
                          </div>
                          <Button className="w-full gap-2">
                            <Plus className="h-4 w-4" />
                            Create Workflow
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Brain className="h-5 w-5 text-primary" />
                            AI Content Pipeline
                          </CardTitle>
                          <CardDescription>
                            Automated content creation from trend to post
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {/* Pipeline Steps */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Flame className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Trend Detection</span>
                              </div>
                              <div className="flex-1 h-px bg-border" />
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Brain className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Content Generation</span>
                              </div>
                              <div className="flex-1 h-px bg-border" />
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Sparkles className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Editing & Effects</span>
                              </div>
                              <div className="flex-1 h-px bg-border" />
                              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <Timer className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="text-sm font-medium">Auto Scheduling</span>
                              </div>
                              <div className="flex-1 h-px bg-border" />
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <Rocket className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="text-sm font-medium">Publishing</span>
                              </div>
                              <div className="flex-1 h-px bg-border" />
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Recent Automations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            { action: "Generated caption for dance video", time: "2 min ago", status: "success" },
                            { action: "Applied trending hashtags", time: "15 min ago", status: "success" },
                            { action: "Scheduled post for optimal time", time: "1 hour ago", status: "success" },
                            { action: "Detected new dance trend", time: "3 hours ago", status: "success" }
                          ].map((log, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{log.action}</p>
                                <p className="text-xs text-muted-foreground">{log.time}</p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="mt-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      title="Viral Dance Responder"
                      description="Automatically creates dance content for trending challenges"
                      icon={Video}
                      badge="Most Popular"
                      action={{
                        label: "Use Template",
                        onClick: () => console.log("Using viral dance template"),
                        variant: "default"
                      }}
                    />
                    <FeatureCard
                      title="Comedy Caption Generator"
                      description="AI generates hilarious captions for your comedy content"
                      icon={Brain}
                      badge="High Engagement"
                      action={{
                        label: "Use Template",
                        onClick: () => console.log("Using comedy caption template"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="Fashion Trend Tracker"
                      description="Monitors fashion trends and generates outfit ideas"
                      icon={Sparkles}
                      badge="Trending"
                      action={{
                        label: "Use Template",
                        onClick: () => console.log("Using fashion trend template"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="Music Video Automator"
                      description="Creates content around trending songs and sounds"
                      icon={Music}
                      badge="Viral"
                      action={{
                        label: "Use Template",
                        onClick: () => console.log("Using music video template"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="Story Series Generator"
                      description="Automatically creates multi-part story content"
                      icon={Repeat}
                      badge="New"
                      action={{
                        label: "Use Template",
                        onClick: () => console.log("Using story series template"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="Hashtag Optimization"
                      description="Finds and applies the most effective hashtag combinations"
                      icon={Hash}
                      badge="Proven"
                      action={{
                        label: "Use Template",
                        onClick: () => console.log("Using hashtag optimization template"),
                        variant: "outline"
                      }}
                    />
                  </div>
                </TabsContent>

                {/* Scheduler Tab */}
                <TabsContent value="scheduler" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Timer className="h-5 w-5 text-primary" />
                          Auto-Scheduling Rules
                        </CardTitle>
                        <CardDescription>
                          Set intelligent posting schedules based on your audience
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">Peak Engagement Hours</p>
                              <p className="text-xs text-muted-foreground">6-8 PM based on your analytics</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">Avoid Posting Conflicts</p>
                              <p className="text-xs text-muted-foreground">Space posts 2-3 hours apart</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">Weekend Boost</p>
                              <p className="text-xs text-muted-foreground">Extra posts on weekends</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Upcoming Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { time: "Today 6:00 PM", content: "Dance challenge response", platform: "tiktok" },
                          { time: "Tomorrow 7:30 PM", content: "Comedy skit", platform: "tiktok" },
                          { time: "Friday 8:00 PM", content: "Fashion haul", platform: "instagram" },
                          { time: "Saturday 2:00 PM", content: "Story series part 3", platform: "tiktok" }
                        ].map((post, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {post.platform === 'tiktok' ? '🎵' : '📸'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{post.content}</p>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Auto
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-primary" />
                          Automation Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="text-center p-6 bg-primary/5 rounded-lg">
                            <div className="text-3xl font-bold text-primary">23.5h</div>
                            <p className="text-sm">Time Saved This Month</p>
                            <p className="text-xs text-muted-foreground mt-1">From automated content creation</p>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">94%</div>
                              <p className="text-xs">Automation Success Rate</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">156</div>
                              <p className="text-xs">Posts Generated</p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">11.2%</div>
                              <p className="text-xs">Avg Engagement</p>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">7</div>
                              <p className="text-xs">Active Workflows</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          Content Efficiency
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Manual Creation Time</span>
                            <span className="font-medium">45 min/post</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Automated Creation Time</span>
                            <span className="font-medium text-green-600">8 min/post</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Savings</span>
                            <span className="font-medium text-green-600">82%</span>
                          </div>
                        </div>

                        <div className="p-4 bg-primary/5 rounded-lg">
                          <p className="text-sm text-center">
                            <strong>🚀 Productivity Boost:</strong> Create 5x more content with the same effort
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Top Performing Automations</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Trend Responder</span>
                              <span className="font-medium">14.2% engagement</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Caption Generator</span>
                              <span className="font-medium">11.8% engagement</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Hashtag Optimizer</span>
                              <span className="font-medium">9.3% engagement</span>
                            </div>
                          </div>
                        </div>
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
