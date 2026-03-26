import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Practice | Elliniká' }

const GAMES = [
  {
    href: '/practice/think',
    title: 'Σκέψου Ελληνικά',
    subtitle: 'Think in Greek',
    description: 'Build Greek sentences from scratch. You\'re given an English phrase and building-block hints — you produce the Greek. No multiple choice, no shortcuts.',
    badge: 'AI-powered',
    badgeColor: '#0D5EAF',
    icon: '🧠',
    level: 'All levels',
  },
  {
    href: '/practice/drill',
    title: 'Verb Drill',
    subtitle: 'Κλίση Ρημάτων',
    description: 'Fast-fire conjugation practice. Given a verb, tense, and person — produce the correct form. Tests your mastery of all tenses and aspects.',
    badge: 'Database',
    badgeColor: '#7c3aed',
    icon: '⚡',
    level: 'Intermediate',
  },
  {
    href: '/practice/idioms',
    title: 'Idiom Quiz',
    subtitle: 'Ιδιωματισμοί',
    description: 'Greek idioms have wild literal meanings. Given the literal translation, pick what Greeks actually mean by it. 4 choices per idiom.',
    badge: 'Multiple choice',
    badgeColor: '#059669',
    icon: '🎯',
    level: 'All levels',
  },
]

export default function PracticePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Practice
        </h1>
        <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
          Active practice that trains you to think and produce Greek — not just recognize it.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {GAMES.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="group rounded-2xl border p-6 transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{game.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h2 className="text-xl font-bold greek-text" style={{ color: game.badgeColor }}>
                    {game.title}
                  </h2>
                  <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                    {game.subtitle}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--foreground)' }}>
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: game.badgeColor }}
                  >
                    {game.badge}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                  >
                    {game.level}
                  </span>
                </div>
              </div>
              <svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                className="flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="mt-8 rounded-xl border p-5"
        style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
          The Elliniká approach
        </p>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          The fastest path to fluency is active production — not passive recognition. These games force you to construct Greek from scratch, building the neural pathways that make the language feel natural.
        </p>
      </div>
    </main>
  )
}
