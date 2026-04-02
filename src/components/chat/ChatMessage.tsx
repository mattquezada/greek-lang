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
            ? { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)', color: 'var(--muted-foreground)' }
            : { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff', boxShadow: '0 0 12px rgba(13,94,175,0.3)' }
        }
      >
        {isUser ? '👤' : 'Ε'}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff', boxShadow: '0 0 16px rgba(13,94,175,0.25)' }
            : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)', color: 'var(--foreground)' }
        }
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
