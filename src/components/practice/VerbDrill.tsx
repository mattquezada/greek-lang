'use client'

import { useState, useEffect, useRef } from 'react'
import type { Verb } from '@/types/verb'

interface Props {
  verbs: Verb[]
}

const TENSES = [
  { key: 'present', label: 'Present' },
  { key: 'imperfect', label: 'Imperfect' },
  { key: 'aorist', label: 'Aorist' },
  { key: 'future', label: 'Future' },
] as const

const PERSONS = [
  { key: 'sg1', label: '1st singular', greek: 'εγώ' },
  { key: 'sg2', label: '2nd singular', greek: 'εσύ' },
  { key: 'sg3', label: '3rd singular', greek: 'αυτός/ή/ό' },
  { key: 'pl1', label: '1st plural', greek: 'εμείς' },
  { key: 'pl2', label: '2nd plural', greek: 'εσείς' },
  { key: 'pl3', label: '3rd plural', greek: 'αυτοί/ές' },
] as const

type TenseKey = typeof TENSES[number]['key']
type PersonKey = typeof PERSONS[number]['key']

interface Challenge {
  verb: Verb
  tense: TenseKey
  person: PersonKey
  answer: string
}

function pickChallenge(verbs: Verb[]): Challenge | null {
  const eligible = verbs.filter((v) => v.conjugations?.present?.active)
  if (eligible.length === 0) return null
  const verb = eligible[Math.floor(Math.random() * eligible.length)]
  const availableTenses = TENSES.filter((t) => verb.conjugations[t.key]?.active)
  if (availableTenses.length === 0) return null
  const tense = availableTenses[Math.floor(Math.random() * availableTenses.length)]
  const person = PERSONS[Math.floor(Math.random() * PERSONS.length)]
  const answer = verb.conjugations[tense.key]?.active?.[person.key] ?? ''
  if (!answer) return null
  return { verb, tense: tense.key, person: person.key, answer }
}

function normalize(s: string) {
  return s.trim().toLowerCase()
    .replace(/ά/g, 'α').replace(/έ/g, 'ε').replace(/ή/g, 'η').replace(/ί/g, 'ι').replace(/ό/g, 'ο').replace(/ύ/g, 'υ').replace(/ώ/g, 'ω')
    .replace(/ϊ/g, 'ι').replace(/ϋ/g, 'υ').replace(/ΐ/g, 'ι').replace(/ΰ/g, 'υ')
}

export default function VerbDrill({ verbs }: Props) {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0 })
  const [started, setStarted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const nextChallenge = () => {
    setChallenge(pickChallenge(verbs))
    setUserAnswer('')
    setSubmitted(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  useEffect(() => {
    if (started) nextChallenge()
  }, [started])

  const submit = () => {
    if (!challenge || !userAnswer.trim()) return
    const correct = normalize(userAnswer) === normalize(challenge.answer)
    setIsCorrect(correct)
    setSubmitted(true)
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
      streak: correct ? s.streak + 1 : 0,
    }))
  }

  if (!started) {
    return (
      <div className="glass rounded-3xl p-10 flex flex-col items-center gap-6 text-center card-3d perspective">
        <div className="text-6xl animate-float-slow">⚡</div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gradient-blue">Verb Drill</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {verbs.length} verbs loaded · type the conjugated form
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Accent marks are optional — we check the root form.
          </p>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="rounded-2xl px-10 py-3.5 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
        >
          Start Drill
        </button>
      </div>
    )
  }

  if (!challenge) {
    return (
      <p className="text-center py-10" style={{ color: 'var(--muted-foreground)' }}>
        No verbs available. Search for some verbs first.
      </p>
    )
  }

  const personData = PERSONS.find((p) => p.key === challenge.person)!
  const tenseData = TENSES.find((t) => t.key === challenge.tense)!

  return (
    <div className="flex flex-col gap-4">
      {/* Score bar */}
      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="font-semibold" style={{ color: '#10b981' }}>{score.correct} correct</span>
          <span style={{ color: 'var(--muted-foreground)' }}>{score.total - score.correct} missed</span>
        </div>
        {score.streak >= 2 && (
          <span className="text-sm font-bold text-gradient-gold">
            🔥 {score.streak} streak
          </span>
        )}
      </div>

      {/* Challenge card */}
      <div className="glass rounded-3xl p-6 animate-fade-up">
        {/* Verb + tense */}
        <div className="mb-2">
          <span className="greek-text text-2xl font-bold" style={{ color: '#0D5EAF' }}>
            {challenge.verb.greek_text}
          </span>
          {challenge.verb.english_translation && (
            <span className="ml-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              ({challenge.verb.english_translation})
            </span>
          )}
        </div>
        <div className="mb-5 flex gap-2 flex-wrap">
          <span
            className="rounded-full px-3 py-0.5 text-xs font-semibold text-white glow-violet"
            style={{ background: '#7c3aed' }}
          >
            {tenseData.label}
          </span>
          <span className="glass rounded-full px-3 py-0.5 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {personData.label}
          </span>
          <span className="glass rounded-full px-3 py-0.5 text-xs font-medium greek-text" style={{ color: 'var(--muted-foreground)' }}>
            {personData.greek}
          </span>
        </div>

        <p className="mb-4 text-base font-medium" style={{ color: 'var(--foreground)' }}>
          What is the {tenseData.label.toLowerCase()} active form for <strong>{personData.label}</strong>?
        </p>

        {!submitted ? (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
              placeholder="Type the Greek form…"
              className="input-glass flex-1 rounded-xl px-4 py-3 text-base greek-text"
            />
            <button
              onClick={submit}
              disabled={!userAnswer.trim()}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              Check
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div
              className="glass-strong rounded-2xl px-4 py-3"
              style={{
                border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
                boxShadow: isCorrect ? '0 0 20px rgba(16,185,129,0.2)' : '0 0 20px rgba(239,68,68,0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{isCorrect ? '✓' : '✗'}</span>
                <span className="font-semibold text-sm" style={{ color: isCorrect ? '#10b981' : '#ef4444' }}>
                  {isCorrect ? 'Correct!' : 'Not quite'}
                </span>
              </div>
              <p className="greek-text text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                {challenge.answer}
              </p>
              {!isCorrect && (
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Your answer: <span className="greek-text">{userAnswer}</span>
                </p>
              )}
            </div>
            <button
              onClick={nextChallenge}
              className="w-full rounded-2xl py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
