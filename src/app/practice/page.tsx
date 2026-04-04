import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Practice | Elliniká' }

const GAMES = [
  {
    href: '/practice/drill',
    title: 'Verb Drill',
    subtitle: 'Κλίση Ρημάτων',
    description: 'Given a natural English sentence like "How would you say: I would go?", type the correct Greek verb form. Covers all 12 tenses across every person.',
    badge: 'Type answer',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.25)',
    bg: 'rgba(124,58,237,0.12)',
    icon: '⚡',
    level: 'Intermediate+',
  },
  {
    href: '/practice/vocab',
    title: 'Vocabulary Quiz',
    subtitle: 'Λεξιλόγιο',
    description: 'Multiple-choice quiz on verbs, nouns, and adjectives. Toggle between Greek → English and English → Greek. Builds word recognition in both directions.',
    badge: 'Multiple choice',
    color: '#0D5EAF',
    glow: 'rgba(13,94,175,0.25)',
    bg: 'rgba(13,94,175,0.12)',
    icon: '📖',
    level: 'All levels',
  },
  {
    href: '/practice/fill',
    title: 'Fill in the Blank',
    subtitle: 'Συμπλήρωσε',
    description: "Complete authentic Greek sentences by typing the missing word. Three difficulty levels from simple nouns to complex verb forms. Grammar notes after each answer.",
    badge: 'AI-powered',
    color: '#059669',
    glow: 'rgba(5,150,105,0.25)',
    bg: 'rgba(5,150,105,0.12)',
    icon: '✏️',
    level: 'All levels',
  },
  {
    href: '/practice/think',
    title: 'Σκέψου Ελληνικά',
    subtitle: 'Think in Greek',
    description: "Build Greek sentences from scratch. You're given an English phrase and building-block hints — you produce the Greek. No multiple choice, no shortcuts.",
    badge: 'AI-powered',
    color: '#0D5EAF',
    glow: 'rgba(13,94,175,0.25)',
    bg: 'rgba(13,94,175,0.12)',
    icon: '🧠',
    level: 'All levels',
  },
  {
    href: '/practice/idioms',
    title: 'Idiom Quiz',
    subtitle: 'Ιδιωματισμοί',
    description: 'Greek idioms have wild literal meanings. Given the literal translation, pick what Greeks actually mean by it. 4 choices per idiom.',
    badge: 'Multiple choice',
    color: '#d97706',
    glow: 'rgba(217,119,6,0.25)',
    bg: 'rgba(217,119,6,0.12)',
    icon: '🎯',
    level: 'All levels',
  },
  {
    href: '/practice/assess',
    title: 'Level Assessment',
    subtitle: 'Εκτίμηση Επιπέδου',
    description: '7 multiple-choice questions spanning A1 to B2. Find your CEFR level and get personalised practice recommendations.',
    badge: 'AI-powered',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.25)',
    bg: 'rgba(124,58,237,0.12)',
    icon: '🏆',
    level: 'All levels',
  },
]

export default function PracticePage() {
  return (
    <main className="min-h-dvh bg-mesh">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        {/* Header */}
        <div className="mb-10 animate-fade-up flex items-center gap-4">
          <div className="glass flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl glow-blue" style={{ color: '#0D5EAF' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-blue">Practice</h1>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Six ways to train your Greek — from vocab to full sentences
            </p>
          </div>
        </div>

        {/* Game cards */}
        <div className="perspective flex flex-col gap-4 animate-fade-up delay-100">
          {GAMES.map((game, i) => (
            <Link
              key={game.href}
              href={game.href}
              className={`glass rounded-3xl p-6 card-3d group block delay-${Math.min((i + 1) * 100, 600)}`}
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: game.bg, boxShadow: `0 4px 20px ${game.glow}` }}
                >
                  {game.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                    <h2 className="text-xl font-bold greek-text" style={{ color: game.color }}>{game.title}</h2>
                    <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{game.subtitle}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground)' }}>
                    {game.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full px-3 py-0.5 text-xs font-semibold text-white" style={{ background: game.color }}>
                      {game.badge}
                    </span>
                    <span className="glass rounded-full px-3 py-0.5 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                      {game.level}
                    </span>
                  </div>
                </div>

                <svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                  style={{ color: game.color }}
                >
                  <path d="M4 10h12M10 4l6 6-6 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Approach tip */}
        <div className="glass rounded-2xl p-5 mt-8 animate-fade-up delay-400 border-l-4" style={{ borderLeftColor: '#0D5EAF' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
            The Elliniká approach
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            The fastest path to fluency is active production — not passive recognition. Start with Vocabulary Quiz and Fill in the Blank to build your base, then push yourself with Verb Drill and Think in Greek to construct the language from scratch.
          </p>
        </div>
      </div>
    </main>
  )
}
