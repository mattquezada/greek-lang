import { createClient } from '@/lib/supabase/server'
import { getWordDataFromClaude } from '@/lib/claude/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()
  const type = searchParams.get('type') ?? 'any'

  if (!query) {
    return Response.json({ error: 'Query parameter q is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const isGreek = /[\u0370-\u03FF\u1F00-\u1FFF]/.test(query)

  // Check all typed tables in parallel for a cached match
  const [verbsRes, nounsRes, adjectivesRes, adverbsRes] = await Promise.all([
    supabase.from('verbs').select('*').or(`greek_text.ilike.%${query}%,english_translation.ilike.%${query}%`).limit(1),
    supabase.from('nouns').select('*').or(`greek_text.ilike.%${query}%,english_translation.ilike.%${query}%`).limit(1),
    supabase.from('adjectives').select('*').or(`masculine.ilike.%${query}%,english_translation.ilike.%${query}%`).limit(1),
    supabase.from('adverbs').select('*').or(`greek_text.ilike.%${query}%,english_translation.ilike.%${query}%`).limit(1),
  ])

  // Return first typed match found with its full data
  if (verbsRes.data?.[0]) {
    const v = verbsRes.data[0]
    return Response.json({
      result: {
        word: v.greek_text,
        type: 'verb',
        english_translation: v.english_translation,
        example_sentence: v.example_sentence ?? undefined,
        example_translation: v.example_translation ?? undefined,
        full_data: v,
      },
      source: 'database',
    })
  }
  if (nounsRes.data?.[0]) {
    const n = nounsRes.data[0]
    return Response.json({
      result: {
        word: `${n.article} ${n.greek_text}`,
        type: 'noun',
        english_translation: n.english_translation,
        notes: `${n.gender} noun`,
        example_sentence: n.example_sentence ?? undefined,
        example_translation: n.example_translation ?? undefined,
        full_data: n,
      },
      source: 'database',
    })
  }
  if (adjectivesRes.data?.[0]) {
    const a = adjectivesRes.data[0]
    return Response.json({
      result: {
        word: `${a.masculine} / ${a.feminine} / ${a.neuter}`,
        type: 'adjective',
        english_translation: a.english_translation,
        example_sentence: a.example_sentence ?? undefined,
        example_translation: a.example_translation ?? undefined,
        full_data: a,
      },
      source: 'database',
    })
  }
  if (adverbsRes.data?.[0]) {
    const adv = adverbsRes.data[0]
    return Response.json({
      result: {
        word: adv.greek_text,
        type: 'adverb',
        english_translation: adv.english_translation,
        notes: `${adv.category} adverb`,
        example_sentence: adv.example_sentence ?? undefined,
        example_translation: adv.example_translation ?? undefined,
        full_data: adv,
      },
      source: 'database',
    })
  }

  // Nothing in DB — ask Claude for basic info (Greek only)
  if (!isGreek) {
    return Response.json({ result: null, source: 'none' })
  }

  const wordData = await getWordDataFromClaude(query, type)
  if (!wordData) {
    return Response.json({ result: null, source: 'none' })
  }

  return Response.json({ result: wordData, source: 'claude' })
}
