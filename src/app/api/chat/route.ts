import { getAnthropicClient, ELENI_SYSTEM_PROMPT } from '@/lib/claude/client'
import type { ChatMessage } from '@/types/chat'

export async function POST(request: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json()

    const client = getAnthropicClient()

    // Keep only the last 10 messages (5 exchanges) to cap input token cost
    const WINDOW = 10
    const windowed = messages.slice(-WINDOW)

    const stream = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: ELENI_SYSTEM_PROMPT,
      messages: windowed.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
          }
          if (event.type === 'message_stop') {
            controller.close()
          }
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: 'Failed to get response from Eleni' }, { status: 500 })
  }
}
