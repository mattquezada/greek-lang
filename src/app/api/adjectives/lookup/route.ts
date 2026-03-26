import { createClient, createServiceClient } from '@/lib/supabase/server'
import { getAdjectiveFromClaude, getAdjectiveByEnglish } from '@/lib/claude/client'

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
    .from('adjectives')
    .select('*')
    .or(`masculine.ilike.%${query}%,english_translation.ilike.%${query}%`)
    .limit(10)

  if (cached && cached.length > 0) {
    return Response.json({ adjectives: cached, source: 'database' })
  }

  const isGreek = /[\u0370-\u03FF\u1F00-\u1FFF]/.test(query)

  // Step 2: English input with no DB match → ask Claude to find the Greek adjective
  if (!isGreek) {
    const adjectiveData = await getAdjectiveByEnglish(query)
    if (!adjectiveData) {
      return Response.json({ adjectives: [], source: 'none' })
    }

    const newAdjective = {
      masculine: adjectiveData.masculine || query,
      feminine: adjectiveData.feminine ?? '',
      neuter: adjectiveData.neuter ?? '',
      english_translation: adjectiveData.english_translation ?? query,
      declension_class: adjectiveData.declension_class ?? null,
      is_irregular: adjectiveData.is_irregular ?? false,
      forms: adjectiveData.forms,
      example_sentence: adjectiveData.example_sentence ?? null,
      example_translation: adjectiveData.example_translation ?? null,
    }

    const { data: saved } = await supabaseAdmin
      .from('adjectives')
      .upsert(newAdjective, { onConflict: 'masculine', ignoreDuplicates: false })
      .select()

    return Response.json({ adjectives: saved || [newAdjective], source: 'claude' })
  }

  // Step 3: Greek input — use Claude
  const adjectiveData = await getAdjectiveFromClaude(query)

  if (!adjectiveData) {
    return Response.json({ adjectives: [], source: 'none' })
  }

  const newAdjective = {
    masculine: adjectiveData.masculine || query,
    feminine: adjectiveData.feminine ?? '',
    neuter: adjectiveData.neuter ?? '',
    english_translation: adjectiveData.english_translation ?? '',
    declension_class: adjectiveData.declension_class ?? null,
    is_irregular: adjectiveData.is_irregular ?? false,
    forms: adjectiveData.forms,
    example_sentence: adjectiveData.example_sentence ?? null,
    example_translation: adjectiveData.example_translation ?? null,
  }

  // Step 4: Upsert to Supabase cache
  const { data: saved } = await supabaseAdmin
    .from('adjectives')
    .upsert(newAdjective, { onConflict: 'masculine', ignoreDuplicates: false })
    .select()

  return Response.json({
    adjectives: saved || [newAdjective],
    source: 'claude',
  })
}
