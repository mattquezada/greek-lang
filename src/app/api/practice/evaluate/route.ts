import { getAnthropicClient } from '@/lib/claude/client'

const LEVELS = {
  beginner: 'very simple sentences using present tense, greetings, basic nouns (food, family, numbers). Max 5-6 words.',
  intermediate: 'sentences using past/future tense, adjective agreement, common idioms. Up to 8 words.',
  advanced: 'complex sentences with subjunctive (να), conditionals, irregular verbs, multiple clauses.',
}

// GET — generate first prompt for a session
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = (searchParams.get('level') ?? 'beginner') as keyof typeof LEVELS

  const client = getAnthropicClient()

  const prompt = `You are a Greek language practice assistant. Generate ONE beginner practice prompt for someone learning Modern Greek.

Level: ${level} — ${LEVELS[level] || LEVELS.beginner}

Return ONLY valid JSON (no markdown):
{
  "english": "How would you say: '[sentence in English]'?",
  "hints": ["Greek word = English meaning", "Greek word = English meaning"]
}

Rules:
- The sentence should be natural and practical (greetings, daily life, travel, food)
- Provide 3-5 hints showing the key building blocks needed
- Hints format: "Greek = English" (e.g. "γεια σου = hello/hi", "πού = where")
- Do NOT reveal the full answer in the hints — only provide the pieces`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    const data = JSON.parse(cleaned)

    return Response.json({ prompt: data })
  } catch {
    return Response.json({
      prompt: {
        english: "How would you say: 'Hello, how are you?'",
        hints: ['γεια σου = hello/hi', 'πώς = how', 'είσαι = you are', 'τι κάνεις = how are you (informal)'],
      },
    })
  }
}

// POST — evaluate answer and return next prompt
export async function POST(request: Request) {
  const body = await request.json()
  const { userAnswer, englishPrompt, level = 'beginner' } = body as {
    userAnswer: string
    englishPrompt: string
    level: string
  }

  if (!userAnswer || !englishPrompt) {
    return Response.json({ error: 'userAnswer and englishPrompt are required' }, { status: 400 })
  }

  const levelDesc = LEVELS[level as keyof typeof LEVELS] || LEVELS.beginner
  const client = getAnthropicClient()

  const prompt = `You are evaluating a Modern Greek language learner's answer. Be encouraging but accurate.

The learner was asked: "${englishPrompt}"
Their answer: "${userAnswer}"
Level: ${level} — ${levelDesc}

Evaluate their answer AND generate the next practice prompt. Return ONLY valid JSON (no markdown):
{
  "correct": true,
  "correction": null,
  "idealAnswer": "the best Greek translation",
  "note": "brief grammar tip or encouragement (1 sentence)",
  "nextPrompt": {
    "english": "How would you say: '[next sentence]'?",
    "hints": ["Greek = English", "Greek = English"]
  }
}

Rules:
- correct: true if the answer is grammatically acceptable and means the right thing (minor accent errors = still correct)
- correction: null if correct, otherwise the corrected Greek with the error highlighted briefly
- idealAnswer: the most natural Greek way to say it
- note: one short tip about what they got right or a key grammar pattern used
- nextPrompt: a new sentence at the same level, different topic from the current one
- Do NOT be harsh — celebrate attempts even when wrong`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return Response.json(JSON.parse(cleaned))
  } catch {
    return Response.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}
