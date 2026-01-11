"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { BarChart3, TrendingUp, MessageSquare, Heart, Share, Lightbulb, Upload } from "lucide-react"

interface AnalysisResult {
  views: number
  likes: number
  comments: number
  shares: number
  engagement: number
  recommendations: string[]
}

export function ContentAnalysis() {
  const [videoUrl, setVideoUrl] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeContent = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/trend-pilot/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      })
      if (!response.ok) throw new Error("Failed to analyze content")
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getEngagementColor = (rate: number) => {
    if (rate >= 15) return "text-green-600"
    if (rate >= 10) return "text-yellow-600"
    return "text-red-600"
  }

  const getEngagementLabel = (rate: number) => {
    if (rate >= 15) return "Excellent"
    if (rate >= 10) return "Good"
    if (rate >= 5) return "Average"
    return "Needs Improvement"
  }

  return (
    <div className="space-y-8">
      <FeatureCard
        title="AI Content Performance Analysis"
        description="Get detailed insights into your TikTok video performance with comprehensive analytics, engagement metrics, and actionable AI recommendations."
        icon={BarChart3}
        badge="Analytics"
        action={{
          label: "Analyze Content",
          onClick: analyzeContent,
          variant: loading ? "secondary" : "default"
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="text-sm font-medium">TikTok Video URL</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@username/video/123456789"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
        </div>
      </FeatureCard>

      {analysis && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <MetricCard
                      title="Views"
                      value={analysis.views.toLocaleString()}
                      icon={TrendingUp}
                    />
                    <MetricCard
                      title="Likes"
                      value={analysis.likes.toLocaleString()}
                      icon={Heart}
                    />
                  </div>
                  <div className="space-y-4">
                    <MetricCard
                      title="Comments"
                      value={analysis.comments.toLocaleString()}
                      icon={MessageSquare}
                    />
                    <MetricCard
                      title="Shares"
                      value={analysis.shares.toLocaleString()}
                      icon={Share}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Analysis */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Engagement Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Engagement Rate</span>
                  <Badge variant={analysis.engagement >= 10 ? "default" : "secondary"}>
                    {getEngagementLabel(analysis.engagement)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0%</span>
                    <span className={`font-semibold ${getEngagementColor(analysis.engagement)}`}>
                      {analysis.engagement}% Engagement
                    </span>
                    <span>20%+</span>
                  </div>
                  <Progress value={analysis.engagement * 5} className="w-full h-3" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Engagement rate is calculated as (likes + comments + shares) / views × 100
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{rec}</span>
                </div>
              ))}
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Pro Tip:</strong> Videos with engagement rates above 10% are considered high-performing on TikTok.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!analysis && !loading && !error && (
        <Card className="border-dashed border-border/50 bg-muted/20">
          <CardContent className="py-16 text-center">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Content Performance Analysis</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Paste a TikTok video URL above to get comprehensive performance analytics, engagement insights, and AI-powered recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
