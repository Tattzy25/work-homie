import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

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

function formatNumber(n: number | null | undefined): string {
  if (n == null || n === undefined) return "—"
  return new Intl.NumberFormat("en-US").format(n)
}

function formatCurrency(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—"
  return `$${Number(n).toFixed(2)}`
}

export async function SectionCards() {
  const { documents, requests, storageBytes, cost } = await getDashboardMetrics()

  const documentsDisplay = formatNumber(documents)
  const requestsDisplay = formatNumber(requests)
  const storageDisplay = storageBytes !== null ? await formatBytes(storageBytes) : "—"
  const costDisplay = formatCurrency(cost)

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Documents</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {documentsDisplay}
          </CardTitle>
          <CardAction>
            {/* Live data from Upstash Search */}
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
            {requestsDisplay}
          </CardTitle>
          <CardAction>
            {/* Live data from Upstash Search */}
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
            {storageDisplay}
          </CardTitle>
          <CardAction>
            {/* Live data from Upstash Search */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Storage usage trend <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{storageDisplay}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cost</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {costDisplay}
          </CardTitle>
          <CardAction>
            {/* Live data from Upstash Search */}
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
