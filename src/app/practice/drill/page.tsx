import { createClient } from '@/lib/supabase/server'
import VerbDrill from '@/components/practice/VerbDrill'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Verb Drill | Elliniká' }

export default async function DrillPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('verbs')
    .select('*')
    .not('conjugations', 'is', null)
    .limit(100)

  const verbs = data ?? []

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <a href="/practice" className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--muted-foreground)' }}>
          ← Practice
        </a>
      </div>
      <VerbDrill verbs={verbs} />
    </main>
  )
}
