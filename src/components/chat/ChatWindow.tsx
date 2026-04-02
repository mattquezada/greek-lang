'use client'

import { useEffect, useRef } from 'react'
import type { ChatMessage as ChatMessageType } from '@/types/chat'
import ChatMessageComponent from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import ChatInput from './ChatInput'

interface Props {
  messages: ChatMessageType[]
  isLoading: boolean
  onSend: (message: string) => void
}

export default function ChatWindow({ messages, isLoading, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div
      className="flex flex-col"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white animate-glow-pulse"
                style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', boxShadow: '0 0 24px rgba(13,94,175,0.4)' }}
              >
                Ε
              </div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                Γεια σου! I&apos;m Eleni
              </h2>
              <p className="mt-2 max-w-sm text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Your AI Greek language tutor. Ask me anything about Modern Greek — grammar, vocabulary,
                pronunciation, or just practice conversation!
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessageComponent key={i} message={msg} />
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <TypingIndicator />
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input pinned to bottom */}
      <div className="shrink-0">
        <ChatInput onSend={onSend} disabled={isLoading} />
      </div>
    </div>
  )
}
