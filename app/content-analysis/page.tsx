"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table"
import { ContentAnalysis } from "@/components/trend-pilot/content-analysis"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { BarChart3, Eye, Heart, Target, Zap, History, Search, Layers, Brain, Trophy, TrendingUp } from "lucide-react"

import data from "./data.json"

export default function ContentAnalysisPage() {
  // Configuration - should come from API/props in real app
  const config = {
    header: {
      title: "Content Analysis",
      description: "Professional TikTok creator tools for content analysis, performance tracking, and optimization.",
      icon: BarChart3
    },
    metrics: [
      {
        title: "Videos Analyzed",
        value: "156",
        description: "Total content analyzed",
        icon: Eye,
        trend: "up" as const,
        trendValue: "23"
      },
      {
        title: "Avg. Engagement",
        value: "12.4%",
        description: "Across all analyzed content",
        icon: Heart,
        trend: "up" as const,
        trendValue: "2.1%"
      },
      {
        title: "Top Performer",
        value: "94%",
        description: "Best engagement score",
        icon: Target,
        trend: "up" as const,
        trendValue: "5.2%"
      },
      {
        title: "AI Insights",
        value: "342",
        description: "Optimization recommendations",
        icon: Zap,
        trend: "up" as const,
        trendValue: "67"
      }
    ],
    tabs: [
      {
        id: "history",
        label: "📊 History",
        component: "DataTable"
      },
      {
        id: "analyze",
        label: "🔍 Analyze",
        component: "ContentAnalysis"
      },
      {
        id: "bulk",
        label: "📦 Bulk",
        component: "BulkAnalysis"
      },
      {
        id: "insights",
        label: "🧠 AI Insights",
        component: "AIInsights"
      },
      {
        id: "competitors",
        label: "🏆 Competitors",
        component: "CompetitorAnalysis"
      },
      {
        id: "forecasting",
        label: "📈 Forecasting",
        component: "PerformanceForecasting"
      }
    ]
  }

  return (
    <SidebarProvider className="sidebar-vars">
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-gradient-to-br from-background via-background to-muted/20">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="px-4 lg:px-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <config.header.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">{config.header.title}</h1>
                    <p className="text-muted-foreground mt-1">
                      {config.header.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Overview */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {config.metrics.map((metric, index) => (
                    <MetricCard
                      key={index}
                      title={metric.title}
                      value={metric.value}
                      description={metric.description}
                      icon={metric.icon}
                      trend={metric.trend}
                      trendValue={metric.trendValue}
                    />
                  ))}
                </div>
              </div>

              {/* Feature Tabs */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-6 bg-muted/50 border">
                    <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                      <History className="h-4 w-4" />
                      History
                    </TabsTrigger>
                    <TabsTrigger value="analyze" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Analyze
                    </TabsTrigger>
                    <TabsTrigger value="bulk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Bulk
                    </TabsTrigger>
                    <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Insights
                    </TabsTrigger>
                    <TabsTrigger value="competitors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Competitors
                    </TabsTrigger>
                    <TabsTrigger value="forecasting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Forecasting
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="mt-8">
                    <DataTable data={data} />
                  </TabsContent>
                  <TabsContent value="analyze" className="mt-8">
                    <ContentAnalysis />
                  </TabsContent>
                  <TabsContent value="bulk" className="mt-8">
                    <div className="space-y-6">
                      <div className="grid gap-6">
                        <div className="p-6 border rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Bulk Content Analysis</h3>
                          <p className="text-muted-foreground mb-4">
                            Analyze multiple TikTok videos simultaneously for comprehensive performance insights
                          </p>
                          <div className="space-y-4">
                            <textarea
                              placeholder="Paste TikTok URLs (one per line)..."
                              rows={6}
                              className="w-full p-3 border rounded-md resize-none font-mono text-sm"
                            />
                            <div className="flex gap-3">
                              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                                Start Bulk Analysis
                              </button>
                              <button className="px-4 py-2 border rounded-md">
                                Import CSV
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 border rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Recent Bulk Analyses</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <div>
                                <p className="font-medium">Summer Dance Challenge Batch</p>
                                <p className="text-sm text-muted-foreground">5 videos • 2 hours ago</p>
                              </div>
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">Completed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="insights" className="mt-8">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="p-6 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Advanced AI Recommendations</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-chart-1/10 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="h-2 w-2 rounded-full bg-chart-1 mt-2"></div>
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Optimal Posting Strategy</h4>
                                <p className="text-sm">Post Tuesdays at 7 PM - 340% higher engagement rate detected</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-chart-2/10 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="h-2 w-2 rounded-full bg-chart-2 mt-2"></div>
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Content Style Match</h4>
                                <p className="text-sm">Dance content performs 2.3x better in your audience</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Performance Intelligence</h3>
                        <div className="text-center p-6 bg-primary/5 rounded-lg mb-4">
                          <div className="text-3xl font-bold text-primary">87%</div>
                          <p className="text-sm">Next Video Viral Potential</p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Content Performance by Category</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Dance</span>
                              <span className="font-medium">94%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-chart-3 h-2 rounded-full" style={{width: '94%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="competitors" className="mt-8">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="p-6 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Competitor Intelligence</h3>
                        <div className="grid gap-4 md:grid-cols-2 mb-6">
                          <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <div className="text-2xl font-bold text-primary">Top 15%</div>
                            <p className="text-sm text-muted-foreground">Your Ranking</p>
                          </div>
                          <div className="text-center p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                            <div className="text-2xl font-bold text-chart-3">+23%</div>
                            <p className="text-sm text-muted-foreground">vs Competitors</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Competitor Comparison Matrix</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium text-sm">Engagement Rate</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>You: 12.4%</span>
                                  <span>•</span>
                                  <span>Avg: 8.7%</span>
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-chart-4/10 text-chart-4 border border-chart-4/20 rounded text-xs">
                                +42%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Competitive Advantages</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-primary/5 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">Content Consistency</h4>
                              <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">High Impact</span>
                            </div>
                            <p className="text-sm text-muted-foreground">You post 3x more frequently than competitors</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="forecasting" className="mt-8">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="p-6 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Performance Forecasting</h3>
                        <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mb-4">
                          <div className="text-4xl font-bold text-primary">2.1M</div>
                          <p className="text-sm font-medium">Predicted Views (30 days)</p>
                          <p className="text-xs text-muted-foreground mt-1">+136% growth projected</p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm">Growth Trajectory</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">Week 1</p>
                                <p className="text-xs text-muted-foreground">450K views</p>
                              </div>
                              <span className="px-2 py-1 bg-chart-5/10 text-chart-5 border border-chart-5/20 rounded text-xs">
                                +12%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Optimal Posting Strategy</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-primary/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold text-sm">Tuesday 7:00 PM</p>
                                <p className="text-xs text-muted-foreground">Peak engagement window</p>
                              </div>
                              <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">High</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Expected reach: 2.1M-2.8M viewers</p>
                          </div>
                          <div className="p-4 bg-chart-3/10 border border-chart-3/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-4 w-4 rounded-full bg-chart-3"></div>
                              <h4 className="font-semibold text-chart-3">Success Probability</h4>
                            </div>
                            <p className="text-sm text-chart-3">🎯 87% chance of viral success</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
