import { createClient } from '@/lib/supabase/server'

// GET — list user's recent sessions (newest first, last 10)
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('chat_sessions')
    .select('id, created_at, updated_at, messages')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(10)

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Return sessions with a preview (first user message)
  const sessions = (data ?? []).map((s) => {
    const msgs = Array.isArray(s.messages) ? s.messages : []
    const firstUser = msgs.find((m: { role: string; content: string }) => m.role === 'user')
    return {
      id: s.id,
      created_at: s.created_at,
      updated_at: s.updated_at,
      preview: firstUser?.content?.slice(0, 60) ?? 'New conversation',
      messageCount: msgs.length,
    }
  })

  return Response.json({ sessions })
}

// POST — create a new empty session
export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({ user_id: user.id, messages: [] })
    .select('id')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ id: data.id })
}
