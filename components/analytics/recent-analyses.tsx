import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface AnalysisData {
  title: string
  score: number
  status: "Excellent" | "Good" | "Average" | "Needs Work"
  time: string
}

interface RecentAnalysesProps {
  title: string
  analyses: AnalysisData[]
  className?: string
}

export function RecentAnalyses({
  title,
  analyses,
  className
}: RecentAnalysesProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.map((analysis, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="space-y-1">
                <h3 className="font-medium">{analysis.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Score: {analysis.score}/100</span>
                  <span>•</span>
                  <span>{analysis.time}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    analysis.status === "Excellent" ? "default" :
                    analysis.status === "Good" ? "secondary" :
                    analysis.status === "Average" ? "outline" :
                    "destructive"
                  }
                  className={analysis.status === "Needs Work" ? "bg-orange-50 text-orange-700" : ""}
                >
                  {analysis.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
