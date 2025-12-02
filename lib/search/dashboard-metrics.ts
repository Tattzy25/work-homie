import { getComponentIndexInfo } from "./components-search"

export type DashboardMetrics = {
  documents: number | null
  requests: number | null
  storageBytes: number | null
  cost: number | null
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

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  let documents: number | null = null
  let requests: number | null = null
  let storageBytes: number | null = null
  let cost: number | null = null

  try {
    const info: any = await getComponentIndexInfo()

    documents = findNumber(info, ["documents", "docs", "documentcount", "document_count", "count"]) ?? null
    requests = findNumber(info, ["requests", "request_count", "reqs", "requests_count"]) ?? null
    storageBytes = findNumber(info, ["bytes", "total_bytes", "size", "disk", "storage_bytes"]) ?? null
    cost = findNumber(info, ["cost", "billing", "price", "charges"]) ?? null

    // Some Upstash responses expose per-index objects; try those too
    if (documents === null) {
      if (info?.indexes) {
        documents = findNumber(info.indexes, ["documents", "docs", "documentcount", "count"]) ?? documents
      } else if (info?.namespaces) {
        documents = findNumber(info.namespaces, ["documents", "docs", "documentcount", "count"]) ?? documents
      }
    }
  } catch (e) {
    // Silent fallback - metrics will be null
  }

  return { documents, requests, storageBytes, cost }
}
