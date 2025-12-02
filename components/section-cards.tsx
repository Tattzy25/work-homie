import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getDashboardMetrics } from "@/lib/search/dashboard-metrics"

async function formatBytes(n: number | null | undefined) {
  if (!n || n === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  let i = 0
  let value = n
  while (value >= 1024 && i < units.length - 1) {
    value = value / 1024
    i++
  }
  return `${Number(value.toFixed(2))} ${units[i]}`
}

function findNumber(obj: any, keys: string[]): number | null {
  if (!obj || typeof obj !== "object") return null
  for (const k of Object.keys(obj)) {
    const lower = k.toLowerCase()
    if (keys.some((needle) => lower.includes(needle))) {
      const val = obj[k]
      if (typeof val === "number") return val
      if (typeof val === "string" && !isNaN(Number(val))) return Number(val)
    }
    if (typeof obj[k] === "object") {
      const nested: number | null = findNumber(obj[k], keys)
      if (nested !== null) return nested
    }
  }
  return null
}

export async function SectionCards() {
  // Use centralized helper to fetch & parse the metrics
  const { documents: docs, requests: reqs, storageBytes: bytes, cost } = await getDashboardMetrics()

  // Show actual values when available, otherwise show an explicit '—' placeholder
  const documentsDetail = docs !== null ? String(docs) : "—"
  const requestsDetail = reqs !== null ? String(reqs) : "—"
  const storageUsed = bytes !== null ? await formatBytes(bytes) : "—"
  const storageDetail = bytes !== null ? storageUsed : "—"
  const costTitle = cost !== null ? `$${Number(cost).toFixed(2)}` : "—"

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Documents</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {documentsDetail}
          </CardTitle>
          <CardAction>
            {/* live numeric data shown above; no placeholder percent */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Activity this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Requests</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {requestsDetail}
          </CardTitle>
          <CardAction>
            {/* requests metric displayed above; no placeholder percent */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Request activity this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Storage</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {storageUsed}
          </CardTitle>
          <CardAction>
            {/* storage metric displayed above */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Storage usage trend <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{storageDetail}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cost</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {costTitle}
          </CardTitle>
          <CardAction>
            {/* cost metric displayed above */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cost overview <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
