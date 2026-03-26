import Link from 'next/link'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
      </svg>
    ),
    title: 'Alphabet Trainer',
    description: 'Learn all 24 letters with pronunciation guides and an interactive quiz.',
    href: '/alphabet',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    title: 'Verb Conjugation',
    description: 'Full conjugation tables across all tenses, aspects, and voices.',
    href: '/verbs',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'AI Tutor Chat',
    description: 'Practice conversational Greek with Eleni, your AI language tutor.',
    href: '/chat',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
    title: 'Idioms & Phrases',
    description: 'Master everyday Greek expressions and their real usage in context.',
    href: '/idioms',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:pt-28 sm:pb-20">
        <div
          className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-white tracking-wide uppercase"
          style={{ backgroundColor: '#0D5EAF' }}
        >
          Modern Greek · Νέα Ελληνικά
        </div>
        <h1
          className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ color: 'var(--foreground)', lineHeight: '1.1' }}
        >
          Learn Modern Greek
        </h1>
        <p
          className="mx-auto mb-8 max-w-xl text-lg leading-relaxed sm:text-xl"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>
            Καλώς ήρθατε!
          </span>{' '}
          Your complete toolkit — from the alphabet to natural conversation.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/alphabet"
            className="w-full sm:w-auto rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            Start with the Alphabet
          </Link>
          <Link
            href="/chat"
            className="w-full sm:w-auto rounded-xl border px-7 py-3.5 text-sm font-semibold transition-colors hover:opacity-70"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            Try AI Tutor
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-4xl px-4 pb-20">
        <h2
          className="mb-6 text-center text-lg font-semibold"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Everything you need to learn Greek
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col rounded-2xl border p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(13,94,175,0.1)', color: '#0D5EAF' }}
              >
                {f.icon}
              </div>
              <h3
                className="mb-1.5 text-sm font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {f.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {f.description}
              </p>
              <div
                className="mt-4 flex items-center gap-1 text-xs font-semibold"
                style={{ color: '#0D5EAF' }}
              >
                Explore
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t py-14 text-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
          Ready to speak Greek?{' '}
          <Link href="/chat" className="font-semibold underline underline-offset-2" style={{ color: '#0D5EAF' }}>
            Chat with Eleni now
          </Link>
        </p>
      </section>
    </div>
  )
}
