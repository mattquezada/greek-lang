import { getAnthropicClient } from '@/lib/claude/client'

export async function POST(request: Request) {
  try {
    const { text, direction }: { text: string; direction: 'el-to-en' | 'en-to-el' } = await request.json()

    if (!text?.trim()) {
      return Response.json({ error: 'No text provided' }, { status: 400 })
    }

    const client = getAnthropicClient()

    const systemPrompt =
      direction === 'el-to-en'
        ? 'You are a precise Greek-to-English translator. Translate the provided Modern Greek text into natural English. Return only the translation — no explanations, no notes, no commentary.'
        : 'You are a precise English-to-Greek translator. Translate the provided English text into natural Modern Greek, using correct accent marks (τόνοι). Return only the translation — no explanations, no notes, no commentary.'

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: text.trim() }],
    })

    const translation = message.content[0].type === 'text' ? message.content[0].text : ''
    return Response.json({ translation })
  } catch (error) {
    console.error('Translate API error:', error)
    return Response.json({ error: 'Translation failed' }, { status: 500 })
  }
}
