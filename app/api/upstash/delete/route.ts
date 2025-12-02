import { NextRequest } from 'next/server'
import { UPSTASH_CONFIG } from '../../../../lib/upstash-config'

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return Response.json({ error: 'id required' }, { status: 400 })
  }
  const res = await fetch(`https://api.upstash.com/v2/search/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${UPSTASH_CONFIG.token}`,
    },
  })
  if (!res.ok) {
    return Response.json({ error: 'Failed to delete' }, { status: res.status })
  }
  const data = await res.json()
  return Response.json(data)
}