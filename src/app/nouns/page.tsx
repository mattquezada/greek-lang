import { createClient } from '@/lib/supabase/server'
import NounSearch from '@/components/nouns/NounSearch'

export const metadata = {
  title: 'Greek Nouns | Elliniká',
  description: 'Learn Greek noun declensions by case',
}

export default async function NounsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('nouns').select('*').order('id').limit(50)
  const nouns = data ?? []

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Nouns
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Ουσιαστικά — Learn noun declensions by case
        </p>
      </div>

      {/* Explainer */}
      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--card)',
          color: 'var(--muted-foreground)',
        }}
      >
        Greek has 4 cases: <strong style={{ color: 'var(--foreground)' }}>Nominative</strong> (subject),{' '}
        <strong style={{ color: 'var(--foreground)' }}>Genitive</strong> (possession),{' '}
        <strong style={{ color: 'var(--foreground)' }}>Accusative</strong> (object),{' '}
        <strong style={{ color: 'var(--foreground)' }}>Vocative</strong> (address). Nouns change their ending
        based on the case.
      </div>

      {/* Count badge */}
      <div className="mb-6 flex items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-sm font-medium"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
        >
          {nouns.length} nouns loaded
        </span>
      </div>

      {/* Search + list */}
      <NounSearch initialNouns={nouns} />
    </main>
  )
}
