'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const TYPE_COLORS: Record<string, string> = {
  verb: '#0D5EAF',
  noun: '#7c3aed',
  adjective: '#059669',
  adverb: '#d97706',
  particle: '#64748b',
  conjunction: '#64748b',
  preposition: '#64748b',
  interjection: '#dc2626',
  other: '#64748b',
}

const TYPE_LINKS: Record<string, string> = {
  verb: '/verbs',
  noun: '/nouns',
  adjective: '/adjectives',
  adverb: '/adverbs',
}

interface DictionaryResult {
  word: string
  type: string
  english_translation: string
  pronunciation?: string
  notes?: string
  example_sentence?: string
  example_translation?: string
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DictionaryResult | null>(null)
  const [source, setSource] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function search(val: string) {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!val.trim()) {
      setResult(null)
      setHasSearched(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      setHasSearched(true)
      try {
        const res = await fetch(`/api/dictionary?q=${encodeURIComponent(val.trim())}`)
        const data = await res.json()
        setResult(data.result ?? null)
        setSource(data.source ?? '')
      } catch {
        setResult(null)
      } finally {
        setIsLoading(false)
      }
    }, 500)
  }

  const typeColor = result ? (TYPE_COLORS[result.type] ?? '#64748b') : '#64748b'
  const typeLink = result ? TYPE_LINKS[result.type] : undefined

  return (
    <main className="min-h-dvh bg-mesh">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-up flex items-center gap-4">
          <div className="glass flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl glow-blue" style={{ color: '#0D5EAF' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-blue">Greek Dictionary</h1>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              AI-powered search — any word, instantly
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 animate-fade-up delay-100">
          <div className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Type a Greek or English word…"
            className="input-glass w-full rounded-2xl pl-12 pr-12 py-4 text-base"
            autoFocus
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
            </div>
          )}
        </div>

        {/* Result */}
        {hasSearched && !isLoading && (
          result ? (
            <div className="glass rounded-3xl p-6 card-3d animate-fade-up perspective">
              {/* Word + badges */}
              <div className="mb-3 flex flex-wrap items-baseline gap-3">
                <h2 className="greek-text text-3xl font-bold" style={{ color: typeColor }}>
                  {result.word}
                </h2>
                <span className="rounded-full px-3 py-0.5 text-xs font-semibold text-white capitalize" style={{ background: typeColor }}>
                  {result.type}
                </span>
                {source === 'claude' && (
                  <span className="glass rounded-full px-2 py-0.5 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                    AI
                  </span>
                )}
              </div>

              <p className="mb-1 text-xl font-medium" style={{ color: 'var(--foreground)' }}>
                {result.english_translation}
              </p>

              {result.pronunciation && (
                <p className="mb-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  /{result.pronunciation}/
                </p>
              )}

              {result.notes && (
                <p className="mb-4 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
                  {result.notes}
                </p>
              )}

              {result.example_sentence && (
                <div className="glass-strong rounded-2xl p-4 mt-4">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                    Example
                  </p>
                  <p className="greek-text text-base font-semibold" style={{ color: typeColor }}>
                    {result.example_sentence}
                  </p>
                  {result.example_translation && (
                    <p className="mt-1 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
                      {result.example_translation}
                    </p>
                  )}
                </div>
              )}

              {typeLink && (
                <div className="mt-5">
                  <Link
                    href={`${typeLink}?q=${encodeURIComponent(query)}`}
                    className="text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: typeColor }}
                  >
                    See full {result.type} forms →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="glass rounded-3xl p-8 text-center animate-fade-up">
              <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Try searching in Greek script (e.g. καλός, γράφω, τώρα).
              </p>
            </div>
          )
        )}

      </div>
    </main>
  )
}
