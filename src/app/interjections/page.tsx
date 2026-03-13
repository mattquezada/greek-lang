export const metadata = {
  title: 'Greek Interjections | Elliniká',
  description: 'Common Greek interjections and exclamations for everyday conversation',
}

interface Interjection {
  greek: string
  pronunciation?: string
  english: string
  context: string
  example?: { greek: string; english: string }
}

const GROUPS: { category: string; subtitle: string; items: Interjection[] }[] = [
  {
    category: 'Greetings & Farewells',
    subtitle: 'Starting and ending conversations',
    items: [
      { greek: 'γεια (σου / σας)', pronunciation: 'YA-soo / YA-sas', english: 'hi / hello / bye', context: 'The most versatile Greek greeting — used for both hello and goodbye, formal or informal', example: { greek: 'Γεια σου, Μαρία! / Γεια σας!', english: 'Hi Maria! / Hello/Goodbye (formal)!' } },
      { greek: 'ορίστε', pronunciation: 'o-RI-ste', english: 'here you go / pardon? / yes?', context: 'Handing something over, answering the door/phone, or politely asking someone to repeat themselves', example: { greek: 'Ορίστε ο καφές σας.', english: 'Here is your coffee.' } },
      { greek: 'αντίο', pronunciation: 'an-DI-o', english: 'goodbye (final)', context: 'More final or formal farewell — less common than γεια', example: { greek: 'Αντίο και καλό ταξίδι!', english: 'Goodbye and bon voyage!' } },
      { greek: 'καλημέρα', pronunciation: 'ka-li-ME-ra', english: 'good morning', context: 'Used until around noon', example: { greek: 'Καλημέρα! Τι κάνεις;', english: 'Good morning! How are you?' } },
      { greek: 'καλησπέρα', pronunciation: 'ka-li-SPE-ra', english: 'good evening', context: 'Used from late afternoon onwards', example: { greek: 'Καλησπέρα σας.', english: 'Good evening (formal).' } },
      { greek: 'καληνύχτα', pronunciation: 'ka-li-NIH-ta', english: 'good night', context: 'Said when parting at night or before sleep', example: { greek: 'Καληνύχτα! Ωραία βραδιά!', english: 'Good night! Have a lovely evening!' } },
    ],
  },
  {
    category: 'Surprise & Emotion',
    subtitle: 'Reacting to unexpected or strong news',
    items: [
      { greek: 'ωχ!', pronunciation: 'oh', english: 'oh! / oops!', context: 'Mild surprise, a minor mistake, or realisation', example: { greek: 'Ωχ, ξέχασα τα κλειδιά μου!', english: 'Oops, I forgot my keys!' } },
      { greek: 'ω!', pronunciation: 'oh', english: 'oh! (wonder or pain)', context: 'Expresses wonder, pain, or strong feeling', example: { greek: 'Ω, τι ωραίο!', english: 'Oh, how beautiful!' } },
      { greek: 'α!', pronunciation: 'ah', english: 'ah! (realisation)', context: 'Sudden understanding or pleasant realisation', example: { greek: 'Α, τώρα καταλαβαίνω!', english: 'Ah, now I understand!' } },
      { greek: 'ουφ!', pronunciation: 'oof', english: 'phew! / ugh!', context: 'Relief after stress, or exasperation/tiredness', example: { greek: 'Ουφ, επιτέλους τελείωσε!', english: 'Phew, it\'s finally over!' } },
      { greek: 'αχ!', pronunciation: 'ah', english: 'ah! (pain or regret)', context: 'Mild pain, disappointment, or nostalgic sigh', example: { greek: 'Αχ, με πονά το κεφάλι μου.', english: 'Ah, my head hurts.' } },
      { greek: 'άντε!', pronunciation: 'AN-de', english: 'come on! / get out! / alright then', context: 'Encouragement, disbelief, or dismissal depending on tone', example: { greek: 'Άντε, πες μου την αλήθεια! / Άντε πια!', english: 'Come on, tell me the truth! / Enough already!' } },
    ],
  },
  {
    category: 'Approval & Encouragement',
    subtitle: 'Expressing praise and positive reactions',
    items: [
      { greek: 'μπράβο!', pronunciation: 'BRA-vo', english: 'bravo! / well done!', context: 'Praise for an achievement; used freely in everyday speech', example: { greek: 'Μπράβο σου, τα πήγες πολύ καλά!', english: 'Well done, you did very well!' } },
      { greek: 'ωραία!', pronunciation: 'o-RE-a', english: 'great! / nice! / good!', context: 'Approving or acknowledging something positively', example: { greek: 'Ωραία, τα λέμε αύριο.', english: 'Great, see you tomorrow.' } },
      { greek: 'τέλεια!', pronunciation: 'TE-le-a', english: 'perfect! / awesome!', context: 'Strong positive approval', example: { greek: 'Τέλεια, αυτό είναι ακριβώς αυτό που ήθελα!', english: 'Perfect, that\'s exactly what I wanted!' } },
      { greek: 'εμπρός!', pronunciation: 'em-BROS', english: 'come in! / go ahead! / hello? (phone)', context: 'Inviting someone in, giving the go-ahead, or answering the phone', example: { greek: 'Εμπρός! — Ναι, λέγετε.', english: 'Hello? — Yes, go ahead.' } },
    ],
  },
  {
    category: 'Sympathy & Regret',
    subtitle: 'Expressing sorrow or disappointment',
    items: [
      { greek: 'κρίμα!', pronunciation: 'KRI-ma', english: 'what a shame! / pity!', context: 'Expressing regret or sympathy for something unfortunate', example: { greek: 'Κρίμα, δεν μπορείς να έρθεις!', english: 'What a shame, you can\'t come!' } },
      { greek: 'συγγνώμη', pronunciation: 'si-GNO-mi', english: 'sorry / excuse me', context: 'Apology or to get someone\'s attention. Note: σόρι is also very common colloquially.', example: { greek: 'Συγγνώμη, μπορείς να επαναλάβεις;', english: 'Sorry, can you repeat that?' } },
      { greek: 'λυπάμαι', pronunciation: 'li-PA-me', english: 'I\'m sorry (I feel sad)', context: 'Expressing empathy or sorrow (not just apology). "Λυπάμαι για την απώλεια" = condolences.', example: { greek: 'Λυπάμαι πολύ γι\' αυτό.', english: 'I\'m very sorry about that.' } },
    ],
  },
  {
    category: 'Filler & Discourse',
    subtitle: 'Keeping the conversation flowing',
    items: [
      { greek: 'έλα', pronunciation: 'E-la', english: 'come on / really? / come here', context: 'One of the most versatile Greek words — can mean "come here", "you\'re kidding!", "come on then", or simply fill a pause', example: { greek: 'Έλα! Δεν το πιστεύω! / Έλα, δεν έχεις δίκιο.', english: 'No way! I don\'t believe it! / Come on, you\'re wrong.' } },
      { greek: 'ρε', pronunciation: 're', english: 'hey (address particle)', context: 'Informal address particle — softens or strengthens depending on tone. Used only among friends.', example: { greek: 'Ρε Γιάννη, τι κάνεις; / Ρε, σταμάτα!', english: 'Hey Giannis, how are you? / Hey, stop it!' } },
      { greek: 'βρε', pronunciation: 'vre', english: 'hey (emphatic address)', context: 'Stronger version of ρε; adds surprise or emphasis', example: { greek: 'Βρε τι λες τώρα!', english: 'What on earth are you saying!' } },
      { greek: 'λοιπόν', pronunciation: 'li-PON', english: 'well / so / then', context: 'Discourse marker to signal a transition, conclusion, or to buy time', example: { greek: 'Λοιπόν, τι να κάνουμε;', english: 'So, what should we do?' } },
      { greek: 'δηλαδή', pronunciation: 'di-la-DI', english: 'that is / meaning / in other words', context: 'Clarifying or rephrasing; also used as a pause filler like "um"', example: { greek: 'Δηλαδή, δεν θα έρθεις;', english: 'So, meaning you won\'t come?' } },
      { greek: 'μάλλον', pronunciation: 'MA-lon', english: 'probably / I think / rather', context: 'Expresses probability or mild preference — very common in daily speech', example: { greek: 'Μάλλον θα βρέξει σήμερα.', english: 'It will probably rain today.' } },
    ],
  },
]

