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
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false)

  // Load session list
  useEffect(() => {
    fetch('/api/chat/sessions')
      .then((r) => r.json())
      .then(({ sessions: s }) => setSessions(s ?? []))
      .catch(() => {})
  }, [sessionId])

  function formatDate(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  const pastSessions = sessions.filter((s) => s.messageCount > 0)

  return (
    <div className="flex h-screen flex-col md:flex-row" style={{ paddingTop: 0 }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r p-4 md:flex gap-3"
        style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}
      >
        <button
          onClick={clearMessages}
          className="w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-white text-left"
          style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
        >
          + New conversation
        </button>

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

        {pastSessions.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
              Recent
            </p>
            <div className="flex flex-col gap-1">
              {pastSessions.map((s) => (
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

        {isSyncing && (
          <p className="text-xs mt-auto text-center" style={{ color: 'var(--muted-foreground)' }}>Saving…</p>
        )}
      </aside>

      {/* Chat window area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex items-center gap-2 px-3 py-2 md:hidden" style={{ borderBottom: '1px solid var(--glass-border)' }}>
          {/* New chat */}
          <button
            onClick={clearMessages}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
          >
            + New
          </button>

          {/* Starters scroll */}
          <div className="flex flex-1 gap-2 overflow-x-auto">
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

          {/* History button */}
          {pastSessions.length > 0 && (
            <button
              onClick={() => setMobileHistoryOpen(true)}
              className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }}
              aria-label="Chat history"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          )}
        </div>

        <ChatWindow messages={messages} isLoading={isLoading} onSend={sendMessage} />
      </div>

      {/* Mobile history drawer */}
      {mobileHistoryOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileHistoryOpen(false)}>
          <div
            className="mobile-menu-overlay absolute inset-0"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-72 flex flex-col p-4 gap-3"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderLeft: '1px solid var(--glass-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>History</p>
              <button
                onClick={() => setMobileHistoryOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--glass-bg-hover)', color: 'var(--muted-foreground)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => { clearMessages(); setMobileHistoryOpen(false) }}
              className="w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-white text-left"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              + New conversation
            </button>

            <div className="flex-1 overflow-y-auto flex flex-col gap-1">
              {pastSessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { loadSession(s.id); setMobileHistoryOpen(false) }}
                  className="rounded-lg px-3 py-2.5 text-left transition-opacity hover:opacity-80"
                  style={{
                    background: s.id === sessionId ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
                    border: `1px solid ${s.id === sessionId ? 'var(--glass-border-strong)' : 'var(--glass-border)'}`,
                  }}
                >
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>{s.preview}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{formatDate(s.updated_at)}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
