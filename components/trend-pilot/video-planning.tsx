"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import { Calendar as CalendarIcon, Sparkles, Target, Hash, Lightbulb, Wand2, Clock, Save } from "lucide-react"

interface VideoPlan {
  title: string
  description: string
  trend: string
  scheduledDate: string
  hashtags: string[]
  tips: string[]
}

export function VideoPlanning() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTrend, setSelectedTrend] = useState("")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date())
  const [plan, setPlan] = useState<VideoPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generatePlan = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/trend-pilot/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          trend: selectedTrend,
          scheduledDate: scheduledDate?.toISOString()
        }),
      })
      if (!response.ok) throw new Error("Failed to generate plan")
      const data = await response.json()
      setPlan(data.plan)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const mockTrends = [
    "#DanceChallenge2026",
    "AI Content Creation",
    "Sustainable Fashion Haul",
    "Virtual Reality Experiences",
    "Mental Health Awareness"
  ]

  return (
    <div className="space-y-8">
      <FeatureCard
        title="AI Video Planning Assistant"
        description="Create data-driven content plans with trend insights, optimal scheduling, and viral potential analysis using advanced AI algorithms."
        icon={CalendarIcon}
        badge="Planning"
        action={{
          label: "Generate AI Plan",
          onClick: generatePlan,
          variant: loading ? "secondary" : "default"
        }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Video Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My Epic Dance Challenge Entry"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trend" className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Related Trend
              </Label>
              <Select value={selectedTrend} onValueChange={setSelectedTrend} disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a trending topic" />
                </SelectTrigger>
                <SelectContent>
                  {mockTrends.map((trend) => (
                    <SelectItem key={trend} value={trend}>
                      {trend}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Schedule Date
              </Label>
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={setScheduledDate}
                className="rounded-md border w-full"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Video Concept Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your video idea, target audience, and what makes it unique..."
            rows={4}
            className="resize-none"
            disabled={loading}
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="lg" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
      </FeatureCard>

      {plan && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Plan Overview */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Content Plan Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{plan.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{plan.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Trend:</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {plan.trend}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Scheduled:</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(plan.scheduledDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hashtags & Tips */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" />
                  Recommended Hashtags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {plan.hashtags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors"
                      onClick={() => navigator.clipboard.writeText(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Click any hashtag to copy it to your clipboard
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Success Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!plan && !loading && !error && (
        <Card className="border-dashed border-border/50 bg-muted/20">
          <CardContent className="py-16 text-center">
            <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Plan Your Next Viral Video</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Fill in your video details above and let AI generate a comprehensive content strategy with optimal timing and hashtags.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
