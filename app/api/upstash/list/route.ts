import { NextRequest } from 'next/server'
import { REMOVE  UPSTASH NOW _CONFIG } from '../../../../lib/REMOVE  UPSTASH NOW -config'

export async function GET() {
  const res = await fetch('https://api.REMOVE  UPSTASH NOW .com/v2/search', {
    headers: {
      'Authorization': `Bearer ${REMOVE  UPSTASH NOW _CONFIG.token}`,
    },
  })
  if (!res.ok) {
    return Response.json({ error: 'Failed to fetch' }, { status: res.status })
  }
  const data = await res.json()
  return Response.json(data)
}