'use client'

import type { AlphabetLetter } from '@/types/alphabet'

interface LetterCardProps {
  letter: AlphabetLetter
  isQuizMode?: boolean
  isFlipped?: boolean
}

export default function LetterCard({ letter, isQuizMode = false, isFlipped = false }: LetterCardProps) {
  return (
    <div className="glass flex flex-col items-center rounded-2xl p-4 card-3d transition-all">
      {/* Main letters */}
      <div
        className="greek-text mb-1 flex items-baseline gap-3 font-bold leading-none"
        style={{ color: '#0D5EAF' }}
      >
        <span className="text-5xl">{letter.letter_upper}</span>
        <span className="text-3xl opacity-70">{letter.letter_lower}</span>
      </div>

      {/* Letter name */}
      <div
        className="mt-2 text-sm font-semibold capitalize"
        style={{ color: 'var(--foreground)' }}
      >
        {letter.letter_name}
      </div>

      {/* Pronunciation */}
      <div
        className="mt-0.5 text-xs"
        style={{ color: 'var(--muted-foreground)' }}
      >
        /{letter.pronunciation}/
      </div>

      {/* Example — only when not in quiz mode */}
      {!isQuizMode && (
        <div className="glass-strong mt-3 w-full rounded-lg px-3 py-2 text-center">
          <div
            className="greek-text text-sm font-medium"
            style={{ color: 'var(--foreground)' }}
          >
            {letter.example_word}
          </div>
          <div
            className="text-xs"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {letter.example_translation}
          </div>
        </div>
      )}
    </div>
  )
}
