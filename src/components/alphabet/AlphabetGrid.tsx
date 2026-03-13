import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LetterCard from './LetterCard'

export default async function AlphabetGrid() {
  const supabase = await createClient()
  const { data: letters, error } = await supabase
    .from('alphabet')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !letters) {
    return (
      <div className="py-12 text-center" style={{ color: 'var(--muted-foreground)' }}>
        Failed to load alphabet letters.
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p style={{ color: 'var(--muted-foreground)' }} className="text-sm">
          {letters.length} letters · click a card to learn more
        </p>
        <Link
          href="/alphabet?quiz=1"
          className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#0D5EAF' }}
        >
          Quiz Mode
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {letters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} isQuizMode={false} />
        ))}
      </div>
    </div>
  )
}
