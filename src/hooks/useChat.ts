'use client'

import { useState, useCallback } from 'react'
import type { ChatMessage } from '@/types/chat'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setIsLoading(true)

    // Add empty assistant message placeholder
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
          next[next.length - 1] = {
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
          }
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
        const chunk = decoder.decode(value, { stream: true })
        accumulated += chunk
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: accumulated }
          return next
        })
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        }
        return next
      })
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return { messages, isLoading, sendMessage, clearMessages }
}
