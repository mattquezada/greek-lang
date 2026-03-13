'use client'

import { useState } from 'react'
import type { AlphabetLetter } from '@/types/alphabet'
import { useAlphabetQuiz } from '@/hooks/useAlphabetQuiz'

interface QuizModeProps {
  letters: AlphabetLetter[]
}

export default function QuizMode({ letters }: QuizModeProps) {
  const {
    currentLetter,
    currentIndex,
    score,
    total,
    isAnswered,
    userAnswer,
    isCorrect,
    isFinished,
    progress,
    checkAnswer,
    nextLetter,
    restart,
  } = useAlphabetQuiz(letters)

  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isAnswered) return
    checkAnswer(input)
  }

  const handleNext = () => {
    setInput('')
    nextLetter()
  }

  const handleRestart = () => {
    setInput('')
    restart()
  }

  if (isFinished) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border p-8 text-center" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="mb-2 text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Quiz Complete!
        </h2>
        <p className="mb-6 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          You scored{' '}
          <span className="font-bold" style={{ color: '#0D5EAF' }}>
            {score}
          </span>{' '}
          out of {total}
          {score === total && ' — perfect! 🏆'}
        </p>
        <button
          onClick={handleRestart}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#0D5EAF' }}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!currentLetter) return null

  return (
    <div className="mx-auto max-w-md">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <span>
            {currentIndex + 1} / {total}
          </span>
          <span>
            Score: <span className="font-semibold" style={{ color: '#0D5EAF' }}>{score}</span>
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: '#0D5EAF' }}
          />
        </div>
      </div>

      {/* Letter display */}
      <div
        className="mb-6 flex flex-col items-center rounded-2xl border p-10"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className="greek-text flex items-baseline gap-4 font-bold" style={{ color: '#0D5EAF' }}>
          <span className="text-7xl">{currentLetter.letter_upper}</span>
          <span className="text-5xl opacity-70">{currentLetter.letter_lower}</span>
        </div>
        <p className="mt-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          What is the name of this letter?
        </p>
      </div>

      {/* Input form */}
      {!isAnswered ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the letter name…"
            autoFocus
            className="flex-1 rounded-xl border px-4 py-3 text-base outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              // @ts-ignore
              '--tw-ring-color': '#0D5EAF',
            }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            Check
          </button>
        </form>
      ) : (
        <div>
          {/* Result */}
          <div
            className="mb-4 rounded-xl border p-4"
            style={{
              backgroundColor: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              borderColor: isCorrect ? '#10b981' : '#ef4444',
            }}
          >
            <p className="font-semibold" style={{ color: isCorrect ? '#10b981' : '#ef4444' }}>
              {isCorrect ? '✓ Correct!' : '✗ Not quite'}
            </p>
            {!isCorrect && (
              <p className="mt-1 text-sm" style={{ color: 'var(--foreground)' }}>
                The answer is: <strong>{currentLetter.letter_name}</strong>
                <span className="ml-2" style={{ color: 'var(--muted-foreground)' }}>
                  /{currentLetter.pronunciation}/
                </span>
              </p>
            )}
          </div>
          <button
            onClick={handleNext}
            className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            {currentIndex + 1 < total ? 'Next Letter →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}
