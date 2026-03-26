'use client'

import { useState, useEffect, useRef } from 'react'
import type { Adjective, CaseForm } from '@/types/adjective'

interface Props {
  initialAdjectives: Adjective[]
}

const CASES: { key: keyof CaseForm; label: string; description: string }[] = [
  { key: 'nom', label: 'Nominative', description: 'subject' },
  { key: 'gen', label: 'Genitive', description: 'possession' },
  { key: 'acc', label: 'Accusative', description: 'object' },
  { key: 'voc', label: 'Vocative', description: 'address' },
]

function FormsTable({ adj }: { adj: Adjective }) {
  const { forms } = adj
  if (!forms) return null
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <th className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              Case
            </th>
            <th className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#0D5EAF' }}>
              Masc.
            </th>
            <th className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#0D5EAF' }}>
              Fem.
            </th>
            <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#0D5EAF' }}>
              Neut.
            </th>
          </tr>
        </thead>
        <tbody>
          {(['sg', 'pl'] as const).map((number) => (
            <>
              <tr key={`${number}-header`}>
                <td
                  colSpan={4}
                  className="pt-3 pb-1 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {number === 'sg' ? 'Singular' : 'Plural'}
                </td>
              </tr>
              {CASES.map(({ key, label, description }) => (
                <tr
                  key={`${number}-${key}`}
                  className="border-b last:border-b-0"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="py-2 pr-3">
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>{label}</span>
                    <span className="ml-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>({description})</span>
                  </td>
                  <td className="py-2 pr-3 greek-text font-semibold" style={{ color: 'var(--foreground)' }}>
                    {forms[`m_${number}` as keyof typeof forms]?.[key] || '—'}
                  </td>
                  <td className="py-2 pr-3 greek-text font-semibold" style={{ color: 'var(--foreground)' }}>
                    {forms[`f_${number}` as keyof typeof forms]?.[key] || '—'}
                  </td>
                  <td className="py-2 greek-text font-semibold" style={{ color: 'var(--foreground)' }}>
                    {forms[`n_${number}` as keyof typeof forms]?.[key] || '—'}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AdjectiveSearch({ initialAdjectives }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Adjective[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selected, setSelected] = useState<Adjective | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      setSelected(null)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      setHasSearched(true)
      setSelected(null)
      try {
        const res = await fetch(`/api/adjectives/lookup?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.adjectives ?? [])
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query])

  const displayed = query.trim() ? results : initialAdjectives

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in Greek (e.g. καλός) or English (e.g. good)…"
          className="w-full rounded-xl border px-5 py-4 text-base outline-none focus:ring-2"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
          </div>
        )}
      </div>

      {/* Detail view */}
      {selected ? (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="mb-4 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#0D5EAF' }}
          >
            ← Back to results
          </button>
          <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="mb-4 flex flex-wrap items-baseline gap-3">
              <span className="greek-text text-3xl font-bold" style={{ color: '#0D5EAF' }}>{selected.masculine}</span>
              <span className="greek-text text-2xl" style={{ color: 'var(--muted-foreground)' }}>/ {selected.feminine} / {selected.neuter}</span>
              {selected.is_irregular && (
                <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: '#ef4444' }}>
                  irregular
                </span>
              )}
            </div>
            <p className="mb-1 text-lg font-medium" style={{ color: 'var(--foreground)' }}>{selected.english_translation}</p>
            {selected.declension_class && (
              <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>{selected.declension_class}</p>
            )}

            <div className="rounded-xl border p-4 mt-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
              <FormsTable adj={selected} />
            </div>

            {selected.example_sentence && (
              <div className="mt-6 rounded-xl border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Example</p>
                <p className="text-lg font-bold greek-text" style={{ color: '#0D5EAF' }}>{selected.example_sentence}</p>
                {selected.example_translation && (
                  <p className="mt-1 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>{selected.example_translation}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {hasSearched && !isLoading && results.length === 0 && (
            <div className="rounded-xl border p-8 text-center" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>No adjectives found for &ldquo;{query}&rdquo;</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {displayed.map((adj) => (
              <button
                key={adj.id}
                onClick={() => setSelected(adj)}
                className="flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div>
                  <span className="greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>
                    {adj.masculine} / {adj.feminine} / {adj.neuter}
                  </span>
                  <span className="ml-3 text-base" style={{ color: 'var(--foreground)' }}>
                    {adj.english_translation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {adj.is_irregular && (
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: '#ef4444' }}>
                      irregular
                    </span>
                  )}
                  <span style={{ color: 'var(--muted-foreground)' }}>→</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
