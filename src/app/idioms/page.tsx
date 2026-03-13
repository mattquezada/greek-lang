import { createClient } from '@/lib/supabase/server'
import IdiomSearch from '@/components/idioms/IdiomSearch'

export default async function IdiomsPage() {
  const supabase = await createClient()
  const { data: idioms } = await supabase
    .from('idioms')
    .select('*')
    .order('id', { ascending: true })
    .limit(50)

  const safeIdioms = idioms ?? []

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
              Idioms &amp; Phrases
            </h1>
            <span
              className="rounded-full px-3 py-0.5 text-sm font-medium text-white"
              style={{ backgroundColor: '#0D5EAF' }}
            >
              {safeIdioms.length}+
            </span>
          </div>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Everyday Greek expressions with literal meanings and real usage
          </p>
        </div>
      </div>

      <IdiomSearch initialIdioms={safeIdioms} />
    </div>
  )
}
