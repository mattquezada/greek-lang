export const metadata = {
  title: 'Greek Conjunctions | Elliniká',
  description: 'Coordinating and subordinating conjunctions in Modern Greek',
}

interface Conj {
  greek: string
  english: string
  usage: string
  example: { greek: string; english: string }
}

const COORDINATING: Conj[] = [
  { greek: 'και', english: 'and', usage: 'Connects words, phrases, or clauses of equal value', example: { greek: 'Θέλω καφέ και νερό.', english: 'I want coffee and water.' } },
  { greek: 'κι', english: 'and (before vowel)', usage: 'Shorter form of "και" used before vowels for euphony', example: { greek: 'εγώ κι εσύ', english: 'you and I' } },
  { greek: 'ή', english: 'or', usage: 'Presents alternatives', example: { greek: 'Θέλεις καφέ ή τσάι;', english: 'Do you want coffee or tea?' } },
  { greek: 'αλλά', english: 'but', usage: 'Strong contrast or contradiction', example: { greek: 'Θέλω να έρθω, αλλά δεν μπορώ.', english: 'I want to come, but I can\'t.' } },
  { greek: 'όμως', english: 'however, but', usage: 'Milder contrast; often placed after the subject or verb', example: { greek: 'Είναι ακριβό· όμως αξίζει.', english: 'It\'s expensive; however, it\'s worth it.' } },
  { greek: 'ωστόσο', english: 'nevertheless, however', usage: 'Formal contrast; despite what was said', example: { greek: 'Ωστόσο, δεν έχουμε επιλογή.', english: 'Nevertheless, we have no choice.' } },
  { greek: 'ούτε … ούτε', english: 'neither … nor', usage: 'Connects two negative alternatives', example: { greek: 'Δεν έφαγε ούτε έπιε.', english: 'He neither ate nor drank.' } },
  { greek: 'είτε … είτε', english: 'whether … or, either … or', usage: 'Presents two alternatives with indifference to outcome', example: { greek: 'Είτε έρθεις είτε όχι, πάμε.', english: 'Whether you come or not, we\'re going.' } },
  { greek: 'μα', english: 'but (emphatic)', usage: 'Colloquial emphatic contradiction or exclamation', example: { greek: 'Μα τι λες;', english: 'But what are you saying?' } },
  { greek: 'γιατί', english: 'because (coordinating)', usage: 'When used after a comma, gives the reason for the preceding clause (like "for" in formal English)', example: { greek: 'Πήγα σπίτι, γιατί ήμουν κουρασμένος.', english: 'I went home, for I was tired.' } },
]

const SUBORDINATING: Conj[] = [
  { greek: 'ότι / πως', english: 'that (content clause)', usage: 'Introduces indirect speech or thought. ότι is more neutral; πως is slightly more colloquial.', example: { greek: 'Ξέρω ότι έχεις δίκιο. / Νομίζω πως βρέχει.', english: 'I know that you\'re right. / I think it\'s raining.' } },
  { greek: 'γιατί / επειδή / διότι', english: 'because', usage: 'γιατί is most common; επειδή emphasises cause; διότι is formal/written', example: { greek: 'Δεν ήρθα επειδή ήμουν άρρωστος.', english: 'I didn\'t come because I was sick.' } },
  { greek: 'αν / εάν', english: 'if', usage: 'Used for conditionals. αν is everyday speech; εάν is more formal.', example: { greek: 'Αν έρθεις, θα χαρώ.', english: 'If you come, I\'ll be happy.' } },
  { greek: 'όταν', english: 'when', usage: 'Refers to a point or repeated time in the future or past', example: { greek: 'Όταν έρθεις, τηλεφώνησέ μου.', english: 'When you come, call me.' } },
  { greek: 'ενώ', english: 'while, whereas', usage: 'Simultaneous action (while) or contrast (whereas)', example: { greek: 'Διάβαζα ενώ έτρωγα.', english: 'I was reading while eating.' } },
  { greek: 'πριν (+ να)', english: 'before', usage: 'Followed by να + subjunctive verb', example: { greek: 'Πριν να φύγεις, πες μου.', english: 'Before you leave, tell me.' } },
  { greek: 'μετά που / αφού', english: 'after', usage: 'Follows a completed action. αφού can also mean "since/given that".', example: { greek: 'Αφού φάγαμε, βγήκαμε βόλτα.', english: 'After we ate, we went for a walk.' } },
  { greek: 'για να', english: 'in order to, so that', usage: 'Expresses purpose; followed by subjunctive (perfective) verb', example: { greek: 'Διαβάζω για να μάθω.', english: 'I study in order to learn.' } },
  { greek: 'μόλις', english: 'as soon as, just as', usage: 'Marks the moment an action happens', example: { greek: 'Μόλις έφτασα, το είπα.', english: 'As soon as I arrived, I said it.' } },
  { greek: 'ώσπου / ώσότου', english: 'until', usage: 'Action continues up to the point of the other action', example: { greek: 'Περίμενα ώσπου να έρθεις.', english: 'I waited until you came.' } },
  { greek: 'αν και / μολονότι', english: 'although, even though', usage: 'Concessive — introduces a fact that doesn\'t prevent the main clause', example: { greek: 'Αν και βρέχει, θα πάμε.', english: 'Although it\'s raining, we\'ll go.' } },
  { greek: 'καθώς', english: 'as, while, as far as', usage: 'Simultaneous or explanatory; slightly more literary than ενώ', example: { greek: 'Καθώς μεγαλώνουμε, αλλάζουμε.', english: 'As we grow older, we change.' } },
]

export default function ConjunctionsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Conjunctions
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Σύνδεσμοι — Coordinating and subordinating conjunctions
        </p>
      </div>

      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
      >
        <strong style={{ color: 'var(--foreground)' }}>Coordinating</strong> conjunctions join equal elements (words, phrases, clauses).{' '}
        <strong style={{ color: 'var(--foreground)' }}>Subordinating</strong> conjunctions introduce a dependent clause and often require the verb in the subjunctive mood (with <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>να</span>).
      </div>

      <div className="flex flex-col gap-8">

        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Coordinating Conjunctions</h2>
          <p className="mb-5 text-sm" style={{ color: 'var(--muted-foreground)' }}>Connect words or clauses of equal grammatical rank</p>
          <div className="flex flex-col gap-3">
            {COORDINATING.map((c) => (
              <div key={c.greek} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="greek-text text-xl font-bold" style={{ color: '#0D5EAF' }}>{c.greek}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{c.english}</span>
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--muted-foreground)' }}>{c.usage}</p>
                <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                  <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{c.example.greek}</p>
                  <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{c.example.english}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Subordinating Conjunctions</h2>
          <p className="mb-5 text-sm" style={{ color: 'var(--muted-foreground)' }}>Introduce dependent clauses; some require να + verb</p>
          <div className="flex flex-col gap-3">
            {SUBORDINATING.map((c) => (
              <div key={c.greek} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="greek-text text-xl font-bold" style={{ color: '#0D5EAF' }}>{c.greek}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{c.english}</span>
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--muted-foreground)' }}>{c.usage}</p>
                <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                  <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{c.example.greek}</p>
                  <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{c.example.english}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
