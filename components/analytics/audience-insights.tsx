import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"

interface DemographicData {
  label: string
  percentage: number
  color?: string
}

interface AudienceInsightsProps {
  title: string
  demographics: DemographicData[]
  className?: string
}

export function AudienceInsights({
  title,
  demographics,
  className
}: AudienceInsightsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {demographics.map((demo, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{demo.label}</span>
                <span className="font-medium">{demo.percentage}%</span>
              </div>
              <Progress value={demo.percentage} className="h-2" />
            </div>
          ))}

          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <h4 className="font-semibold mb-2">Audience Insights</h4>
            <p className="text-sm text-muted-foreground">
              💡 <strong>Analysis:</strong> Your primary audience is young adults (18-34) with strong engagement from Gen Z.
              Consider content strategies that resonate with trending challenges and authentic storytelling.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
