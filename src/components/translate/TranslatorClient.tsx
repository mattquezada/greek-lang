'use client'

import { useState } from 'react'

type Direction = 'el-to-en' | 'en-to-el'

export default function TranslatorClient() {
  const [direction, setDirection] = useState<Direction>('el-to-en')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const srcLabel = direction === 'el-to-en' ? 'Greek' : 'English'
  const dstLabel = direction === 'el-to-en' ? 'English' : 'Greek'

  const handleSwap = () => {
    setDirection((d) => (d === 'el-to-en' ? 'en-to-el' : 'el-to-en'))
    setInput(output)
    setOutput(input)
    setError('')
  }

  const handleTranslate = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    setOutput('')
    setError('')
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, direction }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Translation failed')
      setOutput(data.translation)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Translation failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Direction toggle */}
      <div className="flex items-center gap-3">
        <span
          className="rounded-full px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: '#0D5EAF', color: '#fff' }}
        >
          {srcLabel}
        </span>
        <button
          onClick={handleSwap}
          title="Swap languages"
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:shadow-md"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        >
          ⇄
        </button>
        <span
          className="rounded-full px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
        >
          {dstLabel}
        </span>
      </div>

      {/* Text areas */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
            {srcLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleTranslate()
            }}
            placeholder={direction === 'el-to-en' ? 'Πληκτρολογήστε ελληνικό κείμενο…' : 'Type English text…'}
            rows={8}
            className={`w-full resize-none rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 ${direction === 'el-to-en' ? 'greek-text' : ''}`}
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
            {dstLabel}
          </label>
          <div
            className={`relative w-full rounded-xl border px-4 py-3 text-base min-h-[13rem] ${direction === 'en-to-el' ? 'greek-text' : ''}`}
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              color: output ? 'var(--foreground)' : 'var(--muted-foreground)',
            }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2" style={{ borderColor: '#0D5EAF', borderTopColor: 'transparent' }} />
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Translating…</span>
              </div>
            ) : error ? (
              <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
            ) : output ? (
              <p className="whitespace-pre-wrap">{output}</p>
            ) : (
              <p className="text-sm italic">Translation will appear here…</p>
            )}
          </div>
        </div>
      </div>

      {/* Translate button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleTranslate}
          disabled={!input.trim() || isLoading}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#0D5EAF' }}
        >
          {isLoading ? 'Translating…' : 'Translate'}
        </button>
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          or press ⌘Enter
        </span>
        {output && !isLoading && (
          <button
            onClick={() => { setInput(''); setOutput(''); setError('') }}
            className="ml-auto text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
