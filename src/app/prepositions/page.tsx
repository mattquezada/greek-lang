export const metadata = {
  title: 'Greek Prepositions | Elliniká',
  description: 'Common Modern Greek prepositions with meanings and example sentences',
}

interface Prep {
  greek: string
  english: string
  note?: string
  example: { greek: string; english: string }
}

const PREPOSITIONS: { category: string; subtitle: string; items: Prep[] }[] = [
  {
    category: 'Core Prepositions',
    subtitle: 'The most frequent — all govern the accusative case',
    items: [
      { greek: 'σε', english: 'in, at, to, on', note: 'Contracts with definite article: σε + τον = στον, σε + το = στο, σε + τη = στη, σε + τους = στους, σε + τα = στα', example: { greek: 'Πάω στο σπίτι. / Μένω στην Αθήνα.', english: 'I go home. / I live in Athens.' } },
      { greek: 'από', english: 'from, by, since, of', example: { greek: 'Έρχομαι από την Ελλάδα. / Είναι φτιαγμένο από ξύλο.', english: 'I come from Greece. / It\'s made of wood.' } },
      { greek: 'με', english: 'with, by (means)', example: { greek: 'Πάω με το τρένο. / Μιλώ με τον φίλο μου.', english: 'I go by train. / I speak with my friend.' } },
      { greek: 'για', english: 'for, about, to (purpose)', example: { greek: 'Αυτό είναι για σένα. / Μιλούμε για τον καιρό.', english: 'This is for you. / We\'re talking about the weather.' } },
      { greek: 'χωρίς', english: 'without', example: { greek: 'Καφές χωρίς ζάχαρη, παρακαλώ.', english: 'Coffee without sugar, please.' } },
      { greek: 'μέχρι / ως', english: 'until, up to, as far as', example: { greek: 'Μένω μέχρι τις δέκα. / Ως εδώ!', english: 'I stay until ten. / That\'s enough!' } },
      { greek: 'κατά', english: 'according to, approximately, against, per', example: { greek: 'Κατά τη γνώμη μου… / Κατά τις δύο.', english: 'In my opinion… / Around two o\'clock.' } },
      { greek: 'κατά τη διάρκεια', english: 'during', example: { greek: 'Κατά τη διάρκεια του μαθήματος.', english: 'During the lesson.' } },
    ],
  },
  {
    category: 'Place & Direction',
    subtitle: 'Indicating location or movement',
    items: [
      { greek: 'πάνω σε / από', english: 'on top of, above', example: { greek: 'Το βιβλίο είναι πάνω στο τραπέζι.', english: 'The book is on the table.' } },
      { greek: 'κάτω από', english: 'under, below', example: { greek: 'Η γάτα είναι κάτω από την καρέκλα.', english: 'The cat is under the chair.' } },
      { greek: 'μπροστά από', english: 'in front of', example: { greek: 'Σταμάτησε μπροστά από το σχολείο.', english: 'He stopped in front of the school.' } },
      { greek: 'πίσω από', english: 'behind', example: { greek: 'Κρύβεται πίσω από το δέντρο.', english: 'He\'s hiding behind the tree.' } },
      { greek: 'δίπλα σε', english: 'next to, beside', example: { greek: 'Κάθισε δίπλα μου.', english: 'Sit next to me.' } },
      { greek: 'μέσα σε', english: 'inside, within', example: { greek: 'Είναι μέσα στο κουτί.', english: 'It\'s inside the box.' } },
      { greek: 'έξω από', english: 'outside of', example: { greek: 'Τον περιμένω έξω από το σταθμό.', english: 'I\'m waiting for him outside the station.' } },
      { greek: 'ανάμεσα σε', english: 'between, among', example: { greek: 'Ανάμεσα στην Αθήνα και τη Θεσσαλονίκη.', english: 'Between Athens and Thessaloniki.' } },
      { greek: 'απέναντι από', english: 'opposite, across from', example: { greek: 'Η τράπεζα είναι απέναντι από το ταχυδρομείο.', english: 'The bank is across from the post office.' } },
    ],
  },
  {
    category: 'Time',
    subtitle: 'Indicating when or for how long',
    items: [
      { greek: 'πριν (από)', english: 'before', example: { greek: 'Πριν από δύο χρόνια. / Πριν φύγεις.', english: 'Two years ago. / Before you leave.' } },
      { greek: 'μετά (από)', english: 'after', example: { greek: 'Μετά το φαγητό. / Μετά από λίγο.', english: 'After the meal. / After a while.' } },
      { greek: 'σε (+ time)', english: 'in (duration)', example: { greek: 'Θα έρθω σε μια ώρα.', english: 'I\'ll come in an hour.' } },
      { greek: 'για (+ duration)', english: 'for (period of time)', example: { greek: 'Έμεινα για τρεις μέρες.', english: 'I stayed for three days.' } },
    ],
  },
  {
    category: 'Other Common',
    subtitle: 'Miscellaneous useful prepositions',
    items: [
      { greek: 'λόγω', english: 'due to, because of', example: { greek: 'Λόγω κακοκαιρίας, η πτήση ακυρώθηκε.', english: 'Due to bad weather, the flight was cancelled.' } },
      { greek: 'εκτός από', english: 'except for, apart from', example: { greek: 'Όλοι ήρθαν εκτός από τον Γιώργο.', english: 'Everyone came except Giorgos.' } },
      { greek: 'σύμφωνα με', english: 'according to', example: { greek: 'Σύμφωνα με τις ειδήσεις...', english: 'According to the news...' } },
      { greek: 'αντί (για)', english: 'instead of', example: { greek: 'Πάρε τσάι αντί για καφέ.', english: 'Have tea instead of coffee.' } },
      { greek: 'περί', english: 'about, regarding (formal)', example: { greek: 'Μιλάμε περί αυτού.', english: 'We\'re talking about this.' } },
      { greek: 'εναντίον', english: 'against', example: { greek: 'Ψηφίζω εναντίον του νόμου.', english: 'I vote against the law.' } },
    ],
  },
]

export default function PrepositionsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Prepositions
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Προθέσεις — Location, direction, time, and purpose
        </p>
      </div>

      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
      >
        Most Greek prepositions govern the{' '}
        <strong style={{ color: 'var(--foreground)' }}>accusative case</strong>. The preposition{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>σε</span>{' '}
        contracts with the definite article: <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>σε + τον = στον</span>,{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>σε + τη = στη</span>,{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>σε + τα = στα</span>, etc.
      </div>

      <div className="flex flex-col gap-8">
        {PREPOSITIONS.map((group) => (
          <section key={group.category} className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{group.category}</h2>
            <p className="mb-5 text-sm" style={{ color: 'var(--muted-foreground)' }}>{group.subtitle}</p>
            <div className="flex flex-col gap-4">
              {group.items.map((item) => (
                <div key={item.greek} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="greek-text text-xl font-bold" style={{ color: '#0D5EAF' }}>{item.greek}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.english}</span>
                  </div>
                  {item.note && (
                    <p className="text-xs mb-2" style={{ color: 'var(--muted-foreground)' }}>{item.note}</p>
                  )}
                  <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                    <p className="greek-text font-semibold text-sm" style={{ color: '#0D5EAF' }}>{item.example.greek}</p>
                    <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{item.example.english}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
