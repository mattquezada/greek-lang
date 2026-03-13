export const metadata = {
  title: 'Greek Grammar | Elliniká',
  description: 'Essential tips for speaking and understanding Modern Greek',
}

interface Section {
  title: string
  subtitle: string
  tips: { heading: string; body: string; example?: { greek: string; english: string } }[]
}

const SECTIONS: Section[] = [
  {
    title: 'Verb Aspects',
    subtitle: 'The most important concept in Greek verbs',
    tips: [
      {
        heading: 'Every verb has two stems',
        body: 'Modern Greek verbs have an imperfective stem (ongoing/repeated action) and a perfective stem (completed action). You must learn both forms.',
        example: { greek: 'γράφω → γράψω', english: 'I write (ongoing) → I write (once, completed)' },
      },
      {
        heading: 'Imperfective = ongoing or habitual',
        body: 'Use imperfective tenses (present, imperfect, future continuous) when an action is in progress, repeated, or habitual.',
        example: { greek: 'Κάθε μέρα γράφω γράμματα.', english: 'Every day I write letters. (habitual)' },
      },
      {
        heading: 'Perfective = single completed event',
        body: 'Use perfective tenses (aorist/simple past, future simple) when describing a one-time completed or bounded event.',
        example: { greek: 'Έγραψα ένα γράμμα χθες.', english: 'I wrote a letter yesterday. (one event)' },
      },
      {
        heading: 'Future depends on aspect',
        body: 'There are two futures: θα + imperfective present (ongoing) and θα + perfective subjunctive (simple). The difference matters!',
        example: { greek: 'Θα γράφω vs. Θα γράψω', english: 'I will be writing (ongoing) vs. I will write (once)' },
      },
    ],
  },
  {
    title: 'Articles & Gender',
    subtitle: 'Greek has three genders — every noun has one',
    tips: [
      {
        heading: 'Three definite articles',
        body: 'ο (masculine), η (feminine), το (neuter). The article changes by gender, number, and case — always learn a noun with its article.',
        example: { greek: 'ο άντρας, η γυναίκα, το παιδί', english: 'the man, the woman, the child' },
      },
      {
        heading: 'Indefinite articles',
        body: 'ένας (masc.), μια/μία (fem.), ένα (neut.) — these are also the number "one".',
        example: { greek: 'ένας φίλος, μια φίλη, ένα βιβλίο', english: 'a friend (m), a friend (f), a book' },
      },
      {
        heading: 'Article agrees with noun always',
        body: 'When a noun changes case, the article changes with it. You cannot use the wrong gender article — it changes the meaning.',
        example: { greek: 'ο φίλος → τον φίλο (acc.)', english: 'the friend (subj.) → the friend (obj.)' },
      },
    ],
  },
  {
    title: 'The Four Cases',
    subtitle: 'How nouns, adjectives, and articles change',
    tips: [
      {
        heading: 'Nominative — the subject',
        body: 'Used for the subject of the sentence — who is doing the action.',
        example: { greek: 'Ο φίλος μου μένει εδώ.', english: 'My friend lives here.' },
      },
      {
        heading: 'Genitive — possession and of',
        body: 'Expresses possession, relationship, or the word "of". In Greek, the genitive follows the noun it modifies.',
        example: { greek: 'Το σπίτι του φίλου μου.', english: "My friend's house / The house of my friend." },
      },
      {
        heading: 'Accusative — the object',
        body: 'Used for the direct object and after many prepositions (σε, από, με, για, ως).',
        example: { greek: 'Βλέπω τον φίλο μου.', english: 'I see my friend.' },
      },
      {
        heading: 'Vocative — direct address',
        body: 'Used when calling out or addressing someone directly. Often the same as nominative for plurals.',
        example: { greek: 'Φίλε, πώς είσαι;', english: 'Friend, how are you?' },
      },
    ],
  },
  {
    title: 'Stress & Pronunciation',
    subtitle: 'Greek is phonetic — stress is marked by the accent',
    tips: [
      {
        heading: 'Every word has one accent mark (τόνος)',
        body: 'In Modern Greek, every multi-syllable word has exactly one accent mark (´). This tells you where to stress the word. No accent = first syllable.',
        example: { greek: 'άνθρωπος → ÁN-thro-pos', english: 'human being' },
      },
      {
        heading: 'Stress can change meaning',
        body: 'The same word with stress on different syllables can mean different things. Pay attention to accents!',
        example: { greek: 'η γυναίκα vs. ήγαινε', english: 'the woman vs. he/she was going' },
      },
      {
        heading: 'Greek letters map directly to sounds',
        body: 'Unlike English, Greek spelling is phonetic. Once you learn the alphabet, you can pronounce any word.',
      },
      {
        heading: 'Double vowels to watch',
        body: 'αι = e, ει/οι/υι = i, ου = oo, αυ = av/af, ευ = ev/ef. The υ sound (as in αύριο) changes based on what follows.',
        example: { greek: 'αύριο = áv-rio, αύτος = áf-tos (before voiceless consonant)', english: 'tomorrow, this (m)' },
      },
    ],
  },
  {
    title: 'Word Order',
    subtitle: 'Greek is flexible — but not without rules',
    tips: [
      {
        heading: 'Subject-Verb-Object is the neutral order',
        body: 'SVO is the default, but Greek allows almost any order for emphasis. The most important or new information tends to come last.',
        example: { greek: 'Ο Γιάννης αγαπά τη Μαρία.', english: 'John loves Mary.' },
      },
      {
        heading: 'Object pronouns come before the verb',
        body: 'Weak (clitic) pronouns like με, σε, τον, την, το come before the verb in most cases.',
        example: { greek: 'Σε αγαπώ. / Τον βλέπω.', english: 'I love you. / I see him.' },
      },
      {
        heading: 'Adjectives usually follow the noun',
        body: 'Unlike English, Greek adjectives typically come after the noun they modify (though they can also precede for emphasis).',
        example: { greek: 'ένα σπίτι μεγάλο (common) / ένα μεγάλο σπίτι (emphatic)', english: 'a big house' },
      },
    ],
  },
  {
    title: 'Personal Pronouns',
    subtitle: 'Strong and weak forms',
    tips: [
      {
        heading: 'Subject pronouns are often dropped',
        body: 'Greek verbs are fully conjugated, so the subject pronoun (εγώ, εσύ…) is optional. Use it only for emphasis or contrast.',
        example: { greek: 'Μιλώ ελληνικά. (not: Εγώ μιλώ)', english: 'I speak Greek.' },
      },
      {
        heading: 'Weak object pronouns',
        body: 'με (me), σε (you), τον/την/το (him/her/it), μας (us), σας (you pl.), τους/τες/τα (them) — these attach before the verb.',
        example: { greek: 'Με βλέπεις; Ναι, σε βλέπω.', english: 'Do you see me? Yes, I see you.' },
      },
    ],
  },
  {
    title: 'Common Patterns & Tips',
    subtitle: 'Practical shortcuts for learners',
    tips: [
      {
        heading: 'Learn verbs in both aspects from the start',
        body: 'When you learn a new verb, always learn the perfective stem too. E.g. πηγαίνω/πάω (imperfective) → πάω (perfective past: πήγα).',
      },
      {
        heading: 'Greek "να" is like a subjunctive marker',
        body: 'Να + verb (using perfective stem for one-time actions) expresses wishes, intentions, purpose. It\'s very common.',
        example: { greek: 'Θέλω να φάω. / Πρέπει να πας.', english: 'I want to eat. / You must go.' },
      },
      {
        heading: 'Diminutives are everywhere',
        body: 'Greeks use diminutives (-άκι, -ούλα, -ίτσα) constantly — not just to mean small, but also to soften or show affection.',
        example: { greek: 'καφές → καφεδάκι, σπίτι → σπιτάκι', english: 'coffee → (little) coffee, house → little house' },
      },
      {
        heading: '"Μαλάκα" and register',
        body: 'Greek has a wide range of register. What\'s acceptable between friends may be very rude in formal contexts. Build vocabulary across registers.',
      },
      {
        heading: 'Read Greek every day',
        body: 'Even reading menus, signs, and social media in Greek accelerates pattern recognition. The more input, the faster you\'ll improve.',
      },
    ],
  },
]

export default function GrammarPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Grammar
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Γραμματική — Essential tips for speaking Modern Greek
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border p-6"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
              {section.title}
            </h2>
            <p className="mb-5 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {section.subtitle}
            </p>

            <div className="flex flex-col gap-4">
              {section.tips.map((tip) => (
                <div
                  key={tip.heading}
                  className="rounded-xl border p-4"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                >
                  <h3 className="mb-1 font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                    {tip.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {tip.body}
                  </p>
                  {tip.example && (
                    <div
                      className="mt-3 rounded-lg border-l-4 pl-3 py-1"
                      style={{ borderColor: '#0D5EAF' }}
                    >
                      <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>
                        {tip.example.greek}
                      </p>
                      <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                        {tip.example.english}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
