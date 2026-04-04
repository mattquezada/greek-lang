'use client'

import { useState, useRef } from 'react'

type Level = 'beginner' | 'intermediate' | 'advanced'

interface Prompt {
  sentence: string
  answer: string
  english: string
  hint: string
  explanation: string
}

interface EvalResult {
  correct: boolean
  note: string | null
}

const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const LEVEL_DESC: Record<Level, string> = {
  beginner: 'Common nouns & present tense verbs',
  intermediate: 'Conjugated verbs, adjective agreement, prepositions',
  advanced: 'Subjunctive, conditionals, participles',
}

export default function FillBlank() {
  const [level, setLevel] = useState<Level | null>(null)
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [result, setResult] = useState<EvalResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0 })
  const inputRef = useRef<HTMLInputElement>(null)

  const loadPrompt = async (lvl: Level) => {
    setIsLoading(true)
    setResult(null)
    setUserAnswer('')
    setShowHint(false)
    try {
      const res = await fetch(`/api/practice/fill?level=${lvl}`)
      const data = await res.json()
      setPrompt(data)
      setTimeout(() => inputRef.current?.focus(), 50)
    } catch {
      setPrompt(null)
    } finally {
      setIsLoading(false)
    }
  }

  const startGame = (lvl: Level) => {
    setLevel(lvl)
    loadPrompt(lvl)
  }

  const submit = async () => {
    if (!userAnswer.trim() || !prompt || !level) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/practice/fill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer: userAnswer.trim(),
          correctAnswer: prompt.answer,
          sentence: prompt.sentence,
          english: prompt.english,
          level,
        }),
      })
      const data: EvalResult = await res.json()
      setResult(data)
      setScore((s) => ({
        correct: s.correct + (data.correct ? 1 : 0),
        total: s.total + 1,
        streak: data.correct ? s.streak + 1 : 0,
      }))
    } catch {
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setLevel(null)
    setPrompt(null)
    setResult(null)
    setUserAnswer('')
    setShowHint(false)
    setScore({ correct: 0, total: 0, streak: 0 })
  }

  // Level picker
  if (!level) {
    return (
      <div className="glass rounded-3xl p-10 flex flex-col items-center gap-6 text-center card-3d perspective">
        <div className="text-6xl animate-float-slow">✏️</div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gradient-blue">Fill in the Blank</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Complete Greek sentences by typing the missing word.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {(Object.keys(LEVEL_LABELS) as Level[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => startGame(lvl)}
              className="glass rounded-2xl px-5 py-4 text-left card-3d transition-all hover:opacity-90"
            >
              <div className="font-semibold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>{LEVEL_LABELS[lvl]}</div>
              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{LEVEL_DESC[lvl]}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (isLoading && !prompt) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!prompt) return null

  // Render sentence with blank highlighted
  const parts = prompt.sentence.split('___')

  return (
    <div className="flex flex-col gap-4">
      {/* Score bar */}
      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="font-semibold" style={{ color: '#10b981' }}>{score.correct} correct</span>
          <span style={{ color: 'var(--muted-foreground)' }}>{score.total - score.correct} missed</span>
          {score.streak >= 2 && <span className="font-bold text-gradient-gold">🔥 {score.streak}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs rounded-full px-2.5 py-0.5 font-semibold text-white capitalize" style={{ background: '#0D5EAF' }}>
            {level}
          </span>
          <button onClick={reset} className="text-xs transition-opacity hover:opacity-70" style={{ color: 'var(--muted-foreground)' }}>
            Change level
          </button>
        </div>
      </div>

      {/* Challenge card */}
      <div className="glass rounded-3xl p-6 animate-fade-up">
        {/* Sentence with blank */}
        <div className="glass-strong rounded-2xl px-5 py-4 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
            Complete the sentence
          </p>
          <p className="greek-text text-xl leading-relaxed font-medium" style={{ color: 'var(--foreground)' }}>
            {parts[0]}
            <span
              className="inline-block border-b-2 min-w-[60px] mx-1 text-center"
              style={{ borderColor: '#0D5EAF', color: result ? (result.correct ? '#10b981' : '#ef4444') : '#0D5EAF' }}
            >
              {result ? prompt.answer : (userAnswer || ' ')}
            </span>
            {parts[1]}
          </p>
          <p className="text-sm mt-2 italic" style={{ color: 'var(--muted-foreground)' }}>
            {prompt.english.replace(prompt.answer, '___')}
          </p>
        </div>

        {/* Hint */}
        {!result && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="text-sm font-medium mb-3 transition-opacity hover:opacity-70"
            style={{ color: '#0D5EAF' }}
          >
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
        )}
        {showHint && !result && (
          <div className="glass-strong rounded-xl px-4 py-2 mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            💡 {prompt.hint}
          </div>
        )}

        {/* Input */}
        {!result ? (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
              placeholder="Type the missing word…"
              className="input-glass flex-1 rounded-xl px-4 py-3 text-base greek-text"
              autoComplete="off"
              autoCorrect="off"
            />
            <button
              onClick={submit}
              disabled={!userAnswer.trim() || isLoading}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white glow-blue disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              {isLoading ? '…' : 'Check'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Result */}
            <div
              className="glass-strong rounded-2xl px-4 py-3"
              style={{
                border: `1px solid ${result.correct ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
                boxShadow: result.correct ? '0 0 20px rgba(16,185,129,0.15)' : '0 0 20px rgba(239,68,68,0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{result.correct ? '✓' : '✗'}</span>
                <span className="font-semibold text-sm" style={{ color: result.correct ? '#10b981' : '#ef4444' }}>
                  {result.correct ? 'Correct!' : 'Not quite'}
                </span>
              </div>
              <p className="text-sm">
                <span style={{ color: 'var(--muted-foreground)' }}>Answer: </span>
                <span className="greek-text font-bold" style={{ color: 'var(--foreground)' }}>{prompt.answer}</span>
              </p>
              {!result.correct && userAnswer && (
                <p className="text-sm mt-0.5">
                  <span style={{ color: 'var(--muted-foreground)' }}>Your answer: </span>
                  <span className="greek-text" style={{ color: '#ef4444' }}>{userAnswer}</span>
                </p>
              )}
              {result.note && (
                <p className="text-sm mt-2 italic" style={{ color: 'var(--muted-foreground)' }}>{result.note}</p>
              )}
            </div>

            {/* Explanation */}
            {prompt.explanation && (
              <div className="glass-strong rounded-2xl px-4 py-3 text-sm" style={{ borderLeft: '3px solid #0D5EAF' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Grammar note: </span>
                <span style={{ color: 'var(--foreground)' }}>{prompt.explanation}</span>
              </div>
            )}

            <button
              onClick={() => loadPrompt(level)}
              className="w-full rounded-2xl py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              {isLoading ? 'Loading…' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
