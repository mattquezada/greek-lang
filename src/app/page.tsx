import Link from 'next/link'

const features = [
  {
    emoji: '🔤',
    title: 'Alphabet Trainer',
    description: 'Learn all 24 letters of the Greek alphabet with pronunciation, examples, and an interactive quiz.',
    href: '/alphabet',
  },
  {
    emoji: '📖',
    title: 'Verb Conjugation',
    description: 'Look up any Greek verb and see full conjugation tables across all tenses and voices.',
    href: '/verbs',
  },
  {
    emoji: '💬',
    title: 'AI Tutor Chat',
    description: 'Practice conversational Greek with Eleni, your AI language tutor, available 24/7.',
    href: '/chat',
  },
  {
    emoji: '🗣️',
    title: 'Idioms & Phrases',
    description: 'Master everyday Greek expressions, their literal meanings, and real usage in context.',
    href: '/idioms',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
        <div
          className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-white"
          style={{ backgroundColor: '#0D5EAF' }}
        >
          Modern Greek · Νέα Ελληνικά
        </div>
        <h1
          className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl"
          style={{ color: 'var(--foreground)' }}
        >
          Learn Modern Greek
        </h1>
        <p
          className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>
            Καλώς ήρθατε!
          </span>{' '}
          Welcome to Elliniká — your complete toolkit for learning Modern Greek, from the alphabet to
          natural conversation.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/alphabet"
            className="rounded-xl px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            Start with the Alphabet
          </Link>
          <Link
            href="/chat"
            className="rounded-xl border px-8 py-3 text-base font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            Try AI Tutor
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2
          className="mb-8 text-center text-2xl font-semibold"
          style={{ color: 'var(--foreground)' }}
        >
          Everything you need to learn Greek
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="mb-3 text-4xl">{f.emoji}</div>
              <h3
                className="mb-2 text-base font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {f.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {f.description}
              </p>
              <div
                className="mt-4 text-sm font-medium"
                style={{ color: '#0D5EAF' }}
              >
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t py-16 text-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Ready to speak Greek?{' '}
          <Link href="/chat" className="font-semibold underline" style={{ color: '#0D5EAF' }}>
            Chat with Eleni now
          </Link>
        </p>
      </section>
    </div>
  )
}
