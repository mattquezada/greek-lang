import { createClient } from '@/lib/supabase/server'
import VocabQuiz from '@/components/practice/VocabQuiz'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Vocabulary Quiz | Elliniká' }

export default async function VocabPage() {
  const supabase = await createClient()

  const [{ data: verbs }, { data: nouns }, { data: adjectives }] = await Promise.all([
    supabase.from('verbs').select('greek_text, english_translation').limit(100),
    supabase.from('nouns').select('greek_text, english_translation').limit(100),
    supabase.from('adjectives').select('masculine, english_translation').limit(100),
  ])

  const words = [
    ...(verbs ?? []).filter((v) => v.english_translation).map((v) => ({
      greek: v.greek_text as string,
      english: v.english_translation as string,
      type: 'verb' as const,
    })),
    ...(nouns ?? []).filter((n) => n.english_translation).map((n) => ({
      greek: n.greek_text as string,
      english: n.english_translation as string,
      type: 'noun' as const,
    })),
    ...(adjectives ?? []).filter((a) => a.english_translation).map((a) => ({
      greek: a.masculine as string,
      english: a.english_translation as string,
      type: 'adjective' as const,
    })),
  ]

  return (
    <main className="mx-auto max-w-lg px-4 py-10 min-h-dvh bg-mesh">
      <div className="mb-6 flex items-center gap-3">
        <a href="/practice" className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--muted-foreground)' }}>
          ← Practice
        </a>
      </div>
      <VocabQuiz words={words} />
    </main>
  )
}
