'use client'

import ChatWindow from '@/components/chat/ChatWindow'
import { useChat } from '@/hooks/useChat'

const CONVERSATION_STARTERS = [
  'Start a beginner conversation',
  'Practice ordering food at a restaurant',
  'Explain verb aspects (perfective vs imperfective)',
  'Teach me 5 common idioms',
  'Practice Greek alphabet',
]

export default function ChatPage() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat()

  return (
    <div className="flex h-screen flex-col md:flex-row" style={{ paddingTop: 0 }}>
      {/* Sidebar */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r p-4 md:flex"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          paddingTop: '1rem',
        }}
      >
        <div className="mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
            Conversation Starters
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {CONVERSATION_STARTERS.map((starter) => (
            <button
              key={starter}
              onClick={() => sendMessage(starter)}
              disabled={isLoading}
              className="rounded-lg px-3 py-2 text-left text-sm transition-colors hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
            >
              {starter}
            </button>
          ))}
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="mt-auto rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            Clear conversation
          </button>
        )}
      </aside>

      {/* Chat window takes full remaining height */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile starters (horizontal scroll) */}
        <div
          className="flex gap-2 overflow-x-auto px-4 py-2 md:hidden"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {CONVERSATION_STARTERS.map((starter) => (
            <button
              key={starter}
              onClick={() => sendMessage(starter)}
              disabled={isLoading}
              className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors hover:opacity-80 disabled:opacity-50"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
              }}
            >
              {starter}
            </button>
          ))}
        </div>

        <ChatWindow messages={messages} isLoading={isLoading} onSend={sendMessage} />
      </div>
    </div>
  )
}
