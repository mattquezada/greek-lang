import { createClient } from '@/lib/supabase/server'
import AdverbSearch from '@/components/adverbs/AdverbSearch'

export const metadata = {
  title: 'Greek Adverbs | Elliniká',
  description: 'Common Greek adverbs grouped by category',
}

export default async function AdverbsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('adverbs').select('*').order('category').order('id').limit(200)
  const adverbs = data ?? []

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Adverbs
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Επιρρήματα — Place, time, manner, degree, and more
        </p>
      </div>

      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
      >
        Adverbs in Greek are{' '}
        <strong style={{ color: 'var(--foreground)' }}>invariable</strong> — they don&apos;t change form regardless of gender, number, or case. Many are formed by adding{' '}
        <strong style={{ color: 'var(--foreground)' }}>-α</strong> or{' '}
        <strong style={{ color: 'var(--foreground)' }}>-ως</strong> to an adjective stem.
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-sm font-medium"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
        >
          {adverbs.length} adverbs loaded
        </span>
      </div>

      <AdverbSearch initialAdverbs={adverbs} />
    </main>
  )
}
