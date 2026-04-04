import { getAnthropicClient } from '@/lib/claude/client'

const LEVELS = {
  beginner:     'very simple sentences — present tense, basic nouns, greetings. Gap word should be a common noun or verb form.',
  intermediate: 'sentences using past or future tense, adjective agreement, prepositions. Gap can be a conjugated verb or adjective.',
  advanced:     'complex sentences with subjunctive, conditionals, participles. Gap can be any advanced form.',
}

// GET — generate a fill-in-the-blank prompt
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = (searchParams.get('level') ?? 'beginner') as keyof typeof LEVELS

  const client = getAnthropicClient()

  const prompt = `Generate ONE Modern Greek fill-in-the-blank exercise for a ${level} learner.

Level: ${level} — ${LEVELS[level] || LEVELS.beginner}

Return ONLY valid JSON (no markdown):
{
  "sentence": "Greek sentence with ___ for the missing word",
  "answer": "the missing Greek word/form",
  "english": "English translation of the full sentence (with the word filled in)",
  "hint": "brief English clue (e.g. 'past tense of go' or 'feminine adjective for beautiful')",
  "explanation": "one sentence explaining the grammar point"
}

Rules:
- The blank (___) replaces exactly ONE word
- The answer must be unambiguous — only one word fits correctly
- Use proper Greek Unicode with correct monotonic accent marks (τόνοι)
- The sentence should be natural and useful in real life`

  try {
    const client2 = getAnthropicClient()
    const response = await client2.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return Response.json(JSON.parse(cleaned))
  } catch {
    return Response.json({
      sentence: 'Πού είναι το ____;',
      answer: 'σπίτι',
      english: 'Where is the house?',
      hint: 'the word for "house"',
      explanation: 'το σπίτι (neuter) takes the article το.',
    })
  }
}

// POST — evaluate user's answer
export async function POST(request: Request) {
  const body = await request.json()
  const { userAnswer, correctAnswer, sentence, english, level = 'beginner' } = body as {
    userAnswer: string
    correctAnswer: string
    sentence: string
    english: string
    level: string
  }

  // Normalise accents for comparison
  function norm(s: string) {
    return s.trim().toLowerCase()
      .replace(/ά/g, 'α').replace(/έ/g, 'ε').replace(/ή/g, 'η').replace(/ί/g, 'ι')
      .replace(/ό/g, 'ο').replace(/ύ/g, 'υ').replace(/ώ/g, 'ω')
      .replace(/ϊ/g, 'ι').replace(/ϋ/g, 'υ').replace(/ΐ/g, 'ι').replace(/ΰ/g, 'υ')
  }

  const exactMatch = norm(userAnswer) === norm(correctAnswer)

  if (exactMatch) {
    return Response.json({ correct: true, note: null })
  }

  // Ask Claude if the answer is acceptable (e.g. correct but accent typo or valid alternative)
  const client = getAnthropicClient()
  const evalPrompt = `A Greek learner (${level} level) answered a fill-in-the-blank exercise.

Sentence: "${sentence}"
English meaning: "${english}"
Expected answer: "${correctAnswer}"
Learner's answer: "${userAnswer}"

Is the learner's answer acceptable? (correct meaning, possibly minor accent error or valid alternative form)

Return ONLY valid JSON:
{ "correct": true/false, "note": "brief feedback — what was wrong or confirm it's right (1 sentence, encouraging)" }`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      messages: [{ role: 'user', content: evalPrompt }],
    })
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    return Response.json(JSON.parse(cleaned))
  } catch {
    return Response.json({ correct: false, note: null })
  }
}
