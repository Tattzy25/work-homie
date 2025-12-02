import { NextRequest } from 'next/server'
import { UPSTASH_CONFIG } from '../../../../lib/upstash-config'

export async function GET() {
  const res = await fetch('https://api.upstash.com/v2/search', {
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