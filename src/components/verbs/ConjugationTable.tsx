'use client'

import { useState } from 'react'
import type { ConjugationTable, VoiceTable, PersonTable } from '@/types/verb'

interface Props {
  conjugations: ConjugationTable
  isIrregular: boolean
  englishVerb?: string | null
  exampleSentence?: string | null
  exampleTranslation?: string | null
}

function makeForms(englishVerb: string) {
  const base = englishVerb.toLowerCase().replace(/^to\s+/, '').trim()
  const ing = base.endsWith('ie')
    ? base.slice(0, -2) + 'ying'
    : base.endsWith('e')
    ? base.slice(0, -1) + 'ing'
    : base + 'ing'
  const past = base.endsWith('e') ? base + 'd' : base + 'ed'
  const cap = base.charAt(0).toUpperCase() + base.slice(1)
  return { base, ing, past, cap }
}

const PERSONS = [
  { key: 'sg1', label: 'εγώ',       english: 'I'         },
  { key: 'sg2', label: 'εσύ',       english: 'you'       },
  { key: 'sg3', label: 'αυτός·η·ό', english: 'he/she/it' },
  { key: 'pl1', label: 'εμείς',     english: 'we'        },
  { key: 'pl2', label: 'εσείς',     english: 'you all'   },
  { key: 'pl3', label: 'αυτοί·ές',  english: 'they'      },
] as const

const IMPERATIVE_PERSONS = [
  { key: 'sg2', label: 'εσύ',   english: 'you (sg.)' },
  { key: 'pl2', label: 'εσείς', english: 'you (pl.)' },
] as const

const IMPERATIVE_KEYS = new Set(['imperative', 'imperative_negative'])

interface TenseDef {
  key: keyof ConjugationTable
  label: string
  englishDesc: string
}

function buildTenses(englishVerb?: string | null): TenseDef[] {
  const { base, ing, past, cap } = englishVerb
    ? makeForms(englishVerb)
    : { base: '…', ing: '…', past: '…', cap: '…' }
  return [
    { key: 'present',             label: 'Present',               englishDesc: `I ${base} / I am ${ing}`          },
    { key: 'imperfect',           label: 'Imperfect',             englishDesc: `I was ${ing} / I used to ${base}` },
    { key: 'aorist',              label: 'Simple Past',           englishDesc: `I ${past}`                        },
    { key: 'present_perfect',     label: 'Present Perfect',       englishDesc: `I have ${past}`                   },
    { key: 'pluperfect',          label: 'Past Perfect',          englishDesc: `I had ${past}`                    },
    { key: 'future_continuous',   label: 'Future Continuous',     englishDesc: `I will be ${ing}`                 },
    { key: 'future',              label: 'Future',                englishDesc: `I will ${base}`                   },
    { key: 'future_perfect',      label: 'Future Perfect',        englishDesc: `I will have ${past}`              },
    { key: 'conditional',         label: 'Conditional',           englishDesc: `I would ${base}`                  },
    { key: 'subjunctive_present', label: 'Subjunctive (Present)', englishDesc: `that I ${base} (να + present)`    },
    { key: 'subjunctive_aorist',  label: 'Subjunctive (Aorist)',  englishDesc: `that I ${base} once (να + aorist)` },
    { key: 'imperative',          label: 'Imperative',            englishDesc: `${cap}! (affirmative)`            },
    { key: 'imperative_negative', label: 'Imperative (Negative)', englishDesc: `Don't ${base}! (negative)`       },
  ]
}

function hasValues(table: PersonTable): boolean {
  return Object.values(table).some((v) => v !== '')
}

export default function ConjugationTable({
  conjugations,
  isIrregular,
  englishVerb,
  exampleSentence,
  exampleTranslation,
}: Props) {
  const [voice, setVoice] = useState<'active' | 'passive'>('active')

  const tenses = buildTenses(englishVerb)
  const availableTenses = tenses.filter(({ key }) => conjugations[key as keyof ConjugationTable] != null)

  const hasAnyPassive = availableTenses.some(({ key }) => {
    const data = conjugations[key as keyof ConjugationTable] as VoiceTable | undefined
    return data?.passive && hasValues(data.passive)
  })

  function getVoiceData(data: VoiceTable): PersonTable {
    if (voice === 'passive' && data.passive && hasValues(data.passive)) {
      return data.passive
    }
    return data.active
  }

  return (
    <div className="space-y-4">
      {/* Irregular badge */}
      {isIrregular && (
        <div>
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: '#ef4444' }}>
            irregular
          </span>
        </div>
      )}

      {/* Global voice toggle */}
      {hasAnyPassive && (
        <div className="flex gap-2">
          {(['active', 'passive'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVoice(v)}
              className="rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all"
              style={
                voice === v
                  ? { background: 'var(--glass-bg-hover)', border: '1px solid var(--glass-border-strong)', backdropFilter: 'blur(8px)', color: 'var(--foreground)' }
                  : { background: 'transparent', color: 'var(--muted-foreground)' }
              }
            >
              {v === 'active' ? 'Active' : 'Passive'}
            </button>
          ))}
        </div>
      )}

      {/* One card per tense */}
      {availableTenses.map(({ key, label, englishDesc }) => {
        const data = conjugations[key as keyof ConjugationTable] as VoiceTable
        const isImperative = IMPERATIVE_KEYS.has(key as string)
        const persons = isImperative ? IMPERATIVE_PERSONS : PERSONS
        const voiceData = getVoiceData(data)

        return (
          <div key={key as string} className="glass-strong overflow-x-auto rounded-2xl p-4">
            {/* Tense header */}
            <div className="mb-3">
              <span className="font-semibold" style={{ color: '#0D5EAF' }}>{label}</span>
              <span className="ml-2 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>{englishDesc}</span>
            </div>

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
                {persons.map(({ key: pk, label: personLabel, english }) => (
                  <tr key={pk} className="border-b last:border-b-0" style={{ borderColor: 'var(--glass-border)' }}>
                    <td className="py-2.5 pr-4">
                      <span className="font-medium greek-text" style={{ color: 'var(--foreground)' }}>{personLabel}</span>
                      <span className="ml-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>({english})</span>
                    </td>
                    <td className="py-2.5 font-bold greek-text text-base" style={{ color: '#0D5EAF' }}>
                      {voiceData[pk as keyof PersonTable] || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}

      {/* Example sentence */}
      {exampleSentence && (
        <div className="glass-strong rounded-2xl p-4">
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
