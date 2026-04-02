'use client'

import { useState, useEffect, useRef } from 'react'
import type { Adverb } from '@/types/adverb'

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
        const res = await fetch(`/api/adverbs/lookup?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        const adverbs: Adverb[] = data.adverbs ?? []
        setResults(category === 'all' ? adverbs : adverbs.filter((a) => a.category === category))
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
          className="input-glass w-full rounded-2xl px-5 py-4 text-base"
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
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-all"
            style={
              category === cat
                ? { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff', boxShadow: '0 0 16px rgba(13,94,175,0.4)' }
                : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)', color: 'var(--muted-foreground)' }
            }
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* No results */}
      {hasSearched && !isLoading && results.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>No adverbs found for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      {/* Grid */}
      <div className="perspective grid gap-3 sm:grid-cols-2">
        {displayed.map((adv) => (
          <div key={adv.id} className="glass rounded-2xl p-4 card-3d">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="greek-text text-xl font-bold" style={{ color: '#0D5EAF' }}>{adv.greek_text}</span>
                <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--foreground)' }}>{adv.english_translation}</p>
              </div>
              <span className="shrink-0 glass rounded-full px-2.5 py-0.5 text-xs font-medium capitalize" style={{ color: 'var(--muted-foreground)' }}>
                {adv.category}
              </span>
            </div>
            {adv.example_sentence && (
              <div className="mt-3 border-t pt-3" style={{ borderColor: 'var(--glass-border)' }}>
                <p className="greek-text text-sm font-semibold" style={{ color: '#0D5EAF' }}>{adv.example_sentence}</p>
                {adv.example_translation && (
                  <p className="mt-0.5 text-xs italic" style={{ color: 'var(--muted-foreground)' }}>{adv.example_translation}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
