'use client'

import { useState, useEffect, useRef } from 'react'
import type { Verb } from '@/types/verb'
import type { ConjugationTable, PersonTable } from '@/types/verb'

interface Props {
  verbs: Verb[]
}

const ALL_TENSES: { key: keyof ConjugationTable; label: string }[] = [
  { key: 'present',             label: 'Present'            },
  { key: 'imperfect',           label: 'Imperfect'          },
  { key: 'aorist',              label: 'Simple Past'        },
  { key: 'present_perfect',     label: 'Present Perfect'    },
  { key: 'pluperfect',          label: 'Past Perfect'       },
  { key: 'future_continuous',   label: 'Future Continuous'  },
  { key: 'future',              label: 'Future'             },
  { key: 'future_perfect',      label: 'Future Perfect'     },
  { key: 'conditional',         label: 'Conditional'        },
  { key: 'subjunctive_present', label: 'Subjunctive'        },
  { key: 'imperative',          label: 'Imperative'         },
  { key: 'imperative_negative', label: 'Imperative (neg.)'  },
]

const ALL_PERSONS: { key: keyof PersonTable; label: string }[] = [
  { key: 'sg1', label: 'I'        },
  { key: 'sg2', label: 'you'      },
  { key: 'sg3', label: 'he/she'   },
  { key: 'pl1', label: 'we'       },
  { key: 'pl2', label: 'you all'  },
  { key: 'pl3', label: 'they'     },
]

const IMPERATIVE_PERSONS: { key: keyof PersonTable; label: string }[] = [
  { key: 'sg2', label: 'you'     },
  { key: 'pl2', label: 'you all' },
]

const IMPERATIVE_KEYS = new Set<keyof ConjugationTable>(['imperative', 'imperative_negative'])

function makeForms(v: string) {
  const base = v.toLowerCase().replace(/^to\s+/, '').trim()
  const ing = base.endsWith('ie') ? base.slice(0, -2) + 'ying'
    : base.endsWith('e') ? base.slice(0, -1) + 'ing'
    : base + 'ing'
  const past = base.endsWith('e') ? base + 'd'
    : base.endsWith('y') && !/[aeiou]/.test(base[base.length - 2] ?? '') ? base.slice(0, -1) + 'ied'
    : base + 'ed'
  const cap = base.charAt(0).toUpperCase() + base.slice(1)
  return { base, ing, past, cap }
}

function makeEnglishSentence(
  tense: keyof ConjugationTable,
  personKey: keyof PersonTable,
  englishVerb: string,
): string {
  const { base, ing, past, cap } = makeForms(englishVerb || 'do it')
  const pro = ({
    sg1: 'I', sg2: 'you', sg3: 'he/she', pl1: 'we', pl2: 'you all', pl3: 'they',
  } as Record<string, string>)[personKey] ?? 'I'
  const toBe = pro === 'I' ? 'am' : pro === 'he/she' ? 'is' : 'are'
  const hadPast = (pro === 'I' || pro === 'he/she') ? 'was' : 'were'
  const hasPp = (pro === 'he/she') ? 'has' : 'have'

  switch (tense) {
    case 'present':             return `${pro} ${base} / ${pro} ${toBe} ${ing}`
    case 'imperfect':           return `${pro} ${hadPast} ${ing} / ${pro} used to ${base}`
    case 'aorist':              return `${pro} ${past}`
    case 'present_perfect':     return `${pro} ${hasPp} ${past}`
    case 'pluperfect':          return `${pro} had ${past}`
    case 'future_continuous':   return `${pro} will be ${ing}`
    case 'future':              return `${pro} will ${base}`
    case 'future_perfect':      return `${pro} will have ${past}`
    case 'conditional':         return `${pro} would ${base}`
    case 'subjunctive_present': return `that ${pro} ${base} (ongoing — να + present)`
    case 'subjunctive_aorist':  return `that ${pro} ${base} (completed — να + aorist)`
    case 'imperative':          return personKey === 'sg2' ? `${cap}! (to one person)` : `${cap}! (to a group)`
    case 'imperative_negative': return personKey === 'sg2' ? `Don't ${base}! (to one person)` : `Don't ${base}! (to a group)`
    default:                    return `${pro} ${base}`
  }
}

interface Challenge {
  verb: Verb
  tense: keyof ConjugationTable
  personKey: keyof PersonTable
  answer: string
  englishSentence: string
}

function pickChallenge(verbs: Verb[]): Challenge | null {
  const eligible = verbs.filter((v) => v.conjugations?.present?.active)
  if (!eligible.length) return null

  // Try up to 20 times to find a valid combo
  for (let i = 0; i < 20; i++) {
    const verb = eligible[Math.floor(Math.random() * eligible.length)]
    const availTenses = ALL_TENSES.filter(({ key }) => {
      const d = verb.conjugations[key] as { active?: PersonTable } | undefined
      return d?.active && Object.values(d.active).some((v) => v !== '')
    })
    if (!availTenses.length) continue

    const tenseDef = availTenses[Math.floor(Math.random() * availTenses.length)]
    const persons = IMPERATIVE_KEYS.has(tenseDef.key) ? IMPERATIVE_PERSONS : ALL_PERSONS
    const personDef = persons[Math.floor(Math.random() * persons.length)]

    const voiceTable = verb.conjugations[tenseDef.key] as { active?: PersonTable } | undefined
    const answer = voiceTable?.active?.[personDef.key] ?? ''
    if (!answer) continue

    return {
      verb,
      tense: tenseDef.key,
      personKey: personDef.key,
      answer,
      englishSentence: makeEnglishSentence(tenseDef.key, personDef.key, verb.english_translation),
    }
  }
  return null
}

function normalize(s: string) {
  return s.trim().toLowerCase()
    .replace(/ά/g, 'α').replace(/έ/g, 'ε').replace(/ή/g, 'η').replace(/ί/g, 'ι')
    .replace(/ό/g, 'ο').replace(/ύ/g, 'υ').replace(/ώ/g, 'ω')
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

  useEffect(() => { if (started) nextChallenge() }, [started]) // eslint-disable-line react-hooks/exhaustive-deps

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
            {verbs.length} verbs · all tenses · type the Greek
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

  return (
    <div className="flex flex-col gap-4">
      {/* Score bar */}
      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="font-semibold" style={{ color: '#10b981' }}>{score.correct} correct</span>
          <span style={{ color: 'var(--muted-foreground)' }}>{score.total - score.correct} missed</span>
        </div>
        {score.streak >= 2 && (
          <span className="text-sm font-bold text-gradient-gold">🔥 {score.streak} streak</span>
        )}
      </div>

      {/* Challenge card */}
      <div className="glass rounded-3xl p-6 animate-fade-up">
        {/* Verb header */}
        <div className="mb-1 flex flex-wrap items-baseline gap-2">
          <span className="greek-text text-2xl font-bold" style={{ color: '#0D5EAF' }}>
            {challenge.verb.greek_text}
          </span>
          {challenge.verb.english_translation && (
            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              ({challenge.verb.english_translation})
            </span>
          )}
        </div>

        {/* Natural English prompt */}
        <div className="mb-5 mt-4 glass-strong rounded-2xl px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>
            How would you say…
          </p>
          <p className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            &ldquo;{challenge.englishSentence}&rdquo;
          </p>
        </div>

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
              autoComplete="off"
              autoCorrect="off"
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
