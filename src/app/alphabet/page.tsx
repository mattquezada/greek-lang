import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AlphabetGrid from '@/components/alphabet/AlphabetGrid'
import QuizMode from '@/components/alphabet/QuizMode'

interface PageProps {
  searchParams: Promise<{ quiz?: string }>
}

export default async function AlphabetPage({ searchParams }: PageProps) {
  const params = await searchParams
  const isQuiz = params.quiz === '1'

  const supabase = await createClient()
  const { data: letters } = await supabase
    .from('alphabet')
    .select('*')
    .order('sort_order', { ascending: true })

  const safeLetters = letters ?? []

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Greek Alphabet
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            24 letters · Αλφάβητο
          </p>
        </div>

        {/* Mode toggle */}
        <div
          className="flex items-center gap-2 rounded-xl border p-1"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <Link
            href="/alphabet"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            style={
              !isQuiz
                ? { backgroundColor: '#0D5EAF', color: '#fff' }
                : { color: 'var(--muted-foreground)' }
            }
          >
            Study Mode
          </Link>
          <Link
            href="/alphabet?quiz=1"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            style={
              isQuiz
                ? { backgroundColor: '#0D5EAF', color: '#fff' }
                : { color: 'var(--muted-foreground)' }
            }
          >
            Quiz Mode
          </Link>
        </div>
      </div>

      {isQuiz ? (
        <QuizMode letters={safeLetters} />
      ) : (
        <AlphabetGrid />
      )}
    </div>
  )
}
