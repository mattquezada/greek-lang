import { createClient } from '@/lib/supabase/server'
import AdjectiveSearch from '@/components/adjectives/AdjectiveSearch'

export const metadata = {
  title: 'Greek Adjectives | Elliniká',
  description: 'Learn Greek adjective declensions across all genders and cases',
}

export default async function AdjectivesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('adjectives').select('*').order('id').limit(100)
  const adjectives = data ?? []

  return (
    <main className="min-h-dvh bg-mesh">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-start gap-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl"
            style={{ background: 'linear-gradient(135deg, #db2777, #f472b6)', boxShadow: '0 0 20px rgba(219,39,119,0.35)' }}
          >
            🌸
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient-blue">Greek Adjectives</h1>
            <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Επίθετα — Declensions across gender, number, and case
            </p>
          </div>
        </div>

        <div
          className="glass mb-6 rounded-2xl px-5 py-4 text-sm"
          style={{ borderLeft: '3px solid #db2777', color: 'var(--muted-foreground)' }}
        >
          Greek adjectives agree with the noun they describe in{' '}
          <strong style={{ color: 'var(--foreground)' }}>gender</strong> (masculine/feminine/neuter),{' '}
          <strong style={{ color: 'var(--foreground)' }}>number</strong> (singular/plural), and{' '}
          <strong style={{ color: 'var(--foreground)' }}>case</strong> (nominative/genitive/accusative/vocative).
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="glass rounded-full px-3 py-1 text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {adjectives.length} adjectives loaded
          </span>
        </div>

        <AdjectiveSearch initialAdjectives={adjectives} />
      </div>
    </main>
  )
}
