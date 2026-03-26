import type { ConjugationTable, PersonTable } from '@/types/verb'
import type { Noun, DeclensionTable } from '@/types/noun'

const WIKTIONARY_API = 'https://en.wiktionary.org/w/api.php'

export async function fetchWiktionaryConjugation(greekVerb: string): Promise<ConjugationTable | null> {
  try {
    const params = new URLSearchParams({
      action: 'parse',
      page: greekVerb,
      prop: 'wikitext',
      format: 'json',
      origin: '*',
    })

    const res = await fetch(`${WIKTIONARY_API}?${params}`, {
      headers: { 'User-Agent': 'EllinikApp/1.0 (language learning app)' },
      next: { revalidate: 86400 },
    })

    if (!res.ok) return null
    const data = await res.json()
    if (data.error) return null

    const wikitext: string = data.parse?.wikitext?.['*'] ?? ''
    return parseWikitextConjugation(wikitext)
  } catch {
    return null
  }
}

function parseWikitextConjugation(wikitext: string): ConjugationTable | null {
  // Look for Greek verb conjugation templates
  if (!wikitext.includes('el-conj') && !wikitext.includes('el-verb')) {
    return null
  }

  // Extract present active forms using regex patterns for common wikitext formats
  const presentActive = extractPersonTable(wikitext, 'pres', 'act')
  if (!presentActive) return null

  const table: ConjugationTable = {
    present: { active: presentActive },
  }

  const presentPassive = extractPersonTable(wikitext, 'pres', 'pass')
  if (presentPassive) table.present.passive = presentPassive

  const imperfectActive = extractPersonTable(wikitext, 'imperf', 'act')
  if (imperfectActive) table.imperfect = { active: imperfectActive }

  const aoristActive = extractPersonTable(wikitext, 'aor', 'act')
  if (aoristActive) table.aorist = { active: aoristActive }

  const futureActive = extractPersonTable(wikitext, 'fut', 'act')
  if (futureActive) table.future = { active: futureActive }

  return table
}

function extractPersonTable(wikitext: string, tense: string, voice: string): PersonTable | null {
  // Common wikitext patterns for Greek conjugation tables
  const patterns = [
    new RegExp(`\\|${tense}_${voice}_1sg\\s*=\\s*([^|\\n}]+)`),
    new RegExp(`\\|${tense}${voice}1sg\\s*=\\s*([^|\\n}]+)`),
  ]

  for (const pattern of patterns) {
    const match = wikitext.match(pattern)
    if (match) {
      // Try to extract all 6 forms
      const sg1 = extractForm(wikitext, `${tense}_${voice}_1sg`) || extractForm(wikitext, `${tense}${voice}1sg`)
      const sg2 = extractForm(wikitext, `${tense}_${voice}_2sg`) || extractForm(wikitext, `${tense}${voice}2sg`)
      const sg3 = extractForm(wikitext, `${tense}_${voice}_3sg`) || extractForm(wikitext, `${tense}${voice}3sg`)
      const pl1 = extractForm(wikitext, `${tense}_${voice}_1pl`) || extractForm(wikitext, `${tense}${voice}1pl`)
      const pl2 = extractForm(wikitext, `${tense}_${voice}_2pl`) || extractForm(wikitext, `${tense}${voice}2pl`)
      const pl3 = extractForm(wikitext, `${tense}_${voice}_3pl`) || extractForm(wikitext, `${tense}${voice}3pl`)

      if (sg1 && sg2 && sg3 && pl1 && pl2 && pl3) {
        return { sg1, sg2, sg3, pl1, pl2, pl3 }
      }
    }
  }

  return null
}

function extractForm(wikitext: string, key: string): string | null {
  const match = wikitext.match(new RegExp(`\\|${key}\\s*=\\s*([^|\\n}]+)`))
  return match ? match[1].trim().replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1') : null
}

export async function fetchWiktionaryNoun(greekNoun: string): Promise<Partial<Noun> | null> {
  try {
    const params = new URLSearchParams({
      action: 'parse',
      page: greekNoun,
      prop: 'wikitext',
      format: 'json',
      origin: '*',
    })

    const res = await fetch(`${WIKTIONARY_API}?${params}`, {
      headers: { 'User-Agent': 'EllinikApp/1.0 (language learning app)' },
      next: { revalidate: 86400 },
    })

    if (!res.ok) return null
    const data = await res.json()
    if (data.error) return null

    const wikitext: string = data.parse?.wikitext?.['*'] ?? ''
    return parseWikitextNoun(wikitext, greekNoun)
  } catch {
    return null
  }
}

function parseWikitextNoun(wikitext: string, word: string): Partial<Noun> | null {
  if (!wikitext.includes('el-noun') && !wikitext.includes('el-decl')) {
    return null
  }

  // Extract gender from el-noun template: {{el-noun|m|...}} or |g=m
  let gender: 'masculine' | 'feminine' | 'neuter' | null = null
  const genderExplicit = wikitext.match(/\|g\s*=\s*([mfn])/)
  if (genderExplicit) {
    const g = genderExplicit[1]
    gender = g === 'm' ? 'masculine' : g === 'f' ? 'feminine' : 'neuter'
  } else {
    // Try positional: {{el-noun|m|...}}
    const positional = wikitext.match(/\{\{el-noun\|([mfn])[|}]/)
    if (positional) {
      const g = positional[1]
      gender = g === 'm' ? 'masculine' : g === 'f' ? 'feminine' : 'neuter'
    }
  }

  const article = gender === 'masculine' ? 'ο' : gender === 'feminine' ? 'η' : gender === 'neuter' ? 'το' : ''

  // Extract the 8 case forms
  const nomSg = extractNounForm(wikitext, 'nom_sg') || extractNounForm(wikitext, 'nomsg') || word
  const genSg = extractNounForm(wikitext, 'gen_sg') || extractNounForm(wikitext, 'gensg')
  const accSg = extractNounForm(wikitext, 'acc_sg') || extractNounForm(wikitext, 'accsg')
  const vocSg = extractNounForm(wikitext, 'voc_sg') || extractNounForm(wikitext, 'vocsg')
  const nomPl = extractNounForm(wikitext, 'nom_pl') || extractNounForm(wikitext, 'nompl')
  const genPl = extractNounForm(wikitext, 'gen_pl') || extractNounForm(wikitext, 'genpl')
  const accPl = extractNounForm(wikitext, 'acc_pl') || extractNounForm(wikitext, 'accpl')
  const vocPl = extractNounForm(wikitext, 'voc_pl') || extractNounForm(wikitext, 'vocpl')

  // Count how many case forms we got (excluding nominative sg which defaults to the word)
  const formCount = [genSg, accSg, vocSg, nomPl, genPl, accPl, vocPl].filter(Boolean).length
  if (formCount < 3) return null

  const declensions: DeclensionTable = {
    singular: {
      nominative: nomSg || word,
      genitive: genSg || '',
      accusative: accSg || '',
      vocative: vocSg || '',
    },
    plural: {
      nominative: nomPl || '',
      genitive: genPl || '',
      accusative: accPl || '',
      vocative: vocPl || '',
    },
  }

  return {
    greek_text: word,
    english_translation: '',
    gender: gender ?? 'masculine',
    article,
    is_irregular: false,
    declensions,
  }
}

function extractNounForm(wikitext: string, key: string): string | null {
  const match = wikitext.match(new RegExp(`\\|${key}\\s*=\\s*([^|\\n}]+)`))
  return match ? match[1].trim().replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1').replace(/<[^>]+>/g, '').trim() : null
}
