'use client'

import { useState, useEffect, useRef } from 'react'
import type { Verb } from '@/types/verb'
import ConjugationTable from './ConjugationTable'

export default function VerbSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Verb[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      setSelectedVerb(null)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      setHasSearched(true)
      setSelectedVerb(null)
      try {
        const res = await fetch(`/api/verbs/lookup?q=${encodeURIComponent(query.trim())}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.verbs ?? [])
        } else {
          setResults([])
        }
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in Greek (e.g. λέω) or English (e.g. say)…"
          className="w-full rounded-xl border px-5 py-4 text-base outline-none focus:ring-2"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }}
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-4">
        {hasSearched && !isLoading && results.length === 0 && (
          <div
            className="rounded-xl border p-8 text-center"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              No verbs found for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Try searching in Greek script or check your spelling.
            </p>
          </div>
        )}

        {results.length > 0 && !selectedVerb && (
          <div className="flex flex-col gap-2">
            {results.map((verb) => (
              <button
                key={verb.id}
                onClick={() => setSelectedVerb(verb)}
                className="flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all hover:shadow-md"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <span className="greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>
                    {verb.greek_text}
                  </span>
                  <span className="ml-3 text-base" style={{ color: 'var(--foreground)' }}>
                    {verb.english_translation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {verb.is_irregular && (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: '#ef4444' }}
                    >
                      irregular
                    </span>
                  )}
                  {verb.verb_class && (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                    >
                      {verb.verb_class}
                    </span>
                  )}
                  <span style={{ color: 'var(--muted-foreground)' }}>→</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedVerb && (
          <div>
            <button
              onClick={() => setSelectedVerb(null)}
              className="mb-4 flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#0D5EAF' }}
            >
              ← Back to results
            </button>
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="mb-4 flex flex-wrap items-start gap-3">
                <h2 className="greek-text text-3xl font-bold" style={{ color: '#0D5EAF' }}>
                  {selectedVerb.greek_text}
                </h2>
                <div>
                  <p className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>
                    {selectedVerb.english_translation}
                  </p>
                  {selectedVerb.aspect_note && (
                    <p className="mt-0.5 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
                      {selectedVerb.aspect_note}
                    </p>
                  )}
                </div>
              </div>
              <ConjugationTable
                conjugations={selectedVerb.conjugations}
                isIrregular={selectedVerb.is_irregular}
                exampleSentence={selectedVerb.example_sentence}
                exampleTranslation={selectedVerb.example_translation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
