'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Idiom } from '@/types/idiom'
import { IDIOM_CATEGORIES } from '@/types/idiom'
import IdiomCard from './IdiomCard'
import CategoryFilter from './CategoryFilter'

interface Props {
  initialIdioms: Idiom[]
}

export default function IdiomSearch({ initialIdioms }: Props) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [results, setResults] = useState<Idiom[]>(initialIdioms)
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        let queryBuilder = supabase.from('idioms').select('*').limit(100)

        if (query.trim()) {
          queryBuilder = queryBuilder.or(
            `greek_text.ilike.%${query.trim()}%,real_meaning.ilike.%${query.trim()}%`
          )
        }

        if (selectedCategory !== 'all') {
          queryBuilder = queryBuilder.eq('category', selectedCategory)
        }

        const { data } = await queryBuilder.order('id', { ascending: true })
        setResults(data ?? [])
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedCategory])

  const categories = [...IDIOM_CATEGORIES]

  return (
    <div>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search idioms in Greek or English…"
          className="w-full rounded-xl border px-5 py-3 text-base outline-none focus:ring-2"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }}
        />
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="py-8 text-center" style={{ color: 'var(--muted-foreground)' }}>
          <div
            className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }}
          />
          Searching…
        </div>
      )}

      {/* Results */}
      {!isLoading && results.length === 0 && (
        <div
          className="rounded-xl border p-10 text-center"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            No idioms found
            {query && ` for "${query}"`}
            {selectedCategory !== 'all' && ` in category "${selectedCategory}"`}
          </p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((idiom) => (
            <IdiomCard key={idiom.id} idiom={idiom} />
          ))}
        </div>
      )}
    </div>
  )
}
