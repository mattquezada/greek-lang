'use client'

import type { Noun } from '@/types/noun'

interface Props {
  noun: Noun
}

const genderStyles: Record<Noun['gender'], { bg: string; color: string; label: string }> = {
  masculine: { bg: 'rgba(13,94,175,0.15)', color: '#0D5EAF', label: 'Masculine' },
  feminine: { bg: 'rgba(236,72,153,0.15)', color: '#db2777', label: 'Feminine' },
  neuter: { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', label: 'Neuter' },
}

export default function NounCard({ noun }: Props) {
  const genderStyle = genderStyles[noun.gender]

  return (
    <div className="glass rounded-2xl px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-bold" style={{ color: '#0D5EAF' }}>
              {noun.article} {noun.greek_text}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ background: genderStyle.bg, color: genderStyle.color }}
            >
              {genderStyle.label}
            </span>
          </div>
          <p className="mt-1 text-base" style={{ color: 'var(--foreground)' }}>
            {noun.english_translation}
          </p>
          {noun.declension_class && (
            <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {noun.declension_class}
            </p>
          )}
          {noun.example_sentence && (
            <p className="mt-2 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
              {noun.example_sentence}
            </p>
          )}
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0" style={{ color: '#0D5EAF' }}>
          <path d="M5 2l5 5-5 5" />
        </svg>
      </div>
    </div>
  )
}
