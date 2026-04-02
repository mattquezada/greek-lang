'use client'

import { useState, useEffect, useRef } from 'react'
import type { Noun } from '@/types/noun'
import NounCard from './NounCard'
import DeclensionTable from './DeclensionTable'

interface Props {
  initialNouns: Noun[]
}

type GenderFilter = 'all' | 'masculine' | 'feminine' | 'neuter'

const GENDER_BUTTONS: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'masculine', label: 'Masculine (ο)' },
  { value: 'feminine', label: 'Feminine (η)' },
  { value: 'neuter', label: 'Neuter (το)' },
]

export default function NounSearch({ initialNouns }: Props) {
  const [query, setQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all')
  const [results, setResults] = useState<Noun[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedNoun, setSelectedNoun] = useState<Noun | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      setSelectedNoun(null)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      setHasSearched(true)
      setSelectedNoun(null)
      try {
        const res = await fetch(`/api/nouns/lookup?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        const nouns: Noun[] = data.nouns ?? []
        setResults(genderFilter === 'all' ? nouns : nouns.filter((n) => n.gender === genderFilter))
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, genderFilter])

  const displayedNouns = query.trim()
    ? results
    : genderFilter === 'all'
    ? initialNouns
    : initialNouns.filter((n) => n.gender === genderFilter)

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in Greek (e.g. φίλος) or English (e.g. friend)…"
          className="input-glass w-full rounded-2xl px-5 py-4 text-base"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
          </div>
        )}
      </div>

      {/* Gender filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {GENDER_BUTTONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => { setGenderFilter(value); setSelectedNoun(null) }}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-all"
            style={
              genderFilter === value
                ? { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff', boxShadow: '0 0 16px rgba(13,94,175,0.4)' }
                : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)', color: 'var(--muted-foreground)' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Selected noun detail view */}
      {selectedNoun ? (
        <div className="animate-fade-up">
          <button
            onClick={() => setSelectedNoun(null)}
            className="mb-4 flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#0D5EAF' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Back to results
          </button>
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="mb-2 flex flex-wrap items-baseline gap-2">
              <h2 className="text-3xl font-bold" style={{ color: '#0D5EAF' }}>
                {selectedNoun.article} {selectedNoun.greek_text}
              </h2>
            </div>
            <p className="mb-1 text-lg font-medium" style={{ color: 'var(--foreground)' }}>{selectedNoun.english_translation}</p>
            {selectedNoun.declension_class && (
              <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>{selectedNoun.declension_class}</p>
            )}
            <DeclensionTable
              declensions={selectedNoun.declensions}
              greekText={selectedNoun.greek_text}
              article={selectedNoun.article}
            />
            {selectedNoun.example_sentence && (
              <div className="glass-strong rounded-2xl p-4 mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                  Example sentence
                </p>
                <p className="text-lg font-bold" style={{ color: '#0D5EAF' }}>{selectedNoun.example_sentence}</p>
                {selectedNoun.example_translation && (
                  <p className="mt-1 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>{selectedNoun.example_translation}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {hasSearched && !isLoading && results.length === 0 && (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>No nouns found for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>Try searching in Greek script or check your spelling.</p>
            </div>
          )}
          <div className="perspective flex flex-col gap-3">
            {displayedNouns.map((noun) => (
              <div key={noun.id} className="cursor-pointer card-3d" onClick={() => setSelectedNoun(noun)}>
                <NounCard noun={noun} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
