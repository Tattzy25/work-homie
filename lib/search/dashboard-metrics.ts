import { getComponentIndexInfo } from "./components-search"

export type DashboardMetrics = {
  documents: number | null
  requests: number | null
  storageBytes: number | null
  cost: number | null
}

function findNumber(obj: unknown, keys: string[]): number | null {
  if (!obj || typeof obj !== "object") return null
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const lower = k.toLowerCase()
    if (keys.some((needle) => lower.includes(needle.toLowerCase()))) {
      if (typeof v === "number") return v
      if (typeof v === "string" && !isNaN(Number(v))) return Number(v)
    }
    if (v && typeof v === "object") {
      const nested: number | null = findNumber(v, keys)
      if (nested !== null) return nested
    }
  }
  return null
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  let documents: number | null = null
  let requests: number | null = null
  let storageBytes: number | null = null
  let cost: number | null = null

  try {
    const info: unknown = await getComponentIndexInfo()
    console.log("Dashboard metrics info:", info)

    documents = findNumber(info, ["documents", "docs", "documentcount", "document_count", "count", "documentCount"]) ?? null
    requests = findNumber(info, ["requests", "request_count", "reqs", "requests_count"]) ?? null
    storageBytes = findNumber(info, ["bytes", "total_bytes", "size", "disk", "storage_bytes", "diskSize"]) ?? null
    cost = findNumber(info, ["cost", "billing", "price", "charges"]) ?? null

    // Some Upstash responses expose per-index objects; try those too
    if (documents === null) {
      const maybeInfo = info as { indexes?: unknown; namespaces?: unknown } | null | undefined
      if (maybeInfo?.indexes) {
        documents = findNumber(maybeInfo.indexes, ["documents", "docs", "documentcount", "count", "documentCount"]) ?? documents
      } else if (maybeInfo?.namespaces) {
        documents = findNumber(maybeInfo.namespaces, ["documents", "docs", "documentcount", "count", "documentCount"]) ?? documents
      }
    }

    console.log("Extracted metrics:", { documents, requests, storageBytes, cost })
  } catch (error) {
    console.error("Error getting dashboard metrics:", error)
    // Silent fallback - metrics will be null
  }

  return { documents, requests, storageBytes, cost }
}
