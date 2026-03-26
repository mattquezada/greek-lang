'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 200ms ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        opacity: 0.6,
      }}
    >
      <path d="M2.5 5l4.5 4 4.5-4" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="3" y1="6" x2="17" y2="6" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="14" x2="17" y2="14" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="4" y1="4" x2="16" y2="16" />
      <line x1="16" y1="4" x2="4" y2="16" />
    </svg>
  )
}

function Dropdown({ label, links, onNavigate }: { label: string; links: { href: string; label: string }[]; onNavigate?: () => void }) {
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
        className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
        style={{ color: 'var(--foreground)' }}
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[168px] rounded-2xl border py-2 shadow-xl z-50"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => { setOpen(false); onNavigate?.() }}
              className="block px-4 py-2 text-sm font-medium transition-colors hover:opacity-70"
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

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileVocabOpen, setMobileVocabOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

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

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push('/')
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
          <span className="text-2xl font-bold leading-none" style={{ color: '#0D5EAF' }}>
            Ω
          </span>
          <span className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
            Elliniká
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/alphabet" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Alphabet
          </Link>
          <Dropdown label="Vocabulary" links={vocabLinks} />
          <Link href="/practice" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Practice
          </Link>
          <Link href="/idioms" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Idioms
          </Link>
          <Link href="/grammar" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Grammar
          </Link>
          <Link href="/translate" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Translator
          </Link>
          <Link href="/chat" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Chat
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Desktop: auth + settings + theme */}
          <div className="hidden md:flex items-center gap-3">
            {userEmail ? (
              <>
                <span className="max-w-[120px] truncate text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {userEmail}
                </span>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
              >
                Sign in
              </Link>
            )}
            <Link
              href="/settings"
              className="rounded-lg p-1.5 transition-opacity hover:opacity-70"
              aria-label="Settings"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="3" />
                <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.22 4.22l1.06 1.06M14.72 14.72l1.06 1.06M4.22 15.78l1.06-1.06M14.72 5.28l1.06-1.06" />
              </svg>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: 'var(--foreground)' }}
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t md:hidden"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
        >
          <div className="flex flex-col px-4 py-3 gap-0.5">
            <Link
              href="/alphabet"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--foreground)' }}
            >
              Alphabet
            </Link>

            {/* Vocabulary group */}
            <button
              onClick={() => setMobileVocabOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-left"
              style={{ color: 'var(--foreground)' }}
            >
              <span>Vocabulary</span>
              <ChevronIcon open={mobileVocabOpen} />
            </button>
            {mobileVocabOpen && (
              <div className="ml-3 flex flex-col gap-0.5 pb-1">
                {vocabLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/practice" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Practice
            </Link>
            <Link href="/idioms" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Idioms
            </Link>
            <Link href="/grammar" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Grammar
            </Link>
            <Link href="/translate" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Translator
            </Link>
            <Link href="/chat" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Chat
            </Link>

            {/* Auth row */}
            {userEmail ? (
              <div
                className="mt-1 flex items-center justify-between rounded-xl border px-3 py-3"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
              >
                <span className="max-w-[180px] truncate text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {userEmail}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-xs font-medium"
                  style={{ color: '#ef4444' }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium mt-1"
                style={{ color: '#0D5EAF' }}
              >
                Sign in
              </Link>
            )}

            {/* Settings & theme row */}
            <div
              className="mt-1 flex items-center justify-between rounded-xl border px-3 py-3"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
            >
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium"
                style={{ color: 'var(--foreground)' }}
              >
                Settings
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
