import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, TrendingUp, TrendingDown } from "lucide-react"

interface CompetitorData {
  name: string
  followers: string
  views: string
  engagement: string
  trend: "up" | "down" | "neutral"
}

interface CompetitorAnalysisProps {
  title: string
  competitors: CompetitorData[]
  className?: string
}

export function CompetitorAnalysis({
  title,
  competitors,
  className
}: CompetitorAnalysisProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Avg. Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((competitor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{competitor.name}</TableCell>
                  <TableCell>{competitor.followers}</TableCell>
                  <TableCell>{competitor.views}</TableCell>
                  <TableCell>{competitor.engagement}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {competitor.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : competitor.trend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      ) : null}
                      <Badge
                        variant={competitor.trend === "up" ? "default" : "secondary"}
                        className={competitor.trend === "down" ? "bg-destructive/10 text-destructive" : ""}
                      >
                        {competitor.trend === "up" ? "Growing" :
                         competitor.trend === "down" ? "Declining" : "Stable"}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 p-4 bg-muted/20 rounded-lg">
          <h4 className="font-semibold mb-2">Competitive Insights</h4>
          <p className="text-sm text-muted-foreground">
            Your engagement rate outperforms 70% of similar creators.
            Focus on maintaining authentic content while experimenting with trending formats.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
