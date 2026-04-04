'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const vocabLinks = [
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/verbs', label: 'Verbs' },
  { href: '/nouns', label: 'Nouns' },
  { href: '/adjectives', label: 'Adjectives' },
  { href: '/adverbs', label: 'Adverbs' },
  { href: '/pronouns', label: 'Pronouns' },
  { href: '/determiners', label: 'Determiners' },
  { href: '/prepositions', label: 'Prepositions' },
  { href: '/conjunctions', label: 'Conjunctions' },
  { href: '/particles', label: 'Particles' },
  { href: '/interjections', label: 'Interjections' },
]

const mainLinks = [
  { href: '/alphabet', label: 'Alphabet' },
  { href: '/practice', label: 'Practice' },
  { href: '/idioms', label: 'Idioms' },
  { href: '/grammar', label: 'Grammar' },
  { href: '/translate', label: 'Translator' },
  { href: '/chat', label: 'Chat' },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  )
}

function VocabDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
        style={{ color: 'var(--foreground)' }}
      >
        Vocabulary
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="vocab-dropdown-glass absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[180px] rounded-2xl py-2 z-50">
          {vocabLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => { setOpen(false); onNavigate?.() }}
              className="block px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--foreground)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function UserMenu({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initials = email.slice(0, 2).toUpperCase()

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white glow-blue"
        style={{ background: 'linear-gradient(135deg, #0D5EAF, #7c3aed)' }}
        aria-label="User menu"
      >
        {initials}
      </button>
      {open && (
        <div className="glass absolute top-full right-0 mt-3 min-w-[180px] rounded-2xl py-2 z-50">
          <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--glass-border)' }}>
            <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{email}</p>
          </div>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--foreground)' }}
          >
            Settings
          </Link>
          <button
            onClick={() => { setOpen(false); onSignOut() }}
            className="block w-full text-left px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#ef4444' }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileVocabOpen, setMobileVocabOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  // All hooks must be called before any early returns
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // Hide navbar on landing page — it has its own header
  if (pathname === '/') return null

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push('/')
  }

  return (
    <>
      {/* Floating pill navbar */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-navbar rounded-full h-[52px] flex items-center gap-1 px-3"
        style={{ maxWidth: 'calc(100vw - 32px)', minWidth: 'min(680px, calc(100vw - 32px))' }}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-1.5 no-underline flex-shrink-0 pr-2">
          <span className="text-xl font-bold leading-none text-gradient-blue">Ω</span>
          <span className="text-sm font-semibold hidden sm:block" style={{ color: 'var(--foreground)' }}>
            Elliniká
          </span>
        </Link>

        {/* Separator */}
        <div className="hidden md:block h-5 w-px mx-1" style={{ background: 'var(--glass-border)' }} />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
              style={{
                color: 'var(--foreground)',
                background: pathname === link.href ? 'var(--glass-bg-hover)' : undefined,
                fontWeight: pathname === link.href ? 600 : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
          <VocabDropdown />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center gap-2">
            {userEmail ? (
              <UserMenu email={userEmail} onSignOut={handleSignOut} />
            ) : (
              <Link
                href="/"
                className="rounded-full px-4 py-1.5 text-xs font-semibold text-white glow-blue transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-70 md:hidden"
            onClick={() => { setMenuOpen((v) => { if (v) setMobileVocabOpen(false); return !v }) }}
            aria-label="Toggle menu"
            style={{ color: 'var(--foreground)', background: 'var(--glass-bg)' }}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="2" y1="5" x2="14" y2="5" /><line x1="2" y1="8" x2="14" y2="8" /><line x1="2" y1="11" x2="14" y2="11" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 md:hidden" style={{ paddingTop: '80px' }}>
          <div className="flex flex-col px-5 py-4 gap-2 max-h-full overflow-y-auto">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="glass rounded-2xl px-5 py-4 text-base font-medium transition-opacity hover:opacity-80"
                style={{
                  color: 'var(--foreground)',
                  background: pathname === link.href ? 'var(--glass-bg-hover)' : undefined,
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Vocabulary group */}
            <button
              onClick={() => setMobileVocabOpen((v) => !v)}
              className="glass rounded-2xl px-5 py-4 text-base font-medium flex items-center justify-between text-left"
              style={{ color: 'var(--foreground)' }}
            >
              <span>Vocabulary</span>
              <ChevronIcon open={mobileVocabOpen} />
            </button>
            {mobileVocabOpen && (
              <div className="glass rounded-2xl overflow-hidden">
                {vocabLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-5 py-3 text-sm font-medium transition-opacity hover:opacity-70 border-b last:border-0"
                    style={{ color: 'var(--foreground)', borderColor: 'var(--glass-border)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Bottom row */}
            <div className="mt-2 pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid var(--glass-border)' }}>
              <Link href="/settings" onClick={() => setMenuOpen(false)} className="glass rounded-2xl px-5 py-4 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Settings
              </Link>
              {userEmail ? (
                <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
                  <span className="text-xs truncate max-w-[180px]" style={{ color: 'var(--muted-foreground)' }}>{userEmail}</span>
                  <button onClick={handleSignOut} className="text-sm font-medium" style={{ color: '#ef4444' }}>Sign out</button>
                </div>
              ) : (
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-5 py-4 text-sm font-semibold text-white text-center glow-blue"
                  style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}