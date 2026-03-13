export const metadata = {
  title: 'Greek Pronouns | Elliniká',
  description: 'Complete guide to Modern Greek pronouns — personal, demonstrative, possessive, relative, and interrogative',
}

// ─── Personal Pronouns ───────────────────────────────────────────────────────

const PERSONAL_STRONG = [
  { person: '1st sg', nom: 'εγώ', gen: 'εμένα / μου', acc: 'εμένα / με', english: 'I / me' },
  { person: '2nd sg', nom: 'εσύ', gen: 'εσένα / σου', acc: 'εσένα / σε', english: 'you (sg)' },
  { person: '3rd sg m', nom: 'αυτός', gen: 'αυτού / του', acc: 'αυτόν / τον', english: 'he / him' },
  { person: '3rd sg f', nom: 'αυτή', gen: 'αυτής / της', acc: 'αυτήν / την', english: 'she / her' },
  { person: '3rd sg n', nom: 'αυτό', gen: 'αυτού / του', acc: 'αυτό / το', english: 'it' },
  { person: '1st pl', nom: 'εμείς', gen: 'εμάς / μας', acc: 'εμάς / μας', english: 'we / us' },
  { person: '2nd pl', nom: 'εσείς', gen: 'εσάς / σας', acc: 'εσάς / σας', english: 'you (pl/formal)' },
  { person: '3rd pl m', nom: 'αυτοί', gen: 'αυτών / τους', acc: 'αυτούς / τους', english: 'they (m) / them' },
  { person: '3rd pl f', nom: 'αυτές', gen: 'αυτών / τους', acc: 'αυτές / τις', english: 'they (f) / them' },
  { person: '3rd pl n', nom: 'αυτά', gen: 'αυτών / τους', acc: 'αυτά / τα', english: 'they (n) / them' },
]

// ─── Demonstrative Pronouns ───────────────────────────────────────────────────

const DEMONSTRATIVE = [
  {
    label: 'αυτός / αυτή / αυτό',
    meaning: 'this (near) — this one here',
    forms: [
      { case: 'Nominative', m: 'αυτός', f: 'αυτή', n: 'αυτό', m_pl: 'αυτοί', f_pl: 'αυτές', n_pl: 'αυτά' },
      { case: 'Genitive', m: 'αυτού', f: 'αυτής', n: 'αυτού', m_pl: 'αυτών', f_pl: 'αυτών', n_pl: 'αυτών' },
      { case: 'Accusative', m: 'αυτόν', f: 'αυτήν', n: 'αυτό', m_pl: 'αυτούς', f_pl: 'αυτές', n_pl: 'αυτά' },
    ],
    example: { greek: 'Αυτός είναι ο φίλος μου.', english: 'This is my friend.' },
  },
  {
    label: 'εκείνος / εκείνη / εκείνο',
    meaning: 'that (far) — that one over there',
    forms: [
      { case: 'Nominative', m: 'εκείνος', f: 'εκείνη', n: 'εκείνο', m_pl: 'εκείνοι', f_pl: 'εκείνες', n_pl: 'εκείνα' },
      { case: 'Genitive', m: 'εκείνου', f: 'εκείνης', n: 'εκείνου', m_pl: 'εκείνων', f_pl: 'εκείνων', n_pl: 'εκείνων' },
      { case: 'Accusative', m: 'εκείνον', f: 'εκείνην', n: 'εκείνο', m_pl: 'εκείνους', f_pl: 'εκείνες', n_pl: 'εκείνα' },
    ],
    example: { greek: 'Εκείνο το σπίτι είναι μεγάλο.', english: 'That house (over there) is big.' },
  },
]

// ─── Possessive Pronouns ──────────────────────────────────────────────────────

const POSSESSIVE = [
  { person: '1st sg', weak: 'μου', strong: 'δικός μου / δική μου / δικό μου', english: 'my / mine' },
  { person: '2nd sg', weak: 'σου', strong: 'δικός σου / δική σου / δικό σου', english: 'your / yours (sg)' },
  { person: '3rd sg', weak: 'του / της / του', strong: 'δικός του/της — δική του/της — δικό του/της', english: 'his / her / its' },
  { person: '1st pl', weak: 'μας', strong: 'δικός μας / δική μας / δικό μας', english: 'our / ours' },
  { person: '2nd pl', weak: 'σας', strong: 'δικός σας / δική σας / δικό σας', english: 'your / yours (pl/formal)' },
  { person: '3rd pl', weak: 'τους', strong: 'δικός τους / δική τους / δικό τους', english: 'their / theirs' },
]

// ─── Relative Pronouns ────────────────────────────────────────────────────────

const RELATIVE = [
  { form: 'που', usage: 'Invariable relative pronoun — who, which, that', example: { greek: 'Ο άντρας που μένει εδώ.', english: 'The man who lives here.' } },
  { form: 'ο οποίος / η οποία / το οποίο', usage: 'Declinable relative pronoun — more formal; agrees in gender/number with the antecedent', example: { greek: 'Το βιβλίο, το οποίο διάβασα, ήταν ωραίο.', english: 'The book, which I read, was nice.' } },
  { form: 'όποιος / όποια / όποιο', usage: 'Whoever / whichever — used without a specific antecedent', example: { greek: 'Όποιος θέλει μπορεί να έρθει.', english: 'Whoever wants can come.' } },
  { form: 'όσος / όση / όσο', usage: 'As much as / as many as', example: { greek: 'Πάρε όσα θέλεις.', english: 'Take as many as you want.' } },
]

