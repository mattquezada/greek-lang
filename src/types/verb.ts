export type PersonTable = {
  sg1: string
  sg2: string
  sg3: string
  pl1: string
  pl2: string
  pl3: string
}

export interface VoiceTable {
  active: PersonTable
  passive?: PersonTable
}

export interface ConjugationTable {
  present: VoiceTable            // imperfective present
  imperfect?: VoiceTable         // imperfective past
  future_continuous?: VoiceTable // imperfective future (θα + present)
  aorist?: VoiceTable            // perfective past
  future?: VoiceTable            // perfective future (θα + aorist stem)
  perfect?: VoiceTable
  imperative?: VoiceTable
  participle?: { active?: string; passive?: string }
  infinitive?: string
}

export interface Verb {
  id: string
  greek_text: string
  english_translation: string
  verb_class: string | null
  is_irregular: boolean
  aspect_note: string | null
  conjugations: ConjugationTable
  example_sentence: string | null
  example_translation: string | null
  created_at: string
  updated_at: string
}
