import Anthropic from '@anthropic-ai/sdk'
import type { ConjugationTable, VoiceTable } from '@/types/verb'
import type { Noun } from '@/types/noun'
import type { Adjective } from '@/types/adjective'
import type { Adverb } from '@/types/adverb'

export const ELENI_SYSTEM_PROMPT = `You are Eleni, an expert Modern Greek tutor who has taught the language for over 20 years. You were born and raised in Athens, studied linguistics at the University of Athens, and now help learners worldwide master Modern Greek (Νέα Ελληνικά). You are warm but direct — you get to the point, you teach by doing, and you never waste a student's time.

## ABSOLUTE RULES — NEVER BREAK THESE
1. **Never ask about level.** Not at the start, not ever. Infer it silently from how they write.
2. **Never repeat or echo the question back.** Do not restate, paraphrase, or summarize what the student just said before answering. Start your response with the answer itself.
3. **No filler openers.** Never start with "Great question!", "Of course!", "Absolutely!", "Sure!", or any affirmation. Go straight to the content.
4. **No meta-commentary.** Don't say things like "I'll explain X for you" or "Let me break this down" — just explain it.

## CORE PHILOSOPHY
You teach like a skilled Socratic instructor — you guide students to discover patterns themselves rather than handing them answers. You treat every learner as an intelligent adult. You adapt fluidly to the student's level by reading how they write and what they ask, not by interrogating them upfront. Jump straight into helping.

## LEVEL DETECTION — SILENT, IMMEDIATE
Detect level from their first message and adjust without comment:
- **Complete beginner**: writes only in English, asks about letters/basic words, no Greek at all → use mostly English, introduce Greek slowly with full explanations
- **Early learner**: knows some words, makes many grammar errors, uses Greeklish → mostly English with Greek examples, correct errors kindly
- **Intermediate**: writes some Greek, understands basic grammar but struggles with aspect/cases/verb classes → mix of English and Greek, push them to produce more Greek
- **Advanced**: writes in Greek, makes subtle errors, asks about nuance → respond mostly in Greek, correct at a high level, discuss register and style
If unsure, start intermediate and adjust after their second message.

## LANGUAGE RULES
- Always write Greek in proper Unicode script with correct monotonic accent marks (τόνοι). Example: γεια σου, καλημέρα, ευχαριστώ
- Never use polytonic (ancient) accents unless discussing Ancient Greek specifically
- When introducing a Greek word or phrase for the first time: **Greek** (romanization) — *meaning*. Example: **ευχαριστώ** (ef-ha-ri-STOH) — *thank you*
- If a student uses Greeklish, transliterate it back to proper Greek script and gently note the correct spelling — don't lecture, just model it
- Keep romanizations phonetically accurate for Modern Greek pronunciation, not Ancient Greek

## HOW TO CORRECT ERRORS
When a student makes a mistake:
1. Acknowledge what they said / what they were going for
2. Show the correct form in **bold**
3. Give a one-line rule or pattern that explains why — tie it to something they already know if possible
4. Move on — don't dwell on it
Never say "wrong" or "incorrect." Say things like "Almost — the form here is..." or "Close! In Greek we'd say..."

## GRAMMAR YOU MUST TEACH WELL

**Verb Aspect (#1 priority for English speakers)**
Greek distinguishes perfective (completed) and imperfective (ongoing/repeated) — this has no direct English equivalent. Always explain it in concrete, real terms. Example: έγραφα = I was writing / I used to write (imperfective past); έγραψα = I wrote, I finished writing (perfective past). Bring this up naturally the moment verbs become relevant.

**Verb conjugation**
- Class A verbs (stress on penultimate): γράφω, πίνω, τρώω
- Class B verbs (stress on last syllable): αγαπώ, μιλώ, περνώ
- Irregular core verbs to know well: είμαι, έχω, λέω, πηγαίνω/πάω, βλέπω, ξέρω, θέλω
Always give the present tense when introducing a verb. Give aorist when teaching the past.

**Cases (4 cases, no dative in Modern Greek)**
- Nominative: subject
- Genitive: possession, after certain prepositions (για, από, μέχρι, χωρίς)
- Accusative: direct object, most prepositions (σε, με, σε+article)
- Vocative: direct address
Introduce cases in context — not as abstract lists. Show how the article and noun ending both change.

**Articles**
- Masculine: ο (nom) / του (gen) / τον (acc)
- Feminine: η (nom) / της (gen) / την (acc)
- Neuter: το (nom) / του (gen) / το (acc)
Plural: οι/τα → των → τους/τα

**Clitic pronouns (weak pronouns)**
These cause constant confusion: μου/σου/του/της/μας/σας/τους (genitive weak) vs με/σε/τον/την/το/μας/σας/τους (accusative weak). They come BEFORE the verb in most cases. Teach this with concrete examples: Το έχω. / Τον βλέπω. / Μου αρέσει.

**μου αρέσει structure**
This is a classic stumbling block. "I like" = μου αρέσει (lit. "it pleases me"). The subject is the thing liked, not the person. Αρέσει → singular thing; αρέσουν → plural things. Teach this early.

**Subjunctive / να constructions**
After να, ας, πριν να, για να → use the perfective subjunctive (same as aorist active, minus θα). Example: Θέλω να γράψω. (I want to write.) vs Θέλω να γράφω. (I want to be writing / keep writing.) — the distinction matters.

## CONVERSATION MODES — switch fluidly based on what the student asks
- **Free conversation**: Chat naturally in Greek at their level. Push them to produce Greek even if imperfect.
- **Grammar explanation**: Be precise and use 2-3 concrete examples. Show the pattern, then test them on it.
- **Scenario roleplay**: Fully inhabit the scene — ordering at a café, at the pharmacy, talking to a grandparent, navigating Athens. Stay in character, correct only critical errors mid-scene.
- **Verb drill**: Give a verb, cycle through tenses and persons, prompt the student to produce forms. Give immediate correction with the rule.
- **Vocabulary building**: Introduce words in word families and in sentence context — never isolated lists.
- **Idioms**: Teach the literal meaning first, then the real meaning, then model it in 2 example sentences.

## STYLE RULES
- Be warm but never performatively cheerful. Just answer.
- **Start every response with the actual content** — no preamble, no restatement of the question, no opener.
- Keep responses focused and appropriately sized. A grammar explanation might be 6-8 lines. A conversation reply might be 2-3 sentences in Greek followed by a question or prompt to keep them talking.
- Always end practice exchanges with something that invites the student to produce Greek — a question, a prompt, a challenge. Keep the momentum going.
- When you teach a pattern, give the rule + 2 examples max, then ask them to try it. Don't over-explain.
- Use formatting (bold for Greek forms, italics for English meanings, code blocks for conjugation tables when relevant) to make things easy to scan.`

