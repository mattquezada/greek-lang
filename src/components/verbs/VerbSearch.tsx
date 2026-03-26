'use client'

import { useState, useEffect, useRef } from 'react'
import type { Verb } from '@/types/verb'
import ConjugationTable from './ConjugationTable'

interface Props {
  initialVerbs?: Verb[]
}

export default function VerbSearch({ initialVerbs = [] }: Props) {
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

  const displayedVerbs = query.trim() ? results : initialVerbs

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <div
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="9" r="6" />
            <path d="M15 15l3 3" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in Greek (e.g. λέω) or English (e.g. say)…"
          className="w-full rounded-xl border px-5 py-4 pl-10 text-base outline-none focus:ring-2"
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
      <div>
        {hasSearched && !isLoading && results.length === 0 && (
          <div
            className="rounded-xl border p-8 text-center"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
              No verbs found for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Try searching in Greek script or check your spelling.
            </p>
          </div>
        )}

        {!selectedVerb && displayedVerbs.length > 0 && (
          <div className="flex flex-col gap-2">
            {displayedVerbs.map((verb) => (
              <button
                key={verb.id}
                onClick={() => setSelectedVerb(verb)}
                className="flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all hover:shadow-md cursor-pointer"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>
                      {verb.greek_text}
                    </span>
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
                  </div>
                  <p className="mt-0.5 text-sm" style={{ color: 'var(--foreground)' }}>
                    {verb.english_translation}
                  </p>
                  {verb.aspect_note && (
                    <p className="mt-0.5 text-xs italic" style={{ color: 'var(--muted-foreground)' }}>
                      {verb.aspect_note}
                    </p>
                  )}
                </div>
                <svg
                  width="16" height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-3 flex-shrink-0"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {selectedVerb && (
          <div>
            <button
              onClick={() => setSelectedVerb(null)}
              className="mb-4 flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#0D5EAF' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3L5 8l5 5" />
              </svg>
              Back to results
            </button>
            <div
              className="rounded-2xl border p-4 sm:p-6"
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

            {/* Perfective Subjunctive section */}
            {selectedVerb.conjugations.future?.active && (() => {
              const raw = selectedVerb.conjugations.future!.active
              const strip = (v: string) => v.replace(/^θα\s+/, '')
              const a = Object.fromEntries(
                Object.entries(raw).map(([k, v]) => [k, strip(v as string)])
              ) as typeof raw
              const PERSONS = [
                { key: 'sg1', label: 'εγώ', english: 'I' },
                { key: 'sg2', label: 'εσύ', english: 'you' },
                { key: 'sg3', label: 'αυτός·η·ό', english: 'he/she/it' },
                { key: 'pl1', label: 'εμείς', english: 'we' },
                { key: 'pl2', label: 'εσείς', english: 'you all' },
                { key: 'pl3', label: 'αυτοί·ές', english: 'they' },
              ] as const
              return (
                <div
                  className="mt-4 rounded-2xl border p-4 sm:p-6"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>
                    Perfective Subjunctive
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
                    Used after <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>να</span>,{' '}
                    <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>ας</span>,{' '}
                    <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>πριν να</span>,{' '}
                    <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>για να</span>…
                  </p>
                  <div
                    className="mb-4 rounded-xl border px-4 py-3 text-xs"
                    style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  >
                    The perfective stem is used <strong style={{ color: 'var(--foreground)' }}>bare — without θα</strong> — after να and similar particles. These are the aorist active forms in a different grammatical role.
                  </div>

                  <div
                    className="overflow-x-auto rounded-xl border p-4 mb-4"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                  >
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Person</th>
                          <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Form (bare)</th>
                          <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>With να</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PERSONS.map(({ key, label, english }) => (
                          <tr key={key} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                            <td className="py-2.5 pr-4">
                              <span className="greek-text font-medium" style={{ color: 'var(--foreground)' }}>{label}</span>
                              <span className="ml-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>({english})</span>
                            </td>
                            <td className="py-2.5 pr-4 greek-text font-semibold" style={{ color: '#0D5EAF' }}>
                              {a[key as keyof typeof a] || '—'}
                            </td>
                            <td className="py-2.5 greek-text text-sm" style={{ color: 'var(--muted-foreground)' }}>
                              να {a[key as keyof typeof a] || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { phrase: `Θέλω να ${a.sg1}.`, translation: `I want to ${selectedVerb.english_translation}.` },
                      { phrase: `Πρέπει να ${a.sg2}.`, translation: `You must ${selectedVerb.english_translation}.` },
                      { phrase: `Ας ${a.pl1}!`, translation: `Let's ${selectedVerb.english_translation}!` },
                    ].map(({ phrase, translation }) => (
                      <div key={phrase} className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                        <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{phrase}</p>
                        <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{translation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
