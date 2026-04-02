import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const quickLinks = [
  {
    href: '/dictionary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Dictionary',
    description: 'Look up any word',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.15)',
  },
  {
    href: '/verbs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    title: 'Verbs',
    description: 'Full conjugation tables',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.15)',
  },
  {
    href: '/nouns',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: 'Nouns',
    description: 'Declension & gender',
    color: '#0D5EAF',
    bg: 'rgba(13,94,175,0.15)',
  },
  {
    href: '/adjectives',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Adjectives',
    description: 'Agreement forms',
    color: '#059669',
    bg: 'rgba(5,150,105,0.15)',
  },
  {
    href: '/alphabet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
      </svg>
    ),
    title: 'Alphabet',
    description: 'All 24 letters',
    color: '#0D5EAF',
    bg: 'rgba(13,94,175,0.15)',
  },
  {
    href: '/chat',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'AI Tutor',
    description: 'Chat with Eleni',
    color: '#059669',
    bg: 'rgba(5,150,105,0.15)',
  },
  {
    href: '/idioms',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
    title: 'Idioms',
    description: 'Authentic expressions',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.15)',
  },
  {
    href: '/grammar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    title: 'Grammar',
    description: 'Rules & structures',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.15)',
  },
  {
    href: '/translate',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8l6 6 6-6" /><path d="M3 3h18M3 21h18" />
      </svg>
    ),
    title: 'Translator',
    description: 'Greek ↔ English',
    color: '#0D5EAF',
    bg: 'rgba(13,94,175,0.15)',
  },
]

const stats = [
  { value: '1,000+', label: 'Words in Database', color: '#0D5EAF', glow: 'rgba(13,94,175,0.3)', icon: '📚' },
  { value: '0', label: 'Day Streak', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)', icon: '🔥' },
  { value: '0', label: 'Practice Sessions', color: '#10b981', glow: 'rgba(16,185,129,0.3)', icon: '⚡' },
  { value: 'A1', label: 'Current Level', color: '#7c3aed', glow: 'rgba(124,58,237,0.3)', icon: '🎯' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const username = user.email?.split('@')[0] ?? 'there'

  return (
    <main className="min-h-dvh bg-mesh pb-20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">

        {/* Greeting */}
        <div className="mb-10 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">
            <span className="text-gradient-blue">Γεια σου, {username}!</span>
          </h1>
          <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
            Ready to practice Greek today?
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 perspective animate-fade-up delay-100">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 card-3d text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold mb-0.5" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick access */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Continue Learning
          </h2>
          <div className="perspective">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-up delay-200">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="glass rounded-2xl p-5 card-3d group flex items-center gap-4"
                >
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: link.bg, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{link.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{link.description}</div>
                  </div>
                  <svg
                    className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: link.color }}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Practice CTA */}
        <div className="glass rounded-3xl p-7 sm:p-8 glow-blue animate-fade-up delay-300 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-5xl animate-float-slow">⚡</div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
              Ready to practice?
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Test your Greek with AI-powered drills, verb conjugation, and idiom quizzes.
            </p>
          </div>
          <Link
            href="/practice"
            className="rounded-xl px-7 py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
          >
            Start Practice
          </Link>
        </div>

      </div>
    </main>
  )
}