export function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

export async function getVerbByEnglish(englishMeaning: string): Promise<{
  greek_text: string
  english_translation: string
  verb_class: string | null
  is_irregular: boolean
  aspect_note: string | null
  conjugations: ConjugationTable
} | null> {
  const client = getAnthropicClient()

  const prompt = `Find the most common Modern Greek verb that means "${englishMeaning}" and provide its full conjugation in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "greek_text": "",
  "english_translation": "",
  "verb_class": "Class A",
  "is_irregular": false,
  "aspect_note": "",
  "conjugations": {
    "present":             { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "imperfect":           { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "future_continuous":   { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "aorist":              { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "future":              { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "present_perfect":     { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "pluperfect":          { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "future_perfect":      { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "subjunctive_present": { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "subjunctive_aorist":  { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "conditional":         { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
    "imperative":          { "active": { "sg2": "", "pl2": "" } },
    "imperative_negative": { "active": { "sg2": "", "pl2": "" } }
  }
}

Rules:
- greek_text: the verb in 1st person present active (dictionary form, e.g. γράφω)
- verb_class: "Class A" (stress on penultimate) or "Class B" (stress on last syllable)
- aspect_note: brief note on perfective vs imperfective usage
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- Leave passive forms as empty strings if the verb has no passive
- future_continuous: θα + present form; future: θα + aorist subjunctive form
- present_perfect: έχω/έχεις/... + verbal adjective; pluperfect: είχα/...; future_perfect: θα έχω/...
- subjunctive_present: να + imperfective (present) stem; subjunctive_aorist: να + perfective (aorist) stem
- conditional: θα + imperfect forms (θα έγραφα, θα έγραφες, θα έγραφε, θα γράφαμε, θα γράφατε, θα έγραφαν)
- imperative_negative: include μην (e.g. μην γράψεις / μην γράψετε)`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

export async function getConjugationFromClaude(greekVerb: string): Promise<ConjugationTable | null> {
  const client = getAnthropicClient()

  const prompt = `Provide a complete Modern Greek conjugation table for the verb "${greekVerb}" in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "present":             { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "imperfect":           { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "future_continuous":   { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "aorist":              { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "future":              { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "present_perfect":     { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "pluperfect":          { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "future_perfect":      { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "subjunctive_present": { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "subjunctive_aorist":  { "active": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }, "passive": { "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" } },
  "imperative":          { "active": { "sg2": "", "pl2": "" } },
  "imperative_negative": { "active": { "sg2": "", "pl2": "" } }
}

Rules:
- Use proper Greek Unicode with correct accent marks (τόνοι)
- Leave passive forms as empty strings if the verb has no passive
- future_continuous: θα + present form; future: θα + aorist subjunctive form
- present_perfect: έχω/έχεις/... + verbal adjective; pluperfect: είχα/...; future_perfect: θα έχω/...
- subjunctive_present: να + imperfective (present) stem; subjunctive_aorist: να + perfective (aorist) stem
- conditional: θα + imperfect forms (θα έγραφα, θα έγραφες, θα έγραφε, θα γράφαμε, θα γράφατε, θα έγραφαν)
- imperative_negative: include μην (e.g. μην γράψεις / μην γράψετε)`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as ConjugationTable
  } catch {
    return null
  }
}

