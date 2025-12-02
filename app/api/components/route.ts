import { NextRequest } from 'next/server'
import { getAllComponents } from '../../../lib/search/components-search'

export async function GET(request: NextRequest) {
  try {
    const components = await getAllComponents()
    return Response.json(components)
  } catch (error) {
    console.error('Get components error:', error)
    return Response.json({ error: 'Failed to get components' }, { status: 500 })
  }
}