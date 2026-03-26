'use client'

import { useState } from 'react'

type Level = 'beginner' | 'intermediate' | 'advanced'

interface Prompt {
  english: string
  hints: string[]
}

interface EvalResult {
  correct: boolean
  correction: string | null
  idealAnswer: string
  note: string
  nextPrompt: Prompt
}

const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const LEVEL_DESC: Record<Level, string> = {
  beginner: 'Present tense · greetings · basic vocabulary',
  intermediate: 'Past & future · adjectives · common phrases',
  advanced: 'Subjunctive · conditionals · complex sentences',
}

export default function ThinkInGreekPage() {
  const [level, setLevel] = useState<Level | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [result, setResult] = useState<EvalResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const startGame = async (chosenLevel: Level) => {
    setLevel(chosenLevel)
    setIsLoading(true)
    try {
      const res = await fetch(`/api/practice/evaluate?level=${chosenLevel}`)
      const data = await res.json()
      setCurrentPrompt(data.prompt)
    } catch {
      setCurrentPrompt({
        english: "How would you say: 'Hello, how are you?'",
        hints: ['γεια σου = hello/hi', 'πώς = how', 'τι κάνεις = how are you'],
      })
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!userAnswer.trim() || !currentPrompt || !level) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/practice/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer: userAnswer.trim(),
          englishPrompt: currentPrompt.english,
          level,
        }),
      })
      const data: EvalResult = await res.json()
      setResult(data)
      setScore((s) => ({
        correct: s.correct + (data.correct ? 1 : 0),
        total: s.total + 1,
      }))
    } catch {
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const nextRound = () => {
    if (!result?.nextPrompt) return
    setCurrentPrompt(result.nextPrompt)
    setResult(null)
    setUserAnswer('')
    setShowHints(false)
  }

  const reset = () => {
    setLevel(null)
    setCurrentPrompt(null)
    setResult(null)
    setUserAnswer('')
    setShowHints(false)
    setScore({ correct: 0, total: 0 })
  }

  // Level selection screen
  if (!level) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10">
        <div className="mb-8 text-center">
          <div className="text-5xl mb-3">🧠</div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
            Σκέψου Ελληνικά
          </h1>
          <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
            Think in Greek
          </p>
          <p className="mt-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            You get an English phrase and building-block hints. You type the Greek. No word banks, no multiple choice — just you constructing the language.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {(Object.keys(LEVEL_LABELS) as Level[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => startGame(lvl)}
              className="rounded-2xl border p-5 text-left transition-all hover:shadow-md"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="font-semibold mb-0.5" style={{ color: 'var(--foreground)' }}>
                {LEVEL_LABELS[lvl]}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {LEVEL_DESC[lvl]}
              </div>
            </button>
          ))}
        </div>
      </main>
    )
  }

  if (isLoading && !currentPrompt) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10 flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted-foreground)' }}
          >
            ← Back
          </button>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white capitalize"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            {level}
          </span>
        </div>
        {score.total > 0 && (
          <div className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {score.correct}/{score.total} correct
          </div>
        )}
      </div>

      {currentPrompt && (
        <div
          className="rounded-2xl border p-6 mb-4"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          {/* Prompt */}
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            {currentPrompt.english}
          </p>

          {/* Hints toggle */}
          <button
            onClick={() => setShowHints((v) => !v)}
            className="text-sm font-medium mb-4 transition-opacity hover:opacity-70"
            style={{ color: '#0D5EAF' }}
          >
            {showHints ? 'Hide hints' : 'Show hints'}
          </button>

          {showHints && (
            <div
              className="rounded-xl border p-3 mb-4 flex flex-wrap gap-2"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
            >
              {currentPrompt.hints.map((hint, i) => (
                <span
                  key={i}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium greek-text"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
                >
                  {hint}
                </span>
              ))}
            </div>
          )}

          {/* Answer input (only show if no result yet) */}
          {!result && (
            <div className="flex flex-col gap-3">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer() } }}
                placeholder="Type your Greek answer…"
                rows={2}
                className="w-full rounded-xl border px-4 py-3 text-base greek-text outline-none focus:ring-2 resize-none"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                autoFocus
              />
              <button
                onClick={submitAnswer}
                disabled={isLoading || !userAnswer.trim()}
                className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#0D5EAF' }}
              >
                {isLoading ? 'Checking…' : 'Submit'}
              </button>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="flex flex-col gap-4">
              {/* Verdict */}
              <div
                className="rounded-xl border px-4 py-3"
                style={{
                  backgroundColor: result.correct ? 'rgba(5,150,105,0.08)' : 'rgba(239,68,68,0.08)',
                  borderColor: result.correct ? '#059669' : '#ef4444',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{result.correct ? '✓' : '✗'}</span>
                  <span className="font-semibold text-sm" style={{ color: result.correct ? '#059669' : '#ef4444' }}>
                    {result.correct ? 'Correct!' : 'Not quite'}
                  </span>
                </div>
                {result.correction && (
                  <p className="text-sm greek-text mb-1" style={{ color: 'var(--foreground)' }}>
                    <span style={{ color: 'var(--muted-foreground)' }}>Correction: </span>
                    <strong>{result.correction}</strong>
                  </p>
                )}
                <p className="text-sm greek-text font-medium" style={{ color: 'var(--foreground)' }}>
                  <span style={{ color: 'var(--muted-foreground)' }}>Ideal: </span>
                  {result.idealAnswer}
                </p>
              </div>

              {/* Note */}
              {result.note && (
                <p className="text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
                  {result.note}
                </p>
              )}

              {/* Your answer */}
              <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Your answer: <span className="greek-text font-medium" style={{ color: 'var(--foreground)' }}>{userAnswer}</span>
              </div>

              <button
                onClick={nextRound}
                className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0D5EAF' }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
