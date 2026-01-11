"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { TrendDiscovery } from "@/components/trend-pilot/trend-discovery"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { TrendingUp, BarChart3, Calendar, Sparkles } from "lucide-react"

export default function Page() {
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
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Trend Pilot</h1>
                    <p className="text-muted-foreground mt-1">
                      Professional TikTok creator tools for content discovery, analysis, and planning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Overview */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    title="Active Trends"
                    value="247"
                    description="Trending topics this week"
                    icon={TrendingUp}
                    trend="up"
                    trendValue="12%"
                  />
                  <MetricCard
                    title="Avg. Engagement"
                    value="12.8%"
                    description="Across all analyzed content"
                    icon={BarChart3}
                    trend="up"
                    trendValue="2.3%"
                  />
                  <MetricCard
                    title="Posts Planned"
                    value="23"
                    description="Scheduled for this month"
                    icon={Calendar}
                    trend="up"
                    trendValue="5"
                  />
                  <MetricCard
                    title="AI Insights"
                    value="89"
                    description="Generated recommendations"
                    icon={Sparkles}
                    trend="up"
                    trendValue="15"
                  />
                </div>
              </div>

              {/* Trend Discovery */}
              <div className="px-4 lg:px-6">
                <TrendDiscovery />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
