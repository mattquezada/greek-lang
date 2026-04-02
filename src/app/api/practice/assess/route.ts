import { getAnthropicClient } from '@/lib/claude/client'

export interface AssessQuestion {
  id: number
  level: 'A1' | 'A2' | 'B1' | 'B2'
  question: string
  options: [string, string, string, string]
  correctIndex: number
}

// GET — generate 7 assessment questions spanning A1–B2
export async function GET() {
  const client = getAnthropicClient()

  const prompt = `Generate exactly 7 multiple-choice questions to assess a learner's Modern Greek level.

Questions must span these CEFR levels in order:
1. A1 — Greek alphabet / basic greetings (e.g. what does "γεια σου" mean?)
2. A1 — Basic vocabulary (numbers, colours, family words)
3. A2 — Simple grammar (correct article / noun gender)
4. A2 — Simple past tense recognition
5. B1 — Verb aspects (identify perfective vs imperfective)
6. B1 — Case usage (which preposition + case)
7. B2 — Subjunctive / να construction

Return ONLY valid JSON (no markdown, no explanation):
{
  "questions": [
    {
      "id": 1,
      "level": "A1",
      "question": "What does 'γεια σου' mean?",
      "options": ["Good morning", "Hello / Hi", "Thank you", "Goodbye"],
      "correctIndex": 1
    }
  ]
}

Rules:
- Each question has exactly 4 options (strings)
- correctIndex is 0-based (0–3)
- All Greek text must use proper Unicode with monotonic accent marks
- Questions should be unambiguous — only one clearly correct answer
- Options should be plausible distractors, not obviously wrong`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    const data = JSON.parse(cleaned)
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Failed to generate questions' }, { status: 500 })
  }
}

// POST — evaluate all answers and return CEFR level
export async function POST(request: Request) {
  const { answers } = await request.json() as {
    answers: { id: number; level: string; question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]
  }

  const correct = answers.filter((a) => a.isCorrect).length
  const total = answers.length

  // Determine level from score breakdown
  const byLevel: Record<string, { correct: number; total: number }> = {}
  for (const a of answers) {
    if (!byLevel[a.level]) byLevel[a.level] = { correct: 0, total: 0 }
    byLevel[a.level].total++
    if (a.isCorrect) byLevel[a.level].correct++
  }

  // Simple scoring: find highest level where user got ≥50% correct
  const levelOrder = ['A1', 'A2', 'B1', 'B2']
  let assignedLevel = 'A1'
  for (const lvl of levelOrder) {
    const stats = byLevel[lvl]
    if (stats && stats.correct / stats.total >= 0.5) {
      assignedLevel = lvl
    }
  }

  const client = getAnthropicClient()
  const prompt = `A Greek learner just completed a level assessment. Score: ${correct}/${total}.
Level breakdown: ${JSON.stringify(byLevel)}
Assigned CEFR level: ${assignedLevel}

Write 3 short, specific practice recommendations for someone at ${assignedLevel} level.
Return ONLY valid JSON:
{"recommendations": ["...", "...", "..."]}

Each recommendation should be 1 sentence, specific (mention a grammar point or skill), and actionable.`

  let recommendations = [
    'Practice reading Greek texts aloud to build fluency.',
    'Focus on verb conjugation patterns.',
    'Review common vocabulary in context.',
  ]

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
    recommendations = JSON.parse(cleaned).recommendations
  } catch {
    // use defaults
  }

  return Response.json({
    level: assignedLevel,
    score: correct,
    total,
    breakdown: byLevel,
    recommendations,
  })
}
