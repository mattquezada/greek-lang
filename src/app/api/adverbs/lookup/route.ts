import { createClient, createServiceClient } from '@/lib/supabase/server'
import { getAdverbFromClaude, getAdverbByEnglish } from '@/lib/claude/client'

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
    .from('adverbs')
    .select('*')
    .or(`greek_text.ilike.%${query}%,english_translation.ilike.%${query}%`)
    .limit(10)

  if (cached && cached.length > 0) {
    return Response.json({ adverbs: cached, source: 'database' })
  }

  const isGreek = /[\u0370-\u03FF\u1F00-\u1FFF]/.test(query)

  // Step 2: English input with no DB match → ask Claude to find the Greek adverb
  if (!isGreek) {
    const adverbData = await getAdverbByEnglish(query)
    if (!adverbData) {
      return Response.json({ adverbs: [], source: 'none' })
    }

    const newAdverb = {
      greek_text: adverbData.greek_text || query,
      english_translation: adverbData.english_translation ?? query,
      category: adverbData.category ?? 'manner',
      example_sentence: adverbData.example_sentence ?? null,
      example_translation: adverbData.example_translation ?? null,
    }

    const { data: saved } = await supabaseAdmin
      .from('adverbs')
      .upsert(newAdverb, { onConflict: 'greek_text', ignoreDuplicates: false })
      .select()

    return Response.json({ adverbs: saved || [newAdverb], source: 'claude' })
  }

  // Step 3: Greek input — use Claude
  const adverbData = await getAdverbFromClaude(query)

  if (!adverbData) {
    return Response.json({ adverbs: [], source: 'none' })
  }

  const newAdverb = {
    greek_text: adverbData.greek_text || query,
    english_translation: adverbData.english_translation ?? '',
    category: adverbData.category ?? 'manner',
    example_sentence: adverbData.example_sentence ?? null,
    example_translation: adverbData.example_translation ?? null,
  }

  // Step 4: Upsert to Supabase cache
  const { data: saved } = await supabaseAdmin
    .from('adverbs')
    .upsert(newAdverb, { onConflict: 'greek_text', ignoreDuplicates: false })
    .select()

  return Response.json({
    adverbs: saved || [newAdverb],
    source: 'claude',
  })
}
