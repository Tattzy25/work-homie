"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import { TrendingUp, ExternalLink, RefreshCw, Zap, Search } from "lucide-react"

interface Trend {
  title: string
  description: string
  url: string
}

export function TrendDiscovery() {
  const [query, setQuery] = useState("TikTok viral trends 2026")
  const [trends, setTrends] = useState<Trend[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const discoverTrends = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/trend-pilot/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      if (!response.ok) throw new Error("Failed to discover trends")
      const data = await response.json()
      setTrends(data.trends || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const quickSearches = [
    "TikTok dance trends",
    "Viral challenges 2026",
    "Popular hashtags",
    "Music trends",
    "Fashion trends"
  ]

  return (
    <div className="space-y-8">
      <FeatureCard
        title="AI-Powered Trend Discovery"
        description="Discover the latest viral trends, hashtags, and challenges that are dominating TikTok right now using advanced AI algorithms."
        icon={TrendingUp}
        badge="Real-time"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query" className="text-sm font-medium">Search Query</Label>
            <div className="flex gap-3">
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., TikTok dance trends 2026"
                className="flex-1"
              />
              <Button
                onClick={discoverTrends}
                disabled={loading}
                size="lg"
              >
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <><Search className="h-4 w-4 mr-2" /> Discover Trends</>}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Searches</Label>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((search) => (
                <Badge
                  key={search}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
        </div>
      </FeatureCard>

      {trends.length > 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                Trending Results
              </CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {trends.length} Results
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trends.map((trend, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{trend.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      #{index + 1} Trending
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {trend.description}
                    </p>
                    <a
                      href={trend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                    >
                      View on TikTok
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {trends.length === 0 && !loading && !error && (
        <Card className="border-dashed border-border/50 bg-muted/20">
          <CardContent className="py-16 text-center">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover TikTok Trends</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a search query or select from quick searches to find the latest viral trends, challenges, and hashtags on TikTok.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
