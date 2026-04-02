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
  return { idiom, choices, correctIndex: choices.indexOf(idiom.real_meaning) }
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
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  if (!started) {
    return (
      <div className="glass rounded-3xl p-10 flex flex-col items-center gap-6 text-center card-3d perspective">
        <div className="text-6xl animate-float-medium">🎯</div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gradient-blue">Idiom Quiz</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {idioms.length} idioms loaded · 4 choices per round
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Greek idioms have wild literal translations — pick what they actually mean.
          </p>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="rounded-2xl px-10 py-3.5 text-sm font-semibold text-white glow-emerald transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
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
    <div className="flex flex-col gap-4">
      {/* Score bar */}
      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="font-semibold" style={{ color: '#10b981' }}>{score.correct} correct</span>
          <span style={{ color: 'var(--muted-foreground)' }}>{score.total - score.correct} missed</span>
        </div>
        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Round {score.total + (answered ? 0 : 1)}
        </span>
      </div>

      {/* Challenge card */}
      <div className="glass rounded-3xl p-6 animate-fade-up">
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
            const isCorrectChoice = i === challenge.correctIndex
            const isSelectedChoice = i === selected

            let borderColor = 'var(--glass-border)'
            let bgColor = 'var(--glass-bg)'
            let textColor = 'var(--foreground)'
            let shadowStyle = 'none'

            if (answered) {
              if (isCorrectChoice) {
                borderColor = 'rgba(16,185,129,0.5)'
                bgColor = 'rgba(16,185,129,0.08)'
                textColor = '#10b981'
                shadowStyle = '0 0 16px rgba(16,185,129,0.2)'
              } else if (isSelectedChoice) {
                borderColor = 'rgba(239,68,68,0.4)'
                bgColor = 'rgba(239,68,68,0.06)'
                textColor = '#ef4444'
              }
            }

            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={answered}
                className="rounded-2xl px-4 py-3 text-left text-sm transition-all"
                style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  backdropFilter: 'blur(8px)',
                  color: textColor,
                  boxShadow: shadowStyle,
                }}
              >
                <span className="font-semibold mr-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {choice}
              </button>
            )
          })}
        </div>

        {/* After answer */}
        {answered && (
          <div className="flex flex-col gap-3">
            {challenge.idiom.example_sentence && (
              <div className="glass-strong rounded-2xl p-4" style={{ borderLeft: '3px solid #059669' }}>
                <p className="greek-text text-sm font-semibold" style={{ color: '#059669' }}>
                  {challenge.idiom.example_sentence}
                </p>
              </div>
            )}
            <button
              onClick={nextChallenge}
              className="w-full rounded-2xl py-3 text-sm font-semibold text-white glow-emerald transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
