import { NextRequest } from 'next/server'
import { componentIndex } from '../../../lib/search/components-search'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  if (!query) {
    return Response.json({ error: 'Query required' }, { status: 400 })
  }

  try {
    const results = await componentIndex.query({
      query,
      topK: 20,
    })
    return Response.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return Response.json({ error: 'Search failed' }, { status: 500 })
  }
}