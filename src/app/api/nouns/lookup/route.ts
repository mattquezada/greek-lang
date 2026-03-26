import { createClient, createServiceClient } from '@/lib/supabase/server'
import { fetchWiktionaryNoun } from '@/lib/wiktionary/client'
import { getNounFromClaude, getNounByEnglish } from '@/lib/claude/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query) {
    return Response.json({ error: 'Query parameter q is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const supabaseAdmin = createServiceClient()

  // Step 1: Check Supabase cache
  const { data: cached } = await supabase
    .from('nouns')
    .select('*')
    .or(`greek_text.ilike.%${query}%,english_translation.ilike.%${query}%`)
    .limit(10)

  if (cached && cached.length > 0) {
    return Response.json({ nouns: cached, source: 'database' })
  }

  const isGreek = /[\u0370-\u03FF\u1F00-\u1FFF]/.test(query)

  // Step 2: English input with no DB match → ask Claude to find the Greek noun
  if (!isGreek) {
    const nounData = await getNounByEnglish(query)
    if (!nounData) {
      return Response.json({ nouns: [], source: 'none' })
    }

    const newNoun = {
      greek_text: nounData.greek_text || query,
      english_translation: nounData.english_translation ?? query,
      gender: nounData.gender ?? 'masculine',
      article: nounData.article ?? '',
      declension_class: nounData.declension_class ?? null,
      is_irregular: nounData.is_irregular ?? false,
      declensions: nounData.declensions,
      example_sentence: nounData.example_sentence ?? null,
      example_translation: nounData.example_translation ?? null,
    }

    const { data: saved } = await supabaseAdmin
      .from('nouns')
      .upsert(newNoun, { onConflict: 'greek_text', ignoreDuplicates: false })
      .select()

    return Response.json({ nouns: saved || [newNoun], source: 'claude' })
  }

  // Step 3: Greek input — try Wiktionary
  let nounData = await fetchWiktionaryNoun(query)
  let source = 'wiktionary'

  // Count filled case forms
  const caseCount = nounData?.declensions
    ? Object.values(nounData.declensions.singular).filter(Boolean).length +
      Object.values(nounData.declensions.plural).filter(Boolean).length
    : 0

  // Step 4: Fall back to Claude if Wiktionary returned incomplete data
  if (!nounData || caseCount < 4) {
    nounData = await getNounFromClaude(query)
    source = 'claude'
  }

  if (!nounData) {
    return Response.json({ nouns: [], source: 'none' })
  }

  const newNoun = {
    greek_text: query,
    english_translation: nounData.english_translation ?? '',
    gender: nounData.gender ?? 'masculine',
    article: nounData.article ?? '',
    declension_class: nounData.declension_class ?? null,
    is_irregular: nounData.is_irregular ?? false,
    declensions: nounData.declensions,
    example_sentence: nounData.example_sentence ?? null,
    example_translation: nounData.example_translation ?? null,
  }

  // Step 5: Upsert to Supabase cache
  const { data: saved } = await supabaseAdmin
    .from('nouns')
    .upsert(newNoun, { onConflict: 'greek_text', ignoreDuplicates: false })
    .select()

  return Response.json({
    nouns: saved || [newNoun],
    source,
  })
}
