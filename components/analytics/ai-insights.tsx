import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Zap, Target, TrendingUp } from "lucide-react"

interface InsightData {
  type: "critical" | "warning" | "info" | "success"
  message: string
}

interface PredictionData {
  day: string
  time: string
  potential: "High" | "Medium" | "Low"
}

interface AIInsightsProps {
  recommendations: InsightData[]
  predictions: PredictionData[]
  viralPotential?: number
  className?: string
}

export function AIInsights({
  recommendations,
  predictions,
  viralPotential = 87,
  className
}: AIInsightsProps) {
  return (
    <div className={`grid gap-6 lg:grid-cols-2 ${className}`}>
      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((insight, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  insight.type === 'critical' ? 'bg-destructive/10 border border-destructive/20' :
                  insight.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                  insight.type === 'info' ? 'bg-blue-500/10 border border-blue-500/20' :
                  'bg-green-500/10 border border-green-500/20'
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                    insight.type === 'critical' ? 'text-destructive' :
                    insight.type === 'warning' ? 'text-yellow-600' :
                    insight.type === 'info' ? 'text-blue-600' :
                    'text-green-600'
                  }`}
                />
                <p className="text-sm leading-relaxed">{insight.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">
                {viralPotential}%
              </div>
              <p className="text-sm font-medium">Next Video Viral Potential</p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on current trends and your content style
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Optimal Posting Times</h3>
              {predictions.map((slot, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">{slot.day} {slot.time}</p>
                    <p className="text-xs text-muted-foreground">Engagement Potential</p>
                  </div>
                  <Badge
                    variant={slot.potential === "High" ? "default" : "secondary"}
                  >
                    {slot.potential}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-green-800">Performance Forecast</h4>
              </div>
              <p className="text-sm text-green-700">
                Expected growth: +23% views, +15% engagement over next 30 days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
