import { NextRequest } from 'next/server'
import { UPSTASH_CONFIG } from '../../../../lib/upstash-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const period = searchParams.get('period') || '1d'
  if (!id) {
    return Response.json({ error: 'id required' }, { status: 400 })
  }
  const res = await fetch(`https://api.upstash.com/v2/search/${id}/stats?period=${period}`, {
    headers: {
      'Authorization': `Bearer ${UPSTASH_CONFIG.token}`,
    },
  })
  if (!res.ok) {
    return Response.json({ error: 'Failed to fetch' }, { status: res.status })
  }
  const data = await res.json()
  return Response.json(data)
}