export default function InterjectionsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Greek Interjections
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Επιφωνήματα — Exclamations and discourse particles
        </p>
      </div>

      <div
        className="mb-6 rounded-xl border px-5 py-4 text-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
      >
        Interjections are{' '}
        <strong style={{ color: 'var(--foreground)' }}>invariable</strong> — they never change form. Many Greek interjections (like{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>έλα</span> and{' '}
        <span className="greek-text font-semibold" style={{ color: '#0D5EAF' }}>ρε</span>) have a wide range of meanings depending entirely on tone and context.
      </div>

      <div className="flex flex-col gap-8">
        {GROUPS.map((group) => (
          <section key={group.category} className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{group.category}</h2>
            <p className="mb-5 text-sm" style={{ color: 'var(--muted-foreground)' }}>{group.subtitle}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <div key={item.greek} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="greek-text text-2xl font-bold" style={{ color: '#0D5EAF' }}>{item.greek}</span>
                      {item.pronunciation && (
                        <span className="ml-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>/{item.pronunciation}/</span>
                      )}
                    </div>
                    <span className="shrink-0 text-sm font-medium mt-0.5" style={{ color: 'var(--foreground)' }}>{item.english}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>{item.context}</p>
                  {item.example && (
                    <div className="rounded-lg border-l-4 pl-3 py-1" style={{ borderColor: '#0D5EAF' }}>
                      <p className="greek-text font-semibold text-xs" style={{ color: '#0D5EAF' }}>{item.example.greek}</p>
                      <p className="text-xs italic mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{item.example.english}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
