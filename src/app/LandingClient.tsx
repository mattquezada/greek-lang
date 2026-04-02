'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}


const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
      </svg>
    ),
    title: 'Alphabet Trainer',
    description: 'Master all 24 Greek letters with pronunciation and interactive quizzes.',
    href: '/alphabet',
    color: '#0D5EAF',
    glow: 'rgba(13,94,175,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    title: 'Verb Conjugation',
    description: 'Full conjugation tables across all tenses, aspects, and voices.',
    href: '/verbs',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'AI Tutor Chat',
    description: 'Practice conversational Greek with Eleni, your personal AI tutor.',
    href: '/chat',
    color: '#059669',
    glow: 'rgba(5,150,105,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Dictionary',
    description: 'Search any Greek word — nouns, verbs, adjectives — with full declensions.',
    href: '/dictionary',
    color: '#d97706',
    glow: 'rgba(217,119,6,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Practice Games',
    description: 'Drill verbs, quiz idioms, and think in Greek with AI-powered games.',
    href: '/practice',
    color: '#0D5EAF',
    glow: 'rgba(13,94,175,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
    title: 'Idioms & Phrases',
    description: 'Master authentic Greek expressions and understand them in real context.',
    href: '/idioms',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    title: 'Grammar Reference',
    description: 'Comprehensive grammar rules with examples for every structure.',
    href: '/grammar',
    color: '#059669',
    glow: 'rgba(5,150,105,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8l6 6 6-6" /><path d="M3 3h18M3 21h18" />
      </svg>
    ),
    title: 'Translator',
    description: 'Translate between Greek and English with context-aware suggestions.',
    href: '/translate',
    color: '#d97706',
    glow: 'rgba(217,119,6,0.3)',
  },
]

export default function LandingClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }
    router.push('/dashboard')
  }

  const handleGoogleAuth = async () => {
    setError(null)
    setOauthLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (authError) {
      setError(authError.message)
      setOauthLoading(false)
    }
  }

  return (
    <div className="-mt-24 min-h-dvh bg-mesh-dark overflow-hidden relative">

      {/* Floating Greek letter decorations */}
      <span className="greek-float animate-float-slow text-[7rem] sm:text-[9rem]" style={{ top: '8%', left: '3%' }}>Α</span>
      <span className="greek-float animate-float-medium text-[5rem] sm:text-[7rem] delay-200" style={{ top: '15%', right: '4%' }}>Ω</span>
      <span className="greek-float animate-float-slow text-[4rem] sm:text-[6rem] delay-400" style={{ bottom: '28%', left: '6%' }}>Λ</span>
      <span className="greek-float animate-float-medium text-[6rem] sm:text-[8rem] delay-100" style={{ bottom: '12%', right: '3%' }}>Σ</span>
      <span className="greek-float animate-float-slow text-[3rem] sm:text-[5rem] delay-300" style={{ top: '55%', left: '38%' }}>Δ</span>
      <span className="greek-float animate-float-medium text-[4rem] delay-500" style={{ top: '35%', left: '22%' }}>Θ</span>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient-blue">Ω</span>
          <span className="text-base font-semibold text-white/90">Elliniká</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="text-sm font-medium text-white/70 hover:text-white/100 transition-opacity hidden sm:block"
          >
            Create account
          </Link>
        </div>
      </header>

      {/* Hero + Login */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pt-6 pb-20 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Hero copy */}
          <div className="animate-fade-up">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
              style={{ background: 'rgba(13,94,175,0.25)', border: '1px solid rgba(59,130,212,0.35)', color: '#3b82d4' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Modern Greek · Νέα Ελληνικά
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
              <span className="text-gradient-blue">Elliniká</span>
            </h1>

            <p className="greek-text text-2xl sm:text-3xl font-semibold mb-4 text-white/75">
              Καλώς ήρθατε
            </p>

            <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-md mb-8">
              Your complete toolkit for Modern Greek — from alphabet to fluent conversation, powered by AI.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['AI Tutor Chat', 'Verb Conjugation', 'Practice Games', 'Alphabet Trainer', 'Idioms & Phrases', 'Full Dictionary'].map((feat) => (
                <span
                  key={feat}
                  className="glass rounded-full px-3 py-1.5 text-xs font-medium text-white/70"
                >
                  {feat}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {[
                { value: '24', label: 'Letters' },
                { value: '1000+', label: 'Words' },
                { value: 'AI', label: 'Powered' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gradient-blue">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Login card */}
          <div className="perspective animate-fade-up delay-200">
            <div className="glass-strong rounded-3xl p-7 sm:p-8 card-3d">
              {/* Logo */}
              <div className="mb-6 text-center">
                <span className="text-5xl font-bold animate-glow-pulse text-gradient-blue">Ω</span>
                <h2 className="mt-2 text-xl font-bold text-white/90">
                  Sign in to Elliniká
                </h2>
                <p className="mt-1 text-sm text-white/50">Start your Greek learning journey</p>
              </div>

              {/* OAuth */}
              <div className="mb-5">
                <button
                  onClick={handleGoogleAuth}
                  disabled={oauthLoading}
                  className="glass flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50 text-white/80"
                >
                  <GoogleIcon />
                  {oauthLoading ? 'Redirecting…' : 'Continue with Google'}
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-5 flex items-center">
                <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }} />
                <span className="mx-3 text-xs text-white/40">or</span>
                <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }} />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/60">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="input-glass w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/60">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="input-glass w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                {error && (
                  <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || oauthLoading}
                  className="w-full rounded-xl py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
                >
                  {isLoading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-white/50">
                No account?{' '}
                <Link href="/auth/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  Create one free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white/80 mb-2">Everything you need to learn Greek</h2>
          <p className="text-white/45 text-sm">All the tools, all in one place — free to explore</p>
        </div>

        <div className="perspective">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Link
                key={f.href}
                href={f.href}
                className={`glass rounded-2xl p-5 card-3d group block animate-fade-up delay-${Math.min((i + 1) * 100, 500)}`}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${f.glow}`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-white/85">{f.title}</h3>
                <p className="text-xs leading-relaxed text-white/50 mb-3">{f.description}</p>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: f.color }}>
                  Explore
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 5h6M5 2l3 3-3 3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <p className="text-sm text-white/35">
          Elliniká · Modern Greek Learning Platform
        </p>
      </footer>
    </div>
  )
}
