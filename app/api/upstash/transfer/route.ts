import { NextRequest } from 'next/server'
import { REMOVE  UPSTASH NOW _CONFIG } from '../../../../lib/REMOVE  UPSTASH NOW -config'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return Response.json({ error: 'id required' }, { status: 400 })
  }
  const body = await request.json()
  const res = await fetch(`https://api.REMOVE  UPSTASH NOW .com/v2/search/${id}/transfer`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REMOVE  UPSTASH NOW _CONFIG.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    return Response.json({ error: 'Failed to transfer' }, { status: res.status })
  }
  const data = await res.json()
  return Response.json(data)
}