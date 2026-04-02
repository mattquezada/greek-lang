'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AssessQuestion } from '@/app/api/practice/assess/route'

type Step = 'intro' | 'loading' | 'questions' | 'submitting' | 'results'

interface Result {
  level: string
  score: number
  total: number
  recommendations: string[]
}

const LEVEL_DESCRIPTIONS: Record<string, string> = {
  A1: 'Beginner — you know greetings and basic words',
  A2: 'Elementary — you can handle simple everyday phrases',
  B1: 'Intermediate — you can navigate most everyday situations',
  B2: 'Upper Intermediate — you can discuss abstract topics fluently',
}

const LEVEL_LINKS: Record<string, { label: string; href: string }[]> = {
  A1: [
    { label: 'Greek Alphabet', href: '/alphabet' },
    { label: 'Basic Nouns', href: '/nouns' },
    { label: 'Beginner Practice', href: '/practice/think' },
  ],
  A2: [
    { label: 'Common Verbs', href: '/verbs' },
    { label: 'Think in Greek', href: '/practice/think' },
    { label: 'Everyday Idioms', href: '/idioms' },
  ],
  B1: [
    { label: 'Verb Aspects', href: '/verbs' },
    { label: 'Verb Drill', href: '/practice/drill' },
    { label: 'Chat with Eleni', href: '/chat' },
  ],
  B2: [
    { label: 'Advanced Grammar', href: '/grammar' },
    { label: 'Idiom Quiz', href: '/practice/idioms' },
    { label: 'Translator', href: '/translate' },
  ],
}

export default function LevelAssessmentClient() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('intro')
  const [questions, setQuestions] = useState<AssessQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ id: number; level: string; question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [saving, setSaving] = useState(false)

  async function startAssessment() {
    setStep('loading')
    try {
      const res = await fetch('/api/practice/assess')
      const data = await res.json()
      setQuestions(data.questions ?? [])
      setCurrent(0)
      setAnswers([])
      setSelected(null)
      setStep('questions')
    } catch {
      setStep('intro')
    }
  }

  function confirmAnswer() {
    if (selected === null) return
    const q = questions[current]
    const newAnswer = {
      id: q.id,
      level: q.level,
      question: q.question,
      userAnswer: q.options[selected],
      correctAnswer: q.options[q.correctIndex],
      isCorrect: selected === q.correctIndex,
    }
    const updated = [...answers, newAnswer]
    setAnswers(updated)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      submitAnswers(updated)
    }
  }

  async function submitAnswers(finalAnswers: typeof answers) {
    setStep('submitting')
    try {
      const res = await fetch('/api/practice/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })
      const data = await res.json()
      setResult(data)
      setStep('results')
    } catch {
      setStep('intro')
    }
  }

  async function saveAndGoHome() {
    if (!result) return
    setSaving(true)
    try {
      await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: result.level }),
      })
    } catch {
      // silently fail
    } finally {
      setSaving(false)
      router.push('/dashboard')
    }
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="glass rounded-3xl p-8 sm:p-10 text-center card-3d max-w-md mx-auto animate-fade-up">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Greek Level Test</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
          7 multiple-choice questions spanning A1 to B2. Takes about 2 minutes.
          Your result unlocks personalised practice recommendations.
        </p>
        <div className="flex flex-col gap-2 text-sm text-left mb-6 glass-strong rounded-2xl p-4">
          {['A1 — Alphabet & greetings', 'A2 — Basic grammar & past tense', 'B1 — Verb aspects & cases', 'B2 — Subjunctive constructions'].map((l) => (
            <div key={l} className="flex items-center gap-2">
              <span style={{ color: '#7c3aed' }}>◆</span>
              <span style={{ color: 'var(--muted-foreground)' }}>{l}</span>
            </div>
          ))}
        </div>
        <button
          onClick={startAssessment}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          Start Assessment
        </button>
      </div>
    )
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2" style={{ borderColor: '#7c3aed', borderTopColor: 'transparent' }} />
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Preparing your assessment…</p>
      </div>
    )
  }

  // ── Questions ──────────────────────────────────────────────────────────────
  if (step === 'questions' && questions.length > 0) {
    const q = questions[current]
    const progress = ((current) / questions.length) * 100

    return (
      <div className="max-w-lg mx-auto animate-fade-up">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
            <span>Question {current + 1} of {questions.length}</span>
            <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(124,58,237,0.15)', color: '#7c3aed' }}>{q.level}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--glass-bg-hover)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }} />
          </div>
        </div>

        {/* Question card */}
        <div className="glass rounded-2xl p-6 mb-4">
          <p className="text-base font-semibold greek-text mb-1" style={{ color: 'var(--foreground)' }}>{q.question}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-6">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="rounded-xl px-5 py-3.5 text-sm font-medium text-left transition-all"
              style={
                selected === i
                  ? { background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }
                  : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }
              }
            >
              <span className="mr-3 font-bold" style={{ color: selected === i ? 'rgba(255,255,255,0.7)' : 'var(--muted-foreground)' }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={confirmAnswer}
          disabled={selected === null}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          {current + 1 === questions.length ? 'Submit' : 'Next →'}
        </button>
      </div>
    )
  }

  // ── Submitting ─────────────────────────────────────────────────────────────
  if (step === 'submitting') {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2" style={{ borderColor: '#7c3aed', borderTopColor: 'transparent' }} />
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Calculating your level…</p>
      </div>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (step === 'results' && result) {
    const pct = Math.round((result.score / result.total) * 100)
    const links = LEVEL_LINKS[result.level] ?? []

    return (
      <div className="max-w-lg mx-auto animate-fade-up">
        <div className="glass rounded-3xl p-8 text-center mb-4">
          <div className="text-5xl mb-3">🏆</div>
          <div
            className="inline-block rounded-full px-5 py-1.5 text-2xl font-bold mb-3"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
          >
            {result.level}
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>{LEVEL_DESCRIPTIONS[result.level]}</p>
          <p className="text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {result.score} / {result.total} correct ({pct}%)
          </p>

          {/* Score bar */}
          <div className="h-2 rounded-full overflow-hidden mb-6" style={{ background: 'var(--glass-bg-hover)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }} />
          </div>

          {/* Recommendations */}
          <div className="text-left mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>What to practice next</p>
            <div className="flex flex-col gap-2">
              {result.recommendations.map((r, i) => (
                <div key={i} className="glass rounded-xl px-4 py-2.5 flex items-start gap-2">
                  <span style={{ color: '#7c3aed', flexShrink: 0 }}>◆</span>
                  <p className="text-xs" style={{ color: 'var(--foreground)' }}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                style={{ background: 'rgba(124,58,237,0.12)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.25)' }}
              >
                {l.label} →
              </a>
            ))}
          </div>

          <button
            onClick={saveAndGoHome}
            disabled={saving}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
          >
            {saving ? 'Saving…' : 'Save & go to dashboard'}
          </button>
        </div>

        <button
          onClick={() => { setStep('intro'); setResult(null); setAnswers([]) }}
          className="w-full text-sm text-center transition-opacity hover:opacity-70"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Retake assessment
        </button>
      </div>
    )
  }

  return null
}
