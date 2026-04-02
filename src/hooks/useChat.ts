'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { ChatMessage } from '@/types/chat'

export function useChat(initialSessionId?: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId ?? null)
  const [isSyncing, setIsSyncing] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load the most recent session on first mount (when no session specified)
  useEffect(() => {
    if (initialSessionId !== undefined) return // explicit session passed in — skip auto-load

    async function loadLatest() {
      try {
        const res = await fetch('/api/chat/sessions')
        if (!res.ok) return
        const { sessions } = await res.json()
        if (!sessions?.length) return

        const latest = sessions[0]
        if (latest.messageCount === 0) {
          setSessionId(latest.id)
          return
        }

        // Load messages from the latest session
        const msgRes = await fetch(`/api/chat/sessions/${latest.id}`)
        if (!msgRes.ok) return
        const data = await msgRes.json()
        setSessionId(latest.id)
        setMessages(Array.isArray(data.messages) ? data.messages : [])
      } catch {
        // silently fail — offline or unauthenticated
      }
    }

    loadLatest()
  }, [initialSessionId])

  // Debounced save to Supabase after messages change
  const scheduleSave = useCallback((msgs: ChatMessage[], sid: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(async () => {
      try {
        setIsSyncing(true)
        await fetch(`/api/chat/sessions/${sid}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: msgs }),
        })
      } catch {
        // silently fail
      } finally {
        setIsSyncing(false)
      }
    }, 1000)
  }, [])

  const ensureSession = useCallback(async (): Promise<string | null> => {
    if (sessionId) return sessionId
    try {
      const res = await fetch('/api/chat/sessions', { method: 'POST' })
      if (!res.ok) return null
      const { id } = await res.json()
      setSessionId(id)
      return id
    } catch {
      return null
    }
  }, [sessionId])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const sid = await ensureSession()

    const userMessage: ChatMessage = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    const assistantMessage: ChatMessage = { role: 'assistant', content: '' }
    setMessages([...updatedMessages, assistantMessage])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!res.ok || !res.body) {
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
          return next
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: accumulated }
          return next
        })
      }

      // Save to DB after streaming completes
      const finalMessages = [...updatedMessages, { role: 'assistant' as const, content: accumulated }]
      if (sid) scheduleSave(finalMessages, sid)
    } catch {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }
        return next
      })
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading, ensureSession, scheduleSave])

  const clearMessages = useCallback(async () => {
    setMessages([])
    setSessionId(null)
    // Create a fresh session
    try {
      const res = await fetch('/api/chat/sessions', { method: 'POST' })
      if (res.ok) {
        const { id } = await res.json()
        setSessionId(id)
      }
    } catch {
      // silently fail
    }
  }, [])

  const loadSession = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/chat/sessions/${id}`)
      if (!res.ok) return
      const data = await res.json()
      setSessionId(id)
      setMessages(Array.isArray(data.messages) ? data.messages : [])
    } catch {
      // silently fail
    }
  }, [])

  return { messages, isLoading, isSyncing, sessionId, sendMessage, clearMessages, loadSession }
}
