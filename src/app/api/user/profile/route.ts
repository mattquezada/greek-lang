import { createClient, createServiceClient } from '@/lib/supabase/server'

// GET — fetch (or create) user progress, updating streak on each visit
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createServiceClient()

  const { data: existing } = await admin
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  if (!existing) {
    // First visit — create row
    const { data: created } = await admin
      .from('user_progress')
      .insert({
        user_id: user.id,
        streak_days: 1,
        longest_streak: 1,
        last_active: new Date().toISOString(),
        level: 'unset',
        practice_sessions: 0,
      })
      .select()
      .single()
    return Response.json(created)
  }

  // Streak logic
  const lastDate = existing.last_active
    ? new Date(existing.last_active).toISOString().split('T')[0]
    : null

  let newStreak = existing.streak_days ?? 0

  if (lastDate === today) {
    // Already visited today — no change
  } else {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (lastDate === yesterdayStr) {
      newStreak = (existing.streak_days ?? 0) + 1
    } else {
      newStreak = 1
    }
  }

  const newLongest = Math.max(newStreak, existing.longest_streak ?? 0)

  const { data: updated } = await admin
    .from('user_progress')
    .update({
      streak_days: newStreak,
      longest_streak: newLongest,
      last_active: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .select()
    .single()

  return Response.json(updated)
}

// PATCH — update level or increment practice_sessions
export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const admin = createServiceClient()

  // Upsert in case row doesn't exist yet
  const { data, error } = await admin
    .from('user_progress')
    .upsert({ user_id: user.id, ...body }, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
