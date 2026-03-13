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
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Adjectives
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Επίθετα — Declensions across gender, number, and case
        </p>
      </div>

      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
      >
        Greek adjectives agree with the noun they describe in{' '}
        <strong style={{ color: 'var(--foreground)' }}>gender</strong> (masculine/feminine/neuter),{' '}
        <strong style={{ color: 'var(--foreground)' }}>number</strong> (singular/plural), and{' '}
        <strong style={{ color: 'var(--foreground)' }}>case</strong> (nominative/genitive/accusative/vocative).
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-sm font-medium"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
        >
          {adjectives.length} adjectives loaded
        </span>
      </div>

      <AdjectiveSearch initialAdjectives={adjectives} />
    </main>
  )
}
