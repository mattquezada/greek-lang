'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/alphabet', label: 'Alphabet' },
  { href: '/verbs', label: 'Verbs' },
  { href: '/nouns', label: 'Nouns' },
  { href: '/adjectives', label: 'Adjectives' },
  { href: '/adverbs', label: 'Adverbs' },
  { href: '/idioms', label: 'Idioms' },
  { href: '/grammar', label: 'Grammar' },
  { href: '/chat', label: 'Chat' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: 'var(--foreground)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Placeholder avatar */}
          <div
            className="hidden h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white sm:flex"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            ?
          </div>

          {/* Hamburger (mobile) */}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                style={{ color: 'var(--foreground)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
