'use client'

import { useState, useEffect } from 'react'
import type { Idiom } from '@/types/idiom'

interface Props {
  idioms: Idiom[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Challenge {
  idiom: Idiom
  choices: string[]
  correctIndex: number
}

function buildChallenge(idioms: Idiom[]): Challenge | null {
  if (idioms.length < 4) return null
  const shuffled = shuffle(idioms)
  const idiom = shuffled[0]
  const wrongPool = shuffled.slice(1, 4).map((i) => i.real_meaning)
  const choices = shuffle([idiom.real_meaning, ...wrongPool])
  return {
    idiom,
    choices,
    correctIndex: choices.indexOf(idiom.real_meaning),
  }
}

export default function IdiomQuiz({ idioms }: Props) {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [started, setStarted] = useState(false)

  const nextChallenge = () => {
    setChallenge(buildChallenge(idioms))
    setSelected(null)
  }

  useEffect(() => {
    if (started) nextChallenge()
  }, [started])

  const pick = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    const correct = challenge && index === challenge.correctIndex
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }))
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <div className="text-5xl">🎯</div>
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Idiom Quiz</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {idioms.length} idioms loaded · 4 choices per round
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Greek idioms have wild literal translations — pick what they actually mean.
          </p>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="rounded-xl px-8 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: '#059669' }}
        >
          Start Quiz
        </button>
      </div>
    )
  }

  if (!challenge) {
    return (
      <p className="text-center py-10" style={{ color: 'var(--muted-foreground)' }}>
        Not enough idioms loaded (need at least 4).
      </p>
    )
  }

  const answered = selected !== null

  return (
    <div className="flex flex-col gap-5">
      {/* Score */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-sm">
          <span style={{ color: '#059669' }}>{score.correct} correct</span>
          <span style={{ color: 'var(--muted-foreground)' }}>{score.total - score.correct} missed</span>
        </div>
        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Round {score.total + (answered ? 0 : 1)}
        </span>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl border p-6"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {/* Idiom */}
        <p className="greek-text text-2xl font-bold mb-1" style={{ color: '#059669' }}>
          {challenge.idiom.greek_text}
        </p>
        <p className="text-sm mb-1" style={{ color: 'var(--muted-foreground)' }}>
          /{challenge.idiom.pronunciation}/
        </p>
        <p className="text-sm italic mb-5" style={{ color: 'var(--muted-foreground)' }}>
          Literally: &ldquo;{challenge.idiom.literal_translation}&rdquo;
        </p>

        <p className="text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>
          What does this idiom actually mean?
        </p>

        {/* Choices */}
        <div className="flex flex-col gap-2 mb-4">
          {challenge.choices.map((choice, i) => {
            let bg = 'var(--background)'
            let border = 'var(--border)'
            let color = 'var(--foreground)'

            if (answered) {
              if (i === challenge.correctIndex) {
                bg = 'rgba(5,150,105,0.08)'; border = '#059669'; color = '#059669'
              } else if (i === selected) {
                bg = 'rgba(239,68,68,0.08)'; border = '#ef4444'; color = '#ef4444'
              }
            } else if (selected === i) {
              bg = 'rgba(13,94,175,0.08)'; border = '#0D5EAF'
            }

            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={answered}
                className="rounded-xl border px-4 py-3 text-left text-sm transition-all"
                style={{ backgroundColor: bg, borderColor: border, color }}
              >
                <span className="font-medium mr-2" style={{ color: 'var(--muted-foreground)' }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {choice}
              </button>
            )
          })}
        </div>

        {/* Explanation after answer */}
        {answered && (
          <div className="flex flex-col gap-3">
            {challenge.idiom.example_sentence && (
              <div
                className="rounded-xl border p-3"
                style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}
              >
                <p className="greek-text text-sm font-semibold mb-0.5" style={{ color: '#059669' }}>
                  {challenge.idiom.example_sentence}
                </p>
              </div>
            )}
            <button
              onClick={nextChallenge}
              className="w-full rounded-xl py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: '#059669' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
