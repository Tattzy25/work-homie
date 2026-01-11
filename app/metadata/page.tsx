"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import {
  TrendingUp,
  Castle as Crystal,
  Zap,
  Target,
  Flame,
  Rocket,
  Eye,
  BarChart3,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Minus,
  Activity,
  Calendar,
  Users,
  Hash,
  Music,
  Palette,
  Camera,
  Smartphone,
  Star
} from "lucide-react"

export default function MetadataPage() {
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
                  <Crystal className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Trend Oracle</h1>
                  <p className="text-muted-foreground mt-1">
                    AI-powered trend prediction and viral potential analysis for Gen Z creators.
                  </p>
                </div>
              </div>
            </div>

            {/* Prediction Metrics */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Viral Accuracy"
                  value="87.3%"
                  description="Prediction success rate"
                  icon={Target}
                  trend="up"
                  trendValue="5.2"
                />
                <MetricCard
                  title="Trends Predicted"
                  value="1,247"
                  description="This month"
                  icon={Crystal}
                  trend="up"
                  trendValue="89"
                />
                <MetricCard
                  title="Avg. Lifespan"
                  value="12.4"
                  description="Days trending"
                  icon={Clock}
                  trend="up"
                  trendValue="2.1"
                />
                <MetricCard
                  title="Peak Reach"
                  value="2.3M"
                  description="Max predicted views"
                  icon={Rocket}
                  trend="up"
                  trendValue="156"
                />
              </div>
            </div>

            {/* Main Prediction Tools */}
            <div className="px-4 lg:px-6">
              <Tabs defaultValue="predictions" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50 border">
                  <TabsTrigger value="predictions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Crystal className="h-4 w-4" />
                    Predictions
                  </TabsTrigger>
                  <TabsTrigger value="emerging" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    Emerging
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Insights
                  </TabsTrigger>
                </TabsList>

                {/* Trend Predictions Tab */}
                <TabsContent value="predictions" className="mt-8">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Crystal className="h-5 w-5 text-primary" />
                            Next Big Trends
                          </CardTitle>
                          <CardDescription>
                            AI predictions for trends that will explode in the next 30 days
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            {
                              trend: "#DanceTok2026",
                              prediction: "98% viral potential",
                              timeframe: "Peaks in 7 days",
                              category: "Dance",
                              confidence: 98,
                              status: "hot"
                            },
                            {
                              trend: "#EcoGenZ",
                              prediction: "87% viral potential",
                              timeframe: "Peaks in 14 days",
                              category: "Lifestyle",
                              confidence: 87,
                              status: "rising"
                            },
                            {
                              trend: "#TechTok",
                              prediction: "92% viral potential",
                              timeframe: "Peaks in 21 days",
                              category: "Technology",
                              confidence: 92,
                              status: "emerging"
                            },
                            {
                              trend: "#ComedyGold",
                              prediction: "89% viral potential",
                              timeframe: "Peaks in 10 days",
                              category: "Comedy",
                              confidence: 89,
                              status: "hot"
                            }
                          ].map((prediction) => (
                            <div key={prediction.trend} className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm">{prediction.trend}</h4>
                                <Badge variant={prediction.status === "hot" ? "default" : "secondary"} className="text-xs">
                                  {prediction.status === "hot" ? "🔥 HOT" : prediction.status === "rising" ? "📈 RISING" : "🌟 EMERGING"}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{prediction.category} • {prediction.timeframe}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Viral Potential</span>
                                    <span className="font-medium">{prediction.prediction}</span>
                                  </div>
                                  <Progress value={prediction.confidence} className="h-2" />
                                </div>
                                <Button size="sm" variant="outline" className="ml-3 h-7 text-xs">
                                  Track
                                </Button>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Content Strategy
                          </CardTitle>
                          <CardDescription>
                            Personalized recommendations based on your niche and audience
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-primary/5 rounded-lg">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Dance Content Optimal</h4>
                                <p className="text-xs text-muted-foreground">
                                  Your dance videos have 3.2x higher engagement. Focus on choreography challenges.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Timing Alert</h4>
                                <p className="text-xs text-muted-foreground">
                                  Post between 6-8 PM for maximum reach. Your current timing is missing peak hours.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-3">
                              <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Hashtag Strategy</h4>
                                <p className="text-xs text-muted-foreground">
                                  Use #DanceTok2026 + 3 trending tags for 40% more discoverability.
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Viral Probability Calculator</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mb-4">
                            <div className="text-4xl font-bold text-primary mb-2">94%</div>
                            <p className="text-sm font-medium">Your Next Video Viral Potential</p>
                            <p className="text-xs text-muted-foreground mt-1">Based on current trends & your performance</p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Content Quality</span>
                              <span className="font-medium text-green-600">95%</span>
                            </div>
                            <Progress value={95} className="h-2" />

                            <div className="flex justify-between text-sm">
                              <span>Timing Optimization</span>
                              <span className="font-medium text-yellow-600">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />

                            <div className="flex justify-between text-sm">
                              <span>Trend Alignment</span>
                              <span className="font-medium text-green-600">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Emerging Trends Tab */}
                <TabsContent value="emerging" className="mt-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      title="Micro-Trends Watch"
                      description="Track emerging subcultures and niche communities before they go mainstream"
                      icon={Flame}
                      badge="Real-time"
                      action={{
                        label: "Monitor",
                        onClick: () => console.log("Monitoring micro-trends"),
                        variant: "default"
                      }}
                    />
                    <FeatureCard
                      title="Platform Migration"
                      description="Predict which trends will jump from TikTok to Instagram Reels"
                      icon={TrendingUp}
                      badge="Cross-platform"
                      action={{
                        label: "Analyze",
                        onClick: () => console.log("Analyzing platform migration"),
                        variant: "outline"
                      }}
                    />
                    <FeatureCard
                      title="Demographic Shifts"
                      description="Track how Gen Z interests evolve across different regions"
                      icon={Users}
                      badge="Global"
                      action={{
                        label: "Track Changes",
                        onClick: () => console.log("Tracking demographic shifts"),
                        variant: "outline"
                      }}
                    />
                  </div>

                  <div className="mt-8">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Activity className="h-5 w-5 text-primary" />
                          Trend Velocity Tracker
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { trend: "#SkibidiRizz", velocity: "Explosive", change: "+450%", timeLeft: "2 days" },
                            { trend: "#OhioTikTok", velocity: "Rapid", change: "+320%", timeLeft: "5 days" },
                            { trend: "#CleanGirlAesthetic", velocity: "Steady", change: "+180%", timeLeft: "12 days" },
                            { trend: "#VibeCheck", velocity: "Slowing", change: "+45%", timeLeft: "18 days" }
                          ].map((item) => (
                            <div key={item.trend} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className={`h-3 w-3 rounded-full ${
                                  item.velocity === "Explosive" ? "bg-red-500" :
                                  item.velocity === "Rapid" ? "bg-orange-500" :
                                  item.velocity === "Steady" ? "bg-yellow-500" : "bg-green-500"
                                }`} />
                                <div>
                                  <p className="font-medium text-sm">{item.trend}</p>
                                  <p className="text-xs text-muted-foreground">Velocity: {item.velocity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{item.change}</p>
                                <p className="text-xs text-muted-foreground">{item.timeLeft} left</p>
                              </div>
                            </div>
                          ))}
                        </div>
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
                          Prediction Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="text-center p-6 bg-primary/5 rounded-lg">
                            <div className="text-3xl font-bold text-primary">87.3%</div>
                            <p className="text-sm">Overall Accuracy Rate</p>
                            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">92%</div>
                              <p className="text-xs">Dance Trends</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">85%</div>
                              <p className="text-xs">Comedy Trends</p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">78%</div>
                              <p className="text-xs">Fashion Trends</p>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">94%</div>
                              <p className="text-xs">Music Trends</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Historical Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">Best Performing Month</h4>
                              <Badge variant="outline" className="text-xs">December 2025</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">94.2% prediction accuracy, 1,247 trends identified</p>
                          </div>

                          <div className="p-4 bg-muted/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">Most Accurate Category</h4>
                              <Badge variant="outline" className="text-xs">Dance</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">96.8% accuracy rate across 423 predictions</p>
                          </div>

                          <div className="p-4 bg-muted/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">Longest Lasting Trend</h4>
                              <Badge variant="outline" className="text-xs">#DanceChallenge2026</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Trending for 28 days, reached 50M+ views</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Insights Tab */}
                <TabsContent value="insights" className="mt-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            AI Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-primary/5 rounded-lg">
                            <p className="text-sm leading-relaxed">
                              <strong>Pattern Detected:</strong> Dance trends originating from Gen Z creators in the Midwest are 2.3x more likely to go viral nationally.
                            </p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm leading-relaxed">
                              <strong>Timing Insight:</strong> Wednesday evening posts (7-9 PM) have 40% higher engagement rates for comedy content.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Success Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">High engagement in first 24h</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Authentic Gen Z voice</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                            <Minus className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">Trending sound usage</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm">Overly produced content</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-primary" />
                            Next Big Opportunity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mb-4">
                            <div className="text-3xl font-bold text-primary">#DanceTok2026</div>
                            <p className="text-sm font-medium mt-1">Predicted to Explode</p>
                            <p className="text-xs text-muted-foreground">98% viral potential • Peaks in 7 days</p>
                          </div>

                          <div className="space-y-3">
                            <Button className="w-full gap-2">
                              <Camera className="h-4 w-4" />
                              Start Creating
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                              <Eye className="h-4 w-4" />
                              View Similar Content
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                              <Hash className="h-4 w-4" />
                              Get Hashtags
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
