'use client'

import type { DeclensionTable } from '@/types/noun'

interface Props {
  declensions: DeclensionTable
  greekText: string
  article: string
}

const CASES = [
  {
    key: 'nominative' as const,
    label: 'Nominative',
    greek: 'υποκείμενο',
    note: 'subject of the sentence',
  },
  {
    key: 'genitive' as const,
    label: 'Genitive',
    greek: 'γενική',
    note: 'possession, "of"',
  },
  {
    key: 'accusative' as const,
    label: 'Accusative',
    greek: 'αιτιατική',
    note: 'direct object',
  },
  {
    key: 'vocative' as const,
    label: 'Vocative',
    greek: 'κλητική',
    note: 'direct address',
  },
]

export default function DeclensionTable({ declensions, greekText, article }: Props) {
  return (
    <div>
      <div className="glass-strong overflow-x-auto rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Case
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Singular
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Plural
              </th>
            </tr>
          </thead>
          <tbody>
            {CASES.map(({ key, label, greek }) => (
              <tr
                key={key}
                className="border-t last:border-b-0"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <td className="px-4 py-3">
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                    {label}
                  </span>
                  <span className="ml-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    ({greek})
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#0D5EAF' }}>
                  {declensions.singular[key] || '—'}
                </td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#0D5EAF' }}>
                  {declensions.plural[key] || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Case notes */}
      <div className="glass mt-3 rounded-xl px-4 py-3">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
          Case usage
        </p>
        <ul className="space-y-1">
          {CASES.map(({ label, note }) => (
            <li key={label} className="flex gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>{label}:</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
