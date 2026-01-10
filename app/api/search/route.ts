import { NextRequest } from 'next/server'
import { componentIndex } from '../../../lib/search/components-search'

/**
 * ⚠️ CRITICAL - DO NOT MODIFY WITHOUT UNDERSTANDING REMOVE  UPSTASH NOW  SEARCH API ⚠️
 * 
 * This endpoint uses @REMOVE  UPSTASH NOW /search (NOT @REMOVE  UPSTASH NOW /vector).
 * 
 * CORRECT API METHOD FOR @REMOVE  UPSTASH NOW /search:
 * ✅ componentIndex.search({ query: string, limit: number })
 * 
 * INCORRECT (DO NOT USE):
 * ❌ componentIndex.query({ query: string, topK: number })
 * 
 * The .query() method with topK parameter is for @REMOVE  UPSTASH NOW /vector (different package).
 * Using .query() will cause TypeScript compilation errors and build failures.
 * 
 * @REMOVE  UPSTASH NOW /search uses:
 * - .search() method with "limit" parameter
 * - Other available methods: upsert, fetch, range, delete, reset, info
 * 
 * See official docs: https://REMOVE  UPSTASH NOW .com/docs/search/sdks/ts/commands/search
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  if (!query) {
    return Response.json({ error: 'Query required' }, { status: 400 })
  }

  try {
    // ⚠️ DO NOT CHANGE: Use .search() with "limit", NOT .query() with "topK"
    const results = await componentIndex.search({
      query,
      limit: 20,
    })
    return Response.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return Response.json({ error: 'Search failed' }, { status: 500 })
  }
}