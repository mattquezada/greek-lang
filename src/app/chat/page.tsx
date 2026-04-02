'use client'

import { useEffect, useState } from 'react'
import ChatWindow from '@/components/chat/ChatWindow'
import { useChat } from '@/hooks/useChat'

const CONVERSATION_STARTERS = [
  'Start a beginner conversation',
  'Practice ordering food at a restaurant',
  'Explain verb aspects (perfective vs imperfective)',
  'Teach me 5 common idioms',
  'Practice Greek alphabet',
]

interface SessionPreview {
  id: string
  preview: string
  updated_at: string
  messageCount: number
}

export default function ChatPage() {
  const { messages, isLoading, isSyncing, sessionId, sendMessage, clearMessages, loadSession } = useChat()
  const [sessions, setSessions] = useState<SessionPreview[]>([])

  // Load session list
  useEffect(() => {
    fetch('/api/chat/sessions')
      .then((r) => r.json())
      .then(({ sessions: s }) => setSessions(s ?? []))
      .catch(() => {})
  }, [sessionId]) // refresh list when sessionId changes (new session created)

  function formatDate(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex h-screen flex-col md:flex-row" style={{ paddingTop: 0 }}>
      {/* Sidebar */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r p-4 md:flex gap-3"
        style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}
      >
        {/* New conversation */}
        <button
          onClick={clearMessages}
          className="w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-white text-left"
          style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
        >
          + New conversation
        </button>

        {/* Starters */}
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
            Quick start
          </p>
          <div className="flex flex-col gap-1">
            {CONVERSATION_STARTERS.map((starter) => (
              <button
                key={starter}
                onClick={() => sendMessage(starter)}
                disabled={isLoading}
                className="rounded-lg px-3 py-2 text-left text-xs transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: 'var(--glass-bg-hover)', color: 'var(--foreground)' }}
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        {/* Recent sessions */}
        {sessions.filter((s) => s.messageCount > 0).length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
              Recent
            </p>
            <div className="flex flex-col gap-1">
              {sessions.filter((s) => s.messageCount > 0).map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadSession(s.id)}
                  className="rounded-lg px-3 py-2 text-left transition-opacity hover:opacity-80"
                  style={{
                    background: s.id === sessionId ? 'var(--glass-bg-hover)' : 'transparent',
                    border: s.id === sessionId ? '1px solid var(--glass-border)' : '1px solid transparent',
                  }}
                >
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>{s.preview}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{formatDate(s.updated_at)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sync indicator */}
        {isSyncing && (
          <p className="text-xs mt-auto text-center" style={{ color: 'var(--muted-foreground)' }}>Saving…</p>
        )}
      </aside>

      {/* Chat window */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile starters */}
        <div className="flex gap-2 overflow-x-auto px-4 py-2 md:hidden" style={{ borderBottom: '1px solid var(--glass-border)' }}>
          {CONVERSATION_STARTERS.map((starter) => (
            <button
              key={starter}
              onClick={() => sendMessage(starter)}
              disabled={isLoading}
              className="shrink-0 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }}
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
