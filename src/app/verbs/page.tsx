import { createClient } from '@/lib/supabase/server'
import VerbSearch from '@/components/verbs/VerbSearch'

export const metadata = {
  title: 'Greek Verbs | Elliniká',
  description: 'Look up Greek verb conjugations across all tenses and voices',
}

export default async function VerbsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('verbs')
    .select('*')
    .order('greek_text')
    .limit(50)
  const verbs = data ?? []

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
          Verb Conjugation
        </h1>
        <p className="mt-1 text-base" style={{ color: 'var(--muted-foreground)' }}>
          Ρήματα — Search any verb for full conjugation tables
        </p>
      </div>

      {/* Aspect tip */}
      <div
        className="mb-6 rounded-xl border-l-4 px-4 py-3.5"
        style={{
          backgroundColor: 'var(--muted)',
          borderLeftColor: '#0D5EAF',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          About Greek Verb Aspects
        </p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          Greek verbs have two aspects:{' '}
          <strong style={{ color: 'var(--foreground)' }}>imperfective</strong> (ongoing/repeated) and{' '}
          <strong style={{ color: 'var(--foreground)' }}>perfective</strong> (completed). The
          imperfective stem is used for Present and Imperfect; the perfective stem for Aorist and Future.
        </p>
      </div>

      {/* Count badge */}
      <div className="mb-6 flex items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-sm font-medium"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
        >
          {verbs.length} verbs loaded
        </span>
      </div>

      <VerbSearch initialVerbs={verbs} />
    </main>
  )
}
