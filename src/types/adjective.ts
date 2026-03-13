export interface CaseForm {
  nom: string
  gen: string
  acc: string
  voc: string
}

export interface AdjectiveForms {
  m_sg: CaseForm
  m_pl: CaseForm
  f_sg: CaseForm
  f_pl: CaseForm
  n_sg: CaseForm
  n_pl: CaseForm
}

export interface Adjective {
  id: number
  masculine: string
  feminine: string
  neuter: string
  english_translation: string
  declension_class: string | null
  is_irregular: boolean
  forms: AdjectiveForms
  example_sentence: string | null
  example_translation: string | null
  created_at: string
}
