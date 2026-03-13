export const metadata = {
  title: 'Greek Determiners & Articles | Elliniká',
  description: 'Definite and indefinite articles, demonstrative determiners in Modern Greek',
}

const DEFINITE = [
  { case: 'Nominative', m_sg: 'ο', f_sg: 'η', n_sg: 'το', m_pl: 'οι', f_pl: 'οι', n_pl: 'τα' },
  { case: 'Genitive', m_sg: 'του', f_sg: 'της', n_sg: 'του', m_pl: 'των', f_pl: 'των', n_pl: 'των' },
  { case: 'Accusative', m_sg: 'τον', f_sg: 'την', n_sg: 'το', m_pl: 'τους', f_pl: 'τις', n_pl: 'τα' },
  { case: 'Vocative', m_sg: '—', f_sg: '—', n_sg: '—', m_pl: '—', f_pl: '—', n_pl: '—' },
]

const INDEFINITE = [
  { case: 'Nominative', m: 'ένας', f: 'μια / μία', n: 'ένα' },
  { case: 'Genitive', m: 'ενός', f: 'μιας / μίας', n: 'ενός' },
  { case: 'Accusative', m: 'έναν / ένα', f: 'μια / μία', n: 'ένα' },
]

const DEMONSTRATIVE_DET = [
  {
    label: 'αυτός — this (near)',
    note: 'Used with the definite article before the noun: αυτός ο άντρας (this man)',
    rows: [
      { case: 'Nom', m_sg: 'αυτός', f_sg: 'αυτή', n_sg: 'αυτό', m_pl: 'αυτοί', f_pl: 'αυτές', n_pl: 'αυτά' },
      { case: 'Gen', m_sg: 'αυτού', f_sg: 'αυτής', n_sg: 'αυτού', m_pl: 'αυτών', f_pl: 'αυτών', n_pl: 'αυτών' },
      { case: 'Acc', m_sg: 'αυτόν', f_sg: 'αυτήν', n_sg: 'αυτό', m_pl: 'αυτούς', f_pl: 'αυτές', n_pl: 'αυτά' },
    ],
  },
  {
    label: 'εκείνος — that (far)',
    note: 'Used with the definite article: εκείνο το σπίτι (that house)',
    rows: [
      { case: 'Nom', m_sg: 'εκείνος', f_sg: 'εκείνη', n_sg: 'εκείνο', m_pl: 'εκείνοι', f_pl: 'εκείνες', n_pl: 'εκείνα' },
      { case: 'Gen', m_sg: 'εκείνου', f_sg: 'εκείνης', n_sg: 'εκείνου', m_pl: 'εκείνων', f_pl: 'εκείνων', n_pl: 'εκείνων' },
      { case: 'Acc', m_sg: 'εκείνον', f_sg: 'εκείνην', n_sg: 'εκείνο', m_pl: 'εκείνους', f_pl: 'εκείνες', n_pl: 'εκείνα' },
    ],
  },
]

const TIPS = [
  {
    heading: 'Always learn a noun with its article',
    body: 'Gender is not always predictable from the ending. Memorise: ο άντρας, η γυναίκα, το παιδί.',
    example: { greek: 'ο καφές, η θάλασσα, το νερό', english: 'the coffee, the sea, the water' },
  },
  {
    heading: 'The definite article is required where English omits it',
    body: 'Greeks use the article before abstract nouns, proper names, days, and months in many contexts.',
    example: { greek: 'Η Μαρία είναι στο σπίτι. / Η Δευτέρα είναι δύσκολη.', english: 'Maria is at home. / Monday is hard.' },
  },
  {
    heading: 'Demonstrative + article + noun',
    body: 'Greek demonstrative determiners surround the article. The article appears between the demonstrative and the noun.',
    example: { greek: 'αυτός ο άντρας (NOT: αυτός άντρας)', english: 'this man' },
  },
  {
    heading: 'The indefinite article doubles as "one"',
    body: 'ένας / μια / ένα also means the number one. Context determines the meaning.',
    example: { greek: 'Θέλω έναν καφέ. / Έχω ένα παιδί.', english: 'I want a coffee. / I have one child.' },
  },
]

export default function DeterminersPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Determiners & Articles
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Άρθρα & Προσδιοριστικά — Definite, indefinite, and demonstrative
        </p>
      </div>

      <div className="flex flex-col gap-8">

        {/* Definite article */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Definite Article — ο / η / το</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Changes by gender, number, and case. The article agrees with the noun it accompanies in all three.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Case', 'M sg', 'F sg', 'N sg', 'M pl', 'F pl', 'N pl'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEFINITE.map((row) => (
                  <tr key={row.case} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 pr-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{row.case}</td>
                    {[row.m_sg, row.f_sg, row.n_sg, row.m_pl, row.f_pl, row.n_pl].map((v, i) => (
                      <td key={i} className="py-2 pr-3 greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Indefinite article */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Indefinite Article — ένας / μια / ένα</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Only singular (no plural indefinite article). Also serves as the number "one".
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Case', 'Masculine', 'Feminine', 'Neuter'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INDEFINITE.map((row) => (
                  <tr key={row.case} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 pr-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{row.case}</td>
                    <td className="py-2 pr-3 greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>{row.m}</td>
                    <td className="py-2 pr-3 greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>{row.f}</td>
                    <td className="py-2 greek-text text-lg font-bold" style={{ color: '#0D5EAF' }}>{row.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Demonstrative determiners */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Demonstrative Determiners</h2>
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <span className="greek-text font-semibold">αυτός</span> (this) and <span className="greek-text font-semibold">εκείνος</span> (that) function as both pronouns and determiners. As determiners, they always co-occur with the definite article.
          </p>
          <div className="flex flex-col gap-6">
            {DEMONSTRATIVE_DET.map((dem) => (
              <div key={dem.label}>
                <p className="greek-text font-bold text-lg mb-0.5" style={{ color: '#0D5EAF' }}>{dem.label}</p>
                <p className="text-xs mb-2" style={{ color: 'var(--muted-foreground)' }}>{dem.note}</p>
                <div className="overflow-x-auto rounded-xl border p-3" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        {['Case', 'M sg', 'F sg', 'N sg', 'M pl', 'F pl', 'N pl'].map((h) => (
                          <th key={h} className="pb-1.5 pr-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dem.rows.map((row) => (
                        <tr key={row.case} className="border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                          <td className="py-1.5 pr-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{row.case}</td>
                          {[row.m_sg, row.f_sg, row.n_sg, row.m_pl, row.f_pl, row.n_pl].map((v, i) => (
                            <td key={i} className="py-1.5 pr-3 greek-text font-semibold" style={{ color: 'var(--foreground)' }}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Key Points</h2>
          <div className="flex flex-col gap-4">
            {TIPS.map((tip) => (
              <div key={tip.heading} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                <h3 className="mb-1 font-semibold text-base" style={{ color: 'var(--foreground)' }}>{tip.heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{tip.body}</p>
                {tip.example && (
                  <div className="mt-3 rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                    <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{tip.example.greek}</p>
                    <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{tip.example.english}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