const ENRICHABLE_TENSES = [
  'present_perfect',
  'pluperfect',
  'future_perfect',
  'conditional',
  'imperative',
  'imperative_negative',
  'subjunctive_present',
  'subjunctive_aorist',
] as const

type EnrichableTense = typeof ENRICHABLE_TENSES[number]

const TENSE_DESCRIPTIONS: Record<EnrichableTense, string> = {
  present_perfect:     'Present Perfect (έχω + verbal adjective, e.g. έχω γράψει)',
  pluperfect:          'Pluperfect / Past Perfect (είχα + verbal adjective, e.g. είχα γράψει)',
  future_perfect:      'Future Perfect (θα έχω + verbal adjective, e.g. θα έχω γράψει)',
  conditional:         'Conditional (θα + imperfect stem, e.g. θα έγραφα = I would write)',
  imperative:          'Positive Imperative — sg2 and pl2 only (e.g. γράψε / γράψτε)',
  imperative_negative: 'Negative Imperative — sg2 and pl2 only, include μην (e.g. μην γράψεις / μην γράψετε)',
  subjunctive_present: 'Subjunctive Present — να + imperfective/present stem (e.g. να γράφω)',
  subjunctive_aorist:  'Subjunctive Aorist — να + perfective/aorist stem (e.g. να γράψω)',
}

function buildEnrichmentTemplate(keys: EnrichableTense[]): string {
  const personsFull = '{ "sg1": "", "sg2": "", "sg3": "", "pl1": "", "pl2": "", "pl3": "" }'
  const voiceFull   = `{ "active": ${personsFull}, "passive": ${personsFull} }`
  const imperative  = '{ "active": { "sg2": "", "pl2": "" } }'

  const entries = keys.map((k) => {
    const val = (k === 'imperative' || k === 'imperative_negative') ? imperative : voiceFull
    return `  "${k}": ${val}`
  })
  return `{\n${entries.join(',\n')}\n}`
}

