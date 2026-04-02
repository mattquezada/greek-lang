'use client'

import { useState } from 'react'
import type { ConjugationTable, VoiceTable, PersonTable } from '@/types/verb'

interface Props {
  conjugations: ConjugationTable
  isIrregular: boolean
  exampleSentence?: string | null
  exampleTranslation?: string | null
}

const PERSONS = [
  { key: 'sg1', label: 'εγώ', english: 'I' },
  { key: 'sg2', label: 'εσύ', english: 'you' },
  { key: 'sg3', label: 'αυτός·η·ό', english: 'he/she/it' },
  { key: 'pl1', label: 'εμείς', english: 'we' },
  { key: 'pl2', label: 'εσείς', english: 'you all' },
  { key: 'pl3', label: 'αυτοί·ές', english: 'they' },
] as const

const ALL_TENSES = [
  { key: 'present', label: 'Present', aspect: 'Imperfective' },
  { key: 'imperfect', label: 'Imperfect', aspect: 'Imperfective' },
  { key: 'future_continuous', label: 'Future Cont.', aspect: 'Imperfective' },
  { key: 'aorist', label: 'Simple Past', aspect: 'Perfective' },
  { key: 'future', label: 'Future', aspect: 'Perfective' },
] as const

export default function ConjugationTable({
  conjugations,
  isIrregular,
  exampleSentence,
  exampleTranslation,
}: Props) {
  const [activeTense, setActiveTense] = useState<string>('present')
  const [activeVoice, setActiveVoice] = useState<'active' | 'passive'>('active')

  const availableTenses = ALL_TENSES.filter(({ key }) => conjugations[key as keyof ConjugationTable] != null)

  const validTense = availableTenses.find((t) => t.key === activeTense) ?? availableTenses[0]
  const currentTenseData = validTense
    ? (conjugations[validTense.key as keyof ConjugationTable] as VoiceTable | undefined)
    : undefined

  const hasPassive = !!(currentTenseData?.passive)
  const effectiveVoice = hasPassive ? activeVoice : 'active'

  function selectTense(key: string) {
    setActiveTense(key)
    setActiveVoice('active')
  }

  return (
    <div>
      {/* Irregular badge */}
      {isIrregular && (
        <div className="mb-4">
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: '#ef4444' }}>
            irregular
          </span>
        </div>
      )}

      {/* Tense tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {availableTenses.map(({ key, label, aspect }) => {
          const isActive = validTense?.key === key
          const isImperfective = aspect === 'Imperfective'
          return (
            <button
              key={key}
              onClick={() => selectTense(key)}
              className="rounded-xl px-3 py-2 text-sm font-medium transition-all text-left"
              style={
                isActive
                  ? { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff', boxShadow: '0 0 14px rgba(13,94,175,0.35)' }
                  : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)', color: 'var(--muted-foreground)' }
              }
            >
              <div>{label}</div>
              <div className="text-xs mt-0.5 opacity-60" style={{ fontSize: '10px' }}>
                {isImperfective ? '○' : '●'} {aspect}
              </div>
            </button>
          )
        })}
      </div>

      {/* Voice toggle */}
      {hasPassive && (
        <div className="mb-4 flex gap-2">
          {(['active', 'passive'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveVoice(v)}
              className="rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all"
              style={
                effectiveVoice === v
                  ? { background: 'var(--glass-bg-hover)', border: '1px solid var(--glass-border-strong)', backdropFilter: 'blur(8px)', color: 'var(--foreground)' }
                  : { background: 'transparent', color: 'var(--muted-foreground)' }
              }
            >
              {v === 'active' ? 'Active' : 'Passive'}
            </button>
          ))}
        </div>
      )}

      {/* Conjugation table */}
      {currentTenseData ? (
        <div className="glass-strong overflow-x-auto rounded-2xl p-4">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                  Person
                </th>
                <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                  Form
                </th>
              </tr>
            </thead>
            <tbody>
              {PERSONS.map(({ key, label, english }) => {
                const voice = currentTenseData[effectiveVoice] ?? currentTenseData.active
                return (
                  <tr key={key} className="border-b last:border-b-0" style={{ borderColor: 'var(--glass-border)' }}>
                    <td className="py-2.5 pr-4">
                      <span className="font-medium greek-text" style={{ color: 'var(--foreground)' }}>{label}</span>
                      <span className="ml-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>({english})</span>
                    </td>
                    <td className="py-2.5 font-bold greek-text text-base" style={{ color: '#0D5EAF' }}>
                      {voice[key as keyof PersonTable] || '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No data available for this tense.</p>
      )}

      {/* Example sentence */}
      {exampleSentence && (
        <div className="glass-strong rounded-2xl p-4 mt-5">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Example</p>
          <p className="text-lg font-bold greek-text" style={{ color: '#0D5EAF' }}>{exampleSentence}</p>
          {exampleTranslation && (
            <p className="mt-1 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>{exampleTranslation}</p>
          )}
        </div>
      )}
    </div>
  )
}
