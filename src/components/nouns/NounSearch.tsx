'use client'

import { useState, useEffect, useRef } from 'react'
import type { Noun } from '@/types/noun'
import { createClient } from '@/lib/supabase/client'
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
        const supabase = createClient()
        let q = supabase
          .from('nouns')
          .select('*')
          .or(`greek_text.ilike.%${query.trim()}%,english_translation.ilike.%${query.trim()}%`)

        if (genderFilter !== 'all') {
          q = q.eq('gender', genderFilter)
        }

        const { data } = await q.limit(50)
        setResults(data ?? [])
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

      {/* Gender filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {GENDER_BUTTONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => {
              setGenderFilter(value)
              setSelectedNoun(null)
            }}
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
            style={
              genderFilter === value
                ? { backgroundColor: '#0D5EAF', color: '#fff' }
                : { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Selected noun detail view */}
      {selectedNoun ? (
        <div>
          <button
            onClick={() => setSelectedNoun(null)}
            className="mb-4 flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#0D5EAF' }}
          >
            ← Back to results
          </button>
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className="mb-2 flex flex-wrap items-baseline gap-2">
              <h2 className="text-3xl font-bold" style={{ color: '#0D5EAF' }}>
                {selectedNoun.article} {selectedNoun.greek_text}
              </h2>
            </div>
            <p className="mb-1 text-lg font-medium" style={{ color: 'var(--foreground)' }}>
              {selectedNoun.english_translation}
            </p>
            {selectedNoun.declension_class && (
              <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {selectedNoun.declension_class}
              </p>
            )}
            <DeclensionTable
              declensions={selectedNoun.declensions}
              greekText={selectedNoun.greek_text}
              article={selectedNoun.article}
            />
            {selectedNoun.example_sentence && (
              <div
                className="mt-6 rounded-xl border p-4"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
              >
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Example sentence
                </p>
                <p className="text-lg font-bold" style={{ color: '#0D5EAF' }}>
                  {selectedNoun.example_sentence}
                </p>
                {selectedNoun.example_translation && (
                  <p className="mt-1 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
                    {selectedNoun.example_translation}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* No results message */}
          {hasSearched && !isLoading && results.length === 0 && (
            <div
              className="rounded-xl border p-8 text-center"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                No nouns found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Try searching in Greek script or check your spelling.
              </p>
            </div>
          )}

          {/* Noun list */}
          <div className="flex flex-col gap-3">
            {displayedNouns.map((noun) => (
              <div
                key={noun.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => setSelectedNoun(noun)}
                style={{ borderRadius: '0.75rem' }}
              >
                <NounCard noun={noun} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
