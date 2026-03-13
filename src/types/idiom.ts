export interface Idiom {
  id: number
  greek_text: string
  pronunciation: string
  literal_translation: string
  real_meaning: string
  example_sentence: string | null
  category: string
  created_at: string
}

export const IDIOM_CATEGORIES = [
  'all',
  'emotions',
  'social',
  'food',
  'body',
  'time',
  'weather',
  'money',
  'work',
  'family',
  'general',
] as const

export type IdiomCategory = typeof IDIOM_CATEGORIES[number]
