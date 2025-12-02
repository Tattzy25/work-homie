import { NextRequest } from 'next/server'
import { UPSTASH_CONFIG } from '../../../../lib/upstash-config'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return Response.json({ error: 'id required' }, { status: 400 })
  }
  const res = await fetch(`https://api.upstash.com/v2/search/${id}/reset-password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${UPSTASH_CONFIG.token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    return Response.json({ error: 'Failed to reset' }, { status: res.status })
  }
  const data = await res.text()
  return Response.json({ message: data })
}