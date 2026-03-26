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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
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
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          Greek Dictionary
        </h1>
        <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
          Search any Greek word — powered by AI, no manual entry required
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Type a Greek word (e.g. καλημέρα)…"
          className="w-full rounded-xl border px-5 py-4 text-base outline-none focus:ring-2"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }}
          autoFocus
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2"
              style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }}
            />
          </div>
        )}
      </div>

      {/* Result */}
      {hasSearched && !isLoading && (
        result ? (
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            {/* Word + type badge */}
            <div className="mb-3 flex flex-wrap items-baseline gap-3">
              <h2 className="greek-text text-3xl font-bold" style={{ color: typeColor }}>
                {result.word}
              </h2>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white capitalize"
                style={{ backgroundColor: typeColor }}
              >
                {result.type}
              </span>
              {source === 'claude' && (
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                >
                  AI
                </span>
              )}
            </div>

            {/* Translation */}
            <p className="mb-1 text-xl font-medium" style={{ color: 'var(--foreground)' }}>
              {result.english_translation}
            </p>

            {/* Pronunciation */}
            {result.pronunciation && (
              <p className="mb-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                /{result.pronunciation}/
              </p>
            )}

            {/* Notes */}
            {result.notes && (
              <p className="mb-4 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
                {result.notes}
              </p>
            )}

            {/* Example */}
            {result.example_sentence && (
              <div
                className="mt-4 rounded-xl border p-4"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
              >
                <p
                  className="mb-1 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--muted-foreground)' }}
                >
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

            {/* Link to full page */}
            {typeLink && (
              <div className="mt-5">
                <Link
                  href={`${typeLink}?q=${encodeURIComponent(query)}`}
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#0D5EAF' }}
                >
                  See full {result.type} forms →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-xl border p-8 text-center"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              No results for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Try searching in Greek script (e.g. καλός, γράφω, τώρα).
            </p>
          </div>
        )
      )}

      {/* Hint when empty */}
      {!hasSearched && (
        <div className="flex flex-col gap-3">
          {['γεια σου', 'σπίτι', 'ωραίος', 'γρήγορα'].map((word) => (
            <button
              key={word}
              onClick={() => {
                setQuery(word)
                handleChange({ target: { value: word } } as React.ChangeEvent<HTMLInputElement>)
              }}
              className="rounded-xl border px-5 py-3 text-left text-sm transition-all hover:shadow-md"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              Try: <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>{word}</span>
            </button>
          ))}
        </div>
      )}
    </main>
  )
}
