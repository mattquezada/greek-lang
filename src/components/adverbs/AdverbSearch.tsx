'use client'

import { useState, useEffect, useRef } from 'react'
import type { Adverb } from '@/types/adverb'
import { createClient } from '@/lib/supabase/client'

interface Props {
  initialAdverbs: Adverb[]
}

const CATEGORIES = ['all', 'place', 'time', 'manner', 'degree', 'affirmation'] as const
type Category = typeof CATEGORIES[number]

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All',
  place: 'Place',
  time: 'Time',
  manner: 'Manner',
  degree: 'Degree',
  affirmation: 'Yes / No',
}

export default function AdverbSearch({ initialAdverbs }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [results, setResults] = useState<Adverb[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      setHasSearched(true)
      try {
        const supabase = createClient()
        let q = supabase
          .from('adverbs')
          .select('*')
          .or(`greek_text.ilike.%${query.trim()}%,english_translation.ilike.%${query.trim()}%`)
        if (category !== 'all') q = q.eq('category', category)
        const { data } = await q.limit(100)
        setResults(data ?? [])
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, category])

  const displayed = query.trim()
    ? results
    : category === 'all'
    ? initialAdverbs
    : initialAdverbs.filter((a) => a.category === category)

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in Greek (e.g. τώρα) or English (e.g. now)…"
          className="w-full rounded-xl border px-5 py-4 text-base outline-none focus:ring-2"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
          </div>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
            style={
              category === cat
                ? { backgroundColor: '#0D5EAF', color: '#fff' }
                : { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }
            }
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* No results */}
      {hasSearched && !isLoading && results.length === 0 && (
        <div className="rounded-xl border p-8 text-center" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>No adverbs found for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {displayed.map((adv) => (
          <div
            key={adv.id}
            className="rounded-xl border p-4"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="greek-text text-xl font-bold" style={{ color: '#0D5EAF' }}>
                  {adv.greek_text}
                </span>
                <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {adv.english_translation}
                </p>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
              >
                {adv.category}
              </span>
            </div>
            {adv.example_sentence && (
              <div className="mt-3 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <p className="greek-text text-sm font-semibold" style={{ color: '#0D5EAF' }}>
                  {adv.example_sentence}
                </p>
                {adv.example_translation && (
                  <p className="mt-0.5 text-xs italic" style={{ color: 'var(--muted-foreground)' }}>
                    {adv.example_translation}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
