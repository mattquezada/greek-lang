import type { ChatMessage as ChatMessageType } from '@/types/chat'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
        style={
          isUser
            ? { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }
            : { backgroundColor: '#0D5EAF', color: '#fff' }
        }
      >
        {isUser ? '👤' : 'Ε'}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={
          isUser
            ? { backgroundColor: '#0D5EAF', color: '#fff' }
            : { backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }
        }
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
