import FillBlank from '@/components/practice/FillBlank'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Fill in the Blank | Elliniká' }

export default function FillPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-10 min-h-dvh bg-mesh">
      <div className="mb-6">
        <a href="/practice" className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--muted-foreground)' }}>
          ← Practice
        </a>
      </div>
      <FillBlank />
    </main>
  )
}
