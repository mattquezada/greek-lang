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
    <main className="min-h-dvh bg-mesh">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-up flex items-center gap-4">
          <div
            className="glass flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl glow-blue"
            style={{ color: '#0D5EAF' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-blue">Verb Conjugation</h1>
            <p className="mt-0.5 text-sm greek-text" style={{ color: 'var(--muted-foreground)' }}>
              Ρήματα — Full tables across all tenses
            </p>
          </div>
        </div>

        {/* Aspect tip */}
        <div className="glass rounded-2xl px-5 py-4 mb-6 border-l-4 animate-fade-up delay-100" style={{ borderLeftColor: '#0D5EAF' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
            About Greek Verb Aspects
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Greek verbs have two aspects:{' '}
            <strong style={{ color: 'var(--foreground)' }}>imperfective</strong> (ongoing/repeated) and{' '}
            <strong style={{ color: 'var(--foreground)' }}>perfective</strong> (completed). The imperfective stem is used for Present and Imperfect; the perfective stem for Aorist and Future.
          </p>
        </div>

        {/* Count badge */}
        <div className="mb-6 flex items-center gap-2 animate-fade-up delay-200">
          <span className="glass rounded-full px-4 py-1.5 text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {verbs.length} verbs loaded
          </span>
        </div>

        <VerbSearch initialVerbs={verbs} />
      </div>
    </main>
  )
}
