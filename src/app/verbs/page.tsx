import VerbSearch from '@/components/verbs/VerbSearch'

export default function VerbsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
          Verb Conjugation
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--muted-foreground)' }}>
          Search any Greek verb to see full conjugation tables across all tenses and voices.
        </p>
      </div>

      {/* Aspect tip */}
      <div
        className="mb-8 rounded-xl border-l-4 p-4"
        style={{
          backgroundColor: 'var(--muted)',
          borderLeftColor: '#0D5EAF',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          About Greek Verb Aspects
        </p>
        <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Greek verbs have two aspects:{' '}
          <strong style={{ color: 'var(--foreground)' }}>imperfective</strong> (ongoing/repeated action) and{' '}
          <strong style={{ color: 'var(--foreground)' }}>perfective</strong> (completed action). The
          imperfective stem is used for Present and Imperfect tenses; the perfective stem for Aorist and
          Future.
        </p>
      </div>

      {/* Lookup tip */}
      <div
        className="mb-6 rounded-xl border p-4 text-sm"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--muted-foreground)',
        }}
      >
        <span className="mr-2 font-semibold" style={{ color: 'var(--foreground)' }}>
          Tip:
        </span>
        Search works with Greek text (e.g.{' '}
        <span className="greek-text font-medium" style={{ color: '#0D5EAF' }}>
          λέω, είμαι
        </span>
        ) or English translations (e.g. <em>say, eat, go</em>).
      </div>

      <VerbSearch />
    </div>
  )
}
