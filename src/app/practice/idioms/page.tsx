import { createClient } from '@/lib/supabase/server'
import IdiomQuiz from '@/components/practice/IdiomQuiz'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Idiom Quiz | Elliniká' }

export default async function IdiomQuizPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('idioms')
    .select('*')
    .not('real_meaning', 'is', null)
    .limit(100)

  const idioms = data ?? []

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <div className="mb-6">
        <a href="/practice" className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--muted-foreground)' }}>
          ← Practice
        </a>
      </div>
      <IdiomQuiz idioms={idioms} />
    </main>
  )
}