// ─── Interrogative Pronouns ───────────────────────────────────────────────────

const INTERROGATIVE = [
  { form: 'ποιος / ποια / ποιο', usage: 'Who? / Which? — declines for gender, number, case', example: { greek: 'Ποιος ήρθε; Ποιο βιβλίο διάβασες;', english: 'Who came? Which book did you read?' } },
  { form: 'τι', usage: 'What? — invariable', example: { greek: 'Τι θέλεις;', english: 'What do you want?' } },
  { form: 'πόσος / πόση / πόσο', usage: 'How much? / How many?', example: { greek: 'Πόσα χρήματα έχεις;', english: 'How much money do you have?' } },
]

export default function PronounsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Pronouns
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Αντωνυμίες — Personal, demonstrative, possessive, relative & interrogative
        </p>
      </div>

      <div className="flex flex-col gap-8">

        {/* Personal */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Personal Pronouns</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Strong forms for emphasis; weak (clitic) forms used before the verb. Subject pronouns are usually dropped — the verb ending already shows the person.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Person', 'Nominative', 'Genitive (strong / weak)', 'Accusative (strong / weak)', 'English'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERSONAL_STRONG.map((row) => (
                  <tr key={row.person} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 pr-3 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{row.person}</td>
                    <td className="py-2 pr-3 greek-text font-semibold" style={{ color: '#0D5EAF' }}>{row.nom}</td>
                    <td className="py-2 pr-3 greek-text" style={{ color: 'var(--foreground)' }}>{row.gen}</td>
                    <td className="py-2 pr-3 greek-text" style={{ color: 'var(--foreground)' }}>{row.acc}</td>
                    <td className="py-2 text-xs italic" style={{ color: 'var(--muted-foreground)' }}>{row.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
            <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>Σε αγαπώ. / Εγώ σε αγαπώ (έμφαση).</p>
            <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>I love you. / I love you (emphatic).</p>
          </div>
        </section>

        {/* Demonstrative */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Demonstrative Pronouns</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Decline for gender, number, and case. Used both as pronouns ("this one") and as determiners before a noun ("this house").
          </p>
          <div className="flex flex-col gap-6">
            {DEMONSTRATIVE.map((dem) => (
              <div key={dem.label}>
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="greek-text text-xl font-bold" style={{ color: '#0D5EAF' }}>{dem.label}</span>
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{dem.meaning}</span>
                </div>
                <div className="overflow-x-auto rounded-xl border p-3" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        {['Case', 'Masc. sg', 'Fem. sg', 'Neut. sg', 'Masc. pl', 'Fem. pl', 'Neut. pl'].map((h) => (
                          <th key={h} className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dem.forms.map((row) => (
                        <tr key={row.case} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                          <td className="py-1.5 pr-3 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{row.case}</td>
                          {[row.m, row.f, row.n, row.m_pl, row.f_pl, row.n_pl].map((v, i) => (
                            <td key={i} className="py-1.5 pr-3 greek-text font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                  <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{dem.example.greek}</p>
                  <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{dem.example.english}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Possessive */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Possessive Pronouns</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Weak forms (genitive clitics) follow the noun. Strong forms use <span className="greek-text font-semibold">δικός/δική/δικό</span> + weak form and decline like adjectives.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Person', 'Weak (clitic)', 'Strong (δικός…)', 'English'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {POSSESSIVE.map((row) => (
                  <tr key={row.person} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 pr-3 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{row.person}</td>
                    <td className="py-2 pr-3 greek-text font-bold text-base" style={{ color: '#0D5EAF' }}>{row.weak}</td>
                    <td className="py-2 pr-3 greek-text text-sm" style={{ color: 'var(--foreground)' }}>{row.strong}</td>
                    <td className="py-2 text-xs italic" style={{ color: 'var(--muted-foreground)' }}>{row.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
            <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>Το σπίτι μου. / Αυτό είναι δικό μου.</p>
            <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>My house. / This is mine.</p>
          </div>
        </section>

        {/* Relative */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Relative Pronouns</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Connect a clause to a noun. <span className="greek-text font-semibold">Που</span> is the most common — it never changes form.
          </p>
          <div className="flex flex-col gap-3">
            {RELATIVE.map((r) => (
              <div key={r.form} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                <p className="greek-text font-bold text-lg mb-1" style={{ color: '#0D5EAF' }}>{r.form}</p>
                <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>{r.usage}</p>
                <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                  <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{r.example.greek}</p>
                  <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{r.example.english}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interrogative */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Interrogative Pronouns</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Used to ask questions. <span className="greek-text font-semibold">Τι</span> is invariable; <span className="greek-text font-semibold">ποιος</span> and <span className="greek-text font-semibold">πόσος</span> decline like adjectives.
          </p>
          <div className="flex flex-col gap-3">
            {INTERROGATIVE.map((r) => (
              <div key={r.form} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                <p className="greek-text font-bold text-lg mb-1" style={{ color: '#0D5EAF' }}>{r.form}</p>
                <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>{r.usage}</p>
                <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                  <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{r.example.greek}</p>
                  <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{r.example.english}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
