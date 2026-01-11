import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface MetricData {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  progress?: number
  target?: string
}

interface MetricsOverviewProps {
  title: string
  metrics: MetricData[]
  className?: string
}

export function MetricsOverview({ title, metrics, className }: MetricsOverviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <metric.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{metric.title}</p>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                {metric.trend && metric.trendValue && (
                  <Badge
                    variant={metric.trend === "up" ? "default" : "secondary"}
                    className={metric.trend === "down" ? "bg-red-50 text-red-700" : ""}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.trendValue}
                  </Badge>
                )}
              </div>

              <div className="text-3xl font-bold">{metric.value}</div>

              {metric.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{metric.progress}%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                  {metric.target && (
                    <p className="text-xs text-muted-foreground">
                      Target: {metric.target}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
