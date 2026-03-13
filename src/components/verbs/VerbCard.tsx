'use client'

import type { Verb } from '@/types/verb'

interface Props {
  verb: Verb
  onClick: () => void
}

export default function VerbCard({ verb, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border px-5 py-4 text-left transition-all hover:shadow-md"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="block text-xl font-bold" style={{ color: '#0D5EAF' }}>
            {verb.greek_text}
          </span>
          <span className="mt-0.5 block text-base" style={{ color: 'var(--foreground)' }}>
            {verb.english_translation}
          </span>
          {verb.aspect_note && (
            <span
              className="mt-1 block truncate text-sm italic"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {verb.aspect_note}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {verb.is_irregular && (
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: '#ef4444' }}
            >
              irregular
            </span>
          )}
          <span style={{ color: 'var(--muted-foreground)' }}>→</span>
        </div>
      </div>
    </button>
  )
}
