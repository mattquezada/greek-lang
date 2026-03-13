export interface CaseTable {
  nominative: string
  genitive: string
  accusative: string
  vocative: string
}

export interface DeclensionTable {
  singular: CaseTable
  plural: CaseTable
}

export interface Noun {
  id: number
  greek_text: string
  english_translation: string
  gender: 'masculine' | 'feminine' | 'neuter'
  article: string
  declension_class: string | null
  is_irregular: boolean
  declensions: DeclensionTable
  example_sentence: string | null
  example_translation: string | null
  created_at: string
}
