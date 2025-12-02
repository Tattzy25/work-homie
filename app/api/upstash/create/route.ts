import { NextRequest } from 'next/server'
import { UPSTASH_CONFIG } from '../../../../lib/upstash-config'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await fetch('https://api.upstash.com/v2/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${UPSTASH_CONFIG.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    return Response.json({ error: 'Failed to create' }, { status: res.status })
  }
  const data = await res.json()
  return Response.json(data)
}