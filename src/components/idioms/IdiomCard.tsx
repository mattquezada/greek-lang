import type { Idiom } from '@/types/idiom'

interface Props {
  idiom: Idiom
}

export default function IdiomCard({ idiom }: Props) {
  return (
    <div className="glass flex flex-col rounded-2xl p-5 card-3d transition-all">
      {/* Category badge */}
      <div className="mb-3">
        <span
          className="rounded-full px-3 py-0.5 text-xs font-medium capitalize text-white"
          style={{ backgroundColor: '#0D5EAF' }}
        >
          {idiom.category}
        </span>
      </div>

      {/* Greek text */}
      <p
        className="greek-text mb-1 text-2xl font-bold leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        {idiom.greek_text}
      </p>

      {/* Pronunciation */}
      <p className="mb-3 text-sm italic" style={{ color: 'var(--muted-foreground)' }}>
        {idiom.pronunciation}
      </p>

      {/* Literal translation */}
      <p className="mb-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
        <span className="font-medium" style={{ color: 'var(--foreground)' }}>
          Literally:{' '}
        </span>
        {idiom.literal_translation}
      </p>

      {/* Real meaning */}
      <p className="mb-3 text-sm" style={{ color: 'var(--foreground)' }}>
        <span className="font-semibold">Meaning: </span>
        {idiom.real_meaning}
      </p>

      {/* Example sentence */}
      {idiom.example_sentence && (
        <blockquote
          className="mt-auto border-l-4 pl-4 text-sm italic"
          style={{
            borderLeftColor: '#0D5EAF',
            color: 'var(--muted-foreground)',
          }}
        >
          <span className="greek-text">{idiom.example_sentence}</span>
        </blockquote>
      )}
    </div>
  )
}
