import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Clock
} from "lucide-react"

export default function ShowroomPage() {
  const metrics = [
    {
      title: "Total Views",
      value: "2.4M",
      description: "+12.5% from last month",
      icon: Eye,
      trend: "up" as const,
      trendValue: "12.5%"
    },
    {
      title: "Engagement Rate",
      value: "8.7%",
      description: "Above industry average",
      icon: Heart,
      trend: "up" as const,
      trendValue: "2.1%"
    },
    {
      title: "New Followers",
      value: "15.2K",
      description: "This month",
      icon: Users,
      trend: "up" as const,
      trendValue: "8.3%"
    },
    {
      title: "Video Completions",
      value: "94.2%",
      description: "Average retention",
      icon: Target,
      trend: "up" as const,
      trendValue: "1.8%"
    }
  ]

  const topPerforming = [
    {
      title: "Dance Challenge #Viral2026",
      views: "892K",
      engagement: "12.4%",
      trend: "up" as const,
      change: "+23%"
    },
    {
      title: "Comedy Skit Compilation",
      views: "654K",
      engagement: "9.8%",
      trend: "up" as const,
      change: "+15%"
    },
    {
      title: "Fashion Haul 2026",
      views: "423K",
      engagement: "11.2%",
      trend: "down" as const,
      change: "-5%"
    }
  ]

  const audienceInsights = [
    {
      label: "Age 18-24",
      percentage: 45,
      color: "bg-blue-500"
    },
    {
      label: "Age 25-34",
      percentage: 32,
      color: "bg-green-500"
    },
    {
      label: "Age 35-44",
      percentage: 18,
      color: "bg-orange-500"
    },
    {
      label: "Age 45+",
      percentage: 5,
      color: "bg-purple-500"
    }
  ]

  const competitorAnalysis = [
    {
      name: "Competitor A",
      followers: "2.1M",
      growth: "+8.5%",
      engagement: "7.2%"
    },
    {
      name: "Competitor B",
      followers: "1.8M",
      growth: "+12.1%",
      engagement: "9.1%"
    },
    {
      name: "Competitor C",
      followers: "950K",
      growth: "+15.3%",
      engagement: "11.5%"
    }
  ]

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
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Analytics Showroom</h1>
                  <p className="text-muted-foreground mt-1">
                    Comprehensive TikTok analytics dashboard with competitor insights and performance tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard
                    key={metric.title}
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

            <div className="grid gap-6 lg:grid-cols-2 px-4 lg:px-6">
              {/* Top Performing Content */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Top Performing Content
                  </CardTitle>
                  <CardDescription>
                    Your highest-performing videos this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerforming.map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="space-y-1">
                          <h3 className="font-medium">{video.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {video.engagement}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={video.trend === "up" ? "default" : "secondary"}
                            className={video.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {video.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Audience Demographics */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Audience Demographics
                  </CardTitle>
                  <CardDescription>
                    Breakdown of your audience by age group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceInsights.map((group, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{group.label}</span>
                          <span className="font-medium">{group.percentage}%</span>
                        </div>
                        <Progress value={group.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                    <p className="text-xs text-primary">
                      💡 <strong>Insight:</strong> Your primary audience is Gen Z (18-24), focus on trending challenges and viral content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Competitor Analysis */}
            <div className="px-4 lg:px-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Competitor Analysis
                  </CardTitle>
                  <CardDescription>
                    Performance comparison with similar creators in your niche
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">Creator</th>
                          <th className="text-left py-2 px-4 font-medium">Followers</th>
                          <th className="text-left py-2 px-4 font-medium">Growth</th>
                          <th className="text-left py-2 px-4 font-medium">Engagement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitorAnalysis.map((competitor, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="py-3 px-4 font-medium">{competitor.name}</td>
                            <td className="py-3 px-4">{competitor.followers}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {competitor.growth}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{competitor.engagement}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Features */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  title="Real-time Monitoring"
                  description="Track your content performance as it happens with live analytics updates"
                  icon={Zap}
                  badge="Live"
                  action={{
                    label: "View Live Data",
                    onClick: () => console.log("Opening live monitoring"),
                    variant: "default"
                  }}
                />
                <FeatureCard
                  title="Custom Reports"
                  description="Generate detailed PDF reports for client presentations and strategy planning"
                  icon={BarChart3}
                  badge="Professional"
                  action={{
                    label: "Create Report",
                    onClick: () => console.log("Creating custom report"),
                    variant: "outline"
                  }}
                />
                <FeatureCard
                  title="Performance Alerts"
                  description="Get notified when your content hits milestones or needs attention"
                  icon={TrendingUp}
                  badge="Smart"
                  action={{
                    label: "Configure Alerts",
                    onClick: () => console.log("Configuring alerts"),
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
