export const metadata = {
  title: 'Greek Particles | Elliniká',
  description: 'Essential Greek particles — να, θα, ας, μην, δεν, and more',
}

interface Particle {
  greek: string
  english: string
  role: string
  detail: string
  example: { greek: string; english: string }
}

const PARTICLES: Particle[] = [
  {
    greek: 'να',
    english: 'subjunctive marker',
    role: 'Most important Greek particle',
    detail: 'Placed before a verb to create the subjunctive mood. Used after verbs of wanting, ability, obligation, permission, and with conjunctions like πριν/για/ώσπου. With perfective stem for one-time actions, imperfective for ongoing.',
    example: { greek: 'Θέλω να φάω. / Πρέπει να πας. / Μπορώ να σε βοηθήσω;', english: 'I want to eat. / You must go. / Can I help you?' },
  },
  {
    greek: 'θα',
    english: 'future / conditional marker',
    role: 'Forms future tenses and conditionals',
    detail: 'θα + imperfective present → future continuous ("will be doing"). θα + perfective subjunctive → simple future ("will do"). θα + past tense → conditional ("would").',
    example: { greek: 'Θα γράφω (ongoing). / Θα γράψω (once). / Θα έγραφα αν μπορούσα.', english: 'I will be writing. / I will write. / I would write if I could.' },
  },
  {
    greek: 'ας',
    english: 'let\'s / let (suggestion or wish)',
    role: 'Forms the imperative for 1st/3rd person',
    detail: 'ας + verb expresses a suggestion ("let\'s…"), permission, or a wish/command for a third person. Very common in everyday speech.',
    example: { greek: 'Ας πάμε! / Ας έρθει κι αυτός. / Ας είναι!', english: 'Let\'s go! / Let him come too. / So be it!' },
  },
  {
    greek: 'δεν',
    english: 'not (indicative negation)',
    role: 'Negates indicative verb forms',
    detail: 'Placed immediately before the verb (or before a weak pronoun that precedes the verb). Becomes δε before consonant clusters for euphony, but δεν is safe to use everywhere.',
    example: { greek: 'Δεν ξέρω. / Δεν το βλέπω. / Δε μιλώ γερμανικά.', english: 'I don\'t know. / I don\'t see it. / I don\'t speak German.' },
  },
  {
    greek: 'μην / μη',
    english: 'not (subjunctive / imperative negation)',
    role: 'Negates subjunctive and imperative forms',
    detail: 'Used where να or ας would appear — in subjunctive and imperative constructions. Never use δεν with να; always use μην.',
    example: { greek: 'Μην πας! / Θέλω να μην αργήσεις. / Μη μιλάς!', english: 'Don\'t go! / I want you not to be late. / Don\'t talk!' },
  },
  {
    greek: 'ναι',
    english: 'yes',
    role: 'Affirmative particle',
    detail: 'Standard affirmative response. Can be intensified: ναι, ναι ("yes, yes"), ναίναι (emphatic), or μάλιστα (formal yes).',
    example: { greek: 'Ναι, ευχαριστώ. / Μάλιστα, κύριε.', english: 'Yes, thank you. / Certainly, sir.' },
  },
  {
    greek: 'όχι',
    english: 'no',
    role: 'Negative response particle',
    detail: 'Standard negative response. Distinct from δεν/μην (which negate verbs). Can stand alone or precede a phrase.',
    example: { greek: 'Όχι, δεν θέλω. / Όχι αυτό — εκείνο.', english: 'No, I don\'t want it. / Not this one — that one.' },
  },
  {
    greek: 'μάλιστα',
    english: 'yes indeed / certainly / of course',
    role: 'Formal affirmative; also means "exactly, precisely"',
    detail: 'More emphatic or formal than ναι. Also used to mean "in fact" or "what\'s more" as a discourse marker.',
    example: { greek: 'Μάλιστα, αμέσως. / Και μάλιστα πολύ καλά.', english: 'Certainly, right away. / And indeed very well.' },
  },
  {
    greek: 'μόνο / μόνο που',
    english: 'only / only that',
    role: 'Restrictive particle',
    detail: 'Limits or restricts. μόνο is invariable. μόνο που introduces a minor exception or qualification.',
    example: { greek: 'Μόνο αυτό. / Πήγαμε, μόνο που ήταν κλειστά.', english: 'Only this. / We went, only it was closed.' },
  },
  {
    greek: 'ακόμα / ακόμη',
    english: 'still, yet, even',
    role: 'Temporal or scalar particle',
    detail: 'Still (ongoing), not yet (with negation), or "even" (scalar). Both forms are equally correct.',
    example: { greek: 'Ακόμα κοιμάται. / Δεν ήρθε ακόμα. / Ακόμα και εσύ το ξέρεις.', english: 'He\'s still sleeping. / He hasn\'t come yet. / Even you know it.' },
  },
  {
    greek: 'πια / πλέον',
    english: 'anymore, now (change of state)',
    role: 'Marks a change from a previous situation',
    detail: 'Indicates that something is different from before. With negation: "no longer". Without negation: "now, at this point". πλέον is more formal.',
    example: { greek: 'Δεν πίνω πια καφέ. / Τώρα πια καταλαβαίνω.', english: 'I no longer drink coffee. / Now I finally understand.' },
  },
  {
    greek: 'κιόλας / μάλιστα',
    english: 'already, even',
    role: 'Emphasizes earliness or unexpectedness',
    detail: 'κιόλας adds surprise or emphasis ("already", "even so"). Very colloquial.',
    example: { greek: 'Έφτασε κιόλας; / Και κιόλας!', english: 'He\'s arrived already? / And then some!' },
  },
]

export default function ParticlesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Particles
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Μόρια — Small words with big grammatical roles
        </p>
      </div>

      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
      >
        Greek particles are short, invariable words that perform crucial grammatical functions. The most important are{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>να</span> (subjunctive) and{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>θα</span> (future/conditional) — mastering these unlocks most of the tense system.
      </div>

      <div className="flex flex-col gap-4">
        {PARTICLES.map((p) => (
          <div key={p.greek} className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <span className="greek-text text-3xl font-bold" style={{ color: '#0D5EAF' }}>{p.greek}</span>
              <span className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>{p.english}</span>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
              >
                {p.role}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>{p.detail}</p>
            <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
              <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{p.example.greek}</p>
              <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{p.example.english}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
