'use client'

import { useState, useRef, useCallback } from 'react'

interface Props {
  onSend: (message: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const lineHeight = 24
    const maxHeight = lineHeight * 5
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    resize()
  }

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="flex items-end gap-3 border-t px-4 py-3"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Message Eleni… (Enter to send, Shift+Enter for newline)"
        rows={1}
        className="flex-1 resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 disabled:opacity-50"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)',
          lineHeight: '1.5rem',
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: '#0D5EAF' }}
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  )
}
