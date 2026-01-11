import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

interface QualityScoreProps {
  score: number
  title: string
  description: string
  metrics: Array<{
    label: string
    value: number
    maxValue?: number
  }>
  className?: string
}

export function QualityScore({
  score,
  title,
  description,
  metrics,
  className
}: QualityScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "hsl(var(--chart-1))"
    if (score >= 80) return "hsl(var(--chart-2))"
    if (score >= 70) return "hsl(var(--chart-3))"
    return "hsl(var(--destructive))"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: "default" as const, label: "Excellent" }
    if (score >= 80) return { variant: "secondary" as const, label: "Good" }
    if (score >= 70) return { variant: "outline" as const, label: "Average" }
    return { variant: "destructive" as const, label: "Needs Work" }
  }

  const badge = getScoreBadge(score)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold`} style={{ color: getScoreColor(score) }}>
              {score}
            </div>
            <p className="text-muted-foreground mt-2">Out of 100</p>
            <Badge variant={badge.variant} className="mt-3">
              {badge.label}
            </Badge>
          </div>

          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <span className="font-medium">
                    {metric.value}{metric.maxValue ? `/${metric.maxValue}` : ""}
                  </span>
                </div>
                <Progress
                  value={metric.maxValue ? (metric.value / metric.maxValue) * 100 : metric.value}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
