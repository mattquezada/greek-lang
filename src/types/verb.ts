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
  present: VoiceTable               // imperfective present
  imperfect?: VoiceTable            // imperfective past
  future_continuous?: VoiceTable    // imperfective future (θα + present)
  aorist?: VoiceTable               // perfective past
  future?: VoiceTable               // perfective future (θα + aorist stem)
  present_perfect?: VoiceTable      // έχω + verbal adjective
  pluperfect?: VoiceTable           // είχα + verbal adjective
  future_perfect?: VoiceTable       // θα έχω + verbal adjective
  imperative?: VoiceTable           // positive imperative (sg2, pl2)
  imperative_negative?: VoiceTable  // negative imperative μην + subj. (sg2, pl2)
  conditional?: VoiceTable          // θα + imperfect stem (I would write)
  subjunctive_present?: VoiceTable  // να + present stem (imperfective)
  subjunctive_aorist?: VoiceTable   // να + aorist stem (perfective)
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
