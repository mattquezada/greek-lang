'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const vocabLinks = [
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
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70"
        style={{ color: 'var(--foreground)' }}
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginTop: 1, opacity: 0.6 }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[160px] rounded-xl border py-1 shadow-lg z-50"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileVocabOpen, setMobileVocabOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-3xl font-bold leading-none" style={{ color: '#0D5EAF' }}>
            Ω
          </span>
          <span className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            Elliniká
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/alphabet" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Alphabet
          </Link>
          <Dropdown label="Vocabulary" links={vocabLinks} />
          <Link href="/idioms" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Idioms
          </Link>
          <Link href="/grammar" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Grammar
          </Link>
          <Link href="/translate" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Translator
          </Link>
          <Link href="/chat" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Chat
          </Link>
          <Link href="/settings" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--foreground)' }}>
            Settings
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div
            className="hidden h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white sm:flex"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            ?
          </div>
          <button
            className="ml-1 rounded-lg p-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block text-xl" style={{ color: 'var(--foreground)' }}>
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="border-t md:hidden"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
        >
          <div className="flex flex-col px-4 py-3 gap-1">
            <Link href="/alphabet" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Alphabet
            </Link>

            {/* Vocabulary group */}
            <button
              onClick={() => setMobileVocabOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-left"
              style={{ color: 'var(--foreground)' }}
            >
              <span>Vocabulary</span>
              <span style={{ opacity: 0.5 }}>{mobileVocabOpen ? '▲' : '▼'}</span>
            </button>
            {mobileVocabOpen && (
              <div className="ml-4 flex flex-col gap-0.5">
                {vocabLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/idioms" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Idioms
            </Link>
            <Link href="/grammar" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Grammar
            </Link>
            <Link href="/translate" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Translator
            </Link>
            <Link href="/chat" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Chat
            </Link>
            <Link href="/settings" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
