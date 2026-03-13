import { createClient, createServiceClient } from '@/lib/supabase/server'
import { fetchWiktionaryConjugation } from '@/lib/wiktionary/client'
import { getConjugationFromClaude } from '@/lib/claude/client'
import type { ConjugationTable } from '@/types/verb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query) {
    return Response.json({ error: 'Query parameter q is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const supabaseAdmin = createServiceClient()

  // Step 1: Check Supabase first (exact match or English search)
  const { data: exactMatch } = await supabase
    .from('verbs')
    .select('*')
    .or(`greek_text.ilike.%${query}%,english_translation.ilike.%${query}%`)
    .limit(10)

  if (exactMatch && exactMatch.length > 0) {
    return Response.json({ verbs: exactMatch, source: 'database' })
  }

  // Step 2: If looks like Greek, try tiered lookup for a single verb
  const isGreek = /[\u0370-\u03FF\u1F00-\u1FFF]/.test(query)
  if (!isGreek) {
    return Response.json({ verbs: [], source: 'database' })
  }

  // Step 3: Try Wiktionary
  let conjugations: ConjugationTable | null = null
  let source = 'wiktionary'

  conjugations = await fetchWiktionaryConjugation(query)

  // Count how many tenses we got
  const tenseCount = conjugations
    ? [conjugations.present, conjugations.imperfect, conjugations.aorist, conjugations.future]
        .filter(Boolean).length
    : 0

  // Step 4: If Wiktionary gave < 3 tenses, fall back to Claude
  if (!conjugations || tenseCount < 3) {
    conjugations = await getConjugationFromClaude(query)
    source = 'claude'
  }

  if (!conjugations) {
    return Response.json({ verbs: [], source: 'none' })
  }

  // Step 5: Save to Supabase
  const newVerb = {
    greek_text: query,
    english_translation: '',
    verb_class: null,
    is_irregular: false,
    aspect_note: null,
    conjugations,
  }

  const { data: saved } = await supabaseAdmin
    .from('verbs')
    .upsert(newVerb, { onConflict: 'greek_text', ignoreDuplicates: false })
    .select()

  return Response.json({
    verbs: saved || [newVerb],
    source,
  })
}