export async function enrichMissingConjugations(
  greekVerb: string,
  missing: EnrichableTense[]
): Promise<Partial<ConjugationTable> | null> {
  if (missing.length === 0) return null
  const client = getAnthropicClient()

  const descriptions = missing.map((k) => `- ${k}: ${TENSE_DESCRIPTIONS[k]}`).join('\n')
  const template = buildEnrichmentTemplate(missing)

  const prompt = `Provide the following conjugation forms for the Modern Greek verb "${greekVerb}".

Tenses needed:
${descriptions}

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
${template}

Rules:
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- Leave passive forms as empty strings if the verb has no passive
- For future tense compound forms include the full form (θα έχω γράψει, etc.)
- For negative imperative include μην in the form (e.g. μην γράψεις)`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    const parsed = JSON.parse(cleaned) as Partial<ConjugationTable>

    // Normalize imperative entries: expand {sg2, pl2} to full PersonTable shape
    for (const k of ['imperative', 'imperative_negative'] as const) {
      const entry = parsed[k] as { active?: { sg2?: string; pl2?: string } } | undefined
      if (entry?.active) {
        parsed[k] = {
          active: { sg1: '', sg2: entry.active.sg2 ?? '', sg3: '', pl1: '', pl2: entry.active.pl2 ?? '', pl3: '' },
        }
      }
    }

    return parsed
  } catch {
    return null
  }
}

export { ENRICHABLE_TENSES }
export type { EnrichableTense }

export async function getNounByEnglish(englishMeaning: string): Promise<Omit<Noun, 'id' | 'created_at'> | null> {
  const client = getAnthropicClient()

  const prompt = `Find the most common Modern Greek noun that means "${englishMeaning}" and provide its full declension in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "greek_text": "",
  "english_translation": "${englishMeaning}",
  "gender": "masculine",
  "article": "ο",
  "declension_class": "",
  "is_irregular": false,
  "declensions": {
    "singular": { "nominative": "", "genitive": "", "accusative": "", "vocative": "" },
    "plural": { "nominative": "", "genitive": "", "accusative": "", "vocative": "" }
  },
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- greek_text: the noun in nominative singular form (e.g. σπίτι, φίλος)
- gender must be exactly "masculine", "feminine", or "neuter"
- article: "ο" for masculine, "η" for feminine, "το" for neuter
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- example_sentence: a natural Modern Greek sentence using the noun`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as Omit<Noun, 'id' | 'created_at'>
  } catch {
    return null
  }
}

export async function getNounFromClaude(greekNoun: string): Promise<Omit<Noun, 'id' | 'created_at'> | null> {
  const client = getAnthropicClient()

  const prompt = `Provide complete Modern Greek noun data for "${greekNoun}" in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "greek_text": "${greekNoun}",
  "english_translation": "",
  "gender": "masculine",
  "article": "ο",
  "declension_class": "",
  "is_irregular": false,
  "declensions": {
    "singular": { "nominative": "", "genitive": "", "accusative": "", "vocative": "" },
    "plural": { "nominative": "", "genitive": "", "accusative": "", "vocative": "" }
  },
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- gender must be exactly "masculine", "feminine", or "neuter"
- article must be "ο" for masculine, "η" for feminine, "το" for neuter
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- declension_class: describe the noun class briefly (e.g. "2nd declension -ος", "3rd declension -η")
- example_sentence: a natural Modern Greek sentence using the noun
- example_translation: English translation of the example sentence`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as Omit<Noun, 'id' | 'created_at'>
  } catch {
    return null
  }
}

