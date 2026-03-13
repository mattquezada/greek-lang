import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  const secret = process.env.SEED_SECRET

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(
    {
      message:
        'Seed data is already in Supabase — use the MCP tool to add more data directly.',
    },
    { status: 200 }
  )
}