export async function getAdjectiveByEnglish(englishMeaning: string): Promise<Omit<Adjective, 'id' | 'created_at'> | null> {
  const client = getAnthropicClient()

  const prompt = `Find the most common Modern Greek adjective that means "${englishMeaning}" and provide its full declension in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "masculine": "",
  "feminine": "",
  "neuter": "",
  "english_translation": "${englishMeaning}",
  "declension_class": "",
  "is_irregular": false,
  "forms": {
    "m_sg": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "m_pl": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "f_sg": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "f_pl": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "n_sg": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "n_pl": { "nom": "", "gen": "", "acc": "", "voc": "" }
  },
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- masculine/feminine/neuter: nominative singular forms (e.g. καλός / καλή / καλό)
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- example_sentence: a natural Modern Greek sentence using the adjective`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 768,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as Omit<Adjective, 'id' | 'created_at'>
  } catch {
    return null
  }
}

export async function getAdjectiveFromClaude(masculine: string): Promise<Omit<Adjective, 'id' | 'created_at'> | null> {
  const client = getAnthropicClient()

  const prompt = `Provide complete Modern Greek adjective data for "${masculine}" (masculine nominative singular) in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "masculine": "${masculine}",
  "feminine": "",
  "neuter": "",
  "english_translation": "",
  "declension_class": "",
  "is_irregular": false,
  "forms": {
    "m_sg": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "m_pl": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "f_sg": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "f_pl": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "n_sg": { "nom": "", "gen": "", "acc": "", "voc": "" },
    "n_pl": { "nom": "", "gen": "", "acc": "", "voc": "" }
  },
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- declension_class: describe briefly (e.g. "-ος/-η/-ο type", "-ύς/-ιά/-ύ type")
- example_sentence: a natural Modern Greek sentence using the adjective
- example_translation: English translation of the example sentence`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 768,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as Omit<Adjective, 'id' | 'created_at'>
  } catch {
    return null
  }
}

export async function getAdverbByEnglish(englishMeaning: string): Promise<Omit<Adverb, 'id' | 'created_at'> | null> {
  const client = getAnthropicClient()

  const prompt = `Find the most common Modern Greek adverb that means "${englishMeaning}" in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "greek_text": "",
  "english_translation": "${englishMeaning}",
  "category": "manner",
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- greek_text: the adverb in Greek (e.g. τώρα, εδώ, γρήγορα)
- category must be exactly one of: "place", "time", "manner", "degree", "affirmation"
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- example_sentence: a natural Modern Greek sentence using the adverb`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as Omit<Adverb, 'id' | 'created_at'>
  } catch {
    return null
  }
}

export async function getAdverbFromClaude(greekAdverb: string): Promise<Omit<Adverb, 'id' | 'created_at'> | null> {
  const client = getAnthropicClient()

  const prompt = `Provide Modern Greek adverb data for "${greekAdverb}" in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "greek_text": "${greekAdverb}",
  "english_translation": "",
  "category": "manner",
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- category must be exactly one of: "place", "time", "manner", "degree", "affirmation"
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- example_sentence: a natural Modern Greek sentence using the adverb
- example_translation: English translation of the example sentence`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned) as Omit<Adverb, 'id' | 'created_at'>
  } catch {
    return null
  }
}

export async function getWordDataFromClaude(word: string, type?: string): Promise<{
  word: string
  type: string
  english_translation: string
  pronunciation?: string
  notes?: string
  example_sentence?: string
  example_translation?: string
} | null> {
  const client = getAnthropicClient()

  const prompt = `Provide basic information about the Modern Greek word "${word}"${type && type !== 'any' ? ` (expected type: ${type})` : ''} in JSON format.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "word": "${word}",
  "type": "noun",
  "english_translation": "",
  "pronunciation": "",
  "notes": "",
  "example_sentence": "",
  "example_translation": ""
}

Rules:
- type must be one of: "noun", "verb", "adjective", "adverb", "particle", "conjunction", "preposition", "interjection", "other"
- pronunciation: phonetic romanization in Modern Greek pronunciation (e.g. "ka-li-ME-ra")
- notes: one brief usage note or grammar tip (optional, keep short)
- example_sentence: a natural Modern Greek sentence
- example_translation: English translation`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 384,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}
