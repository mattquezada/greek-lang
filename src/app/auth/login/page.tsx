'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {/* Logo */}
        <div className="mb-6 text-center">
          <span className="text-4xl font-bold" style={{ color: '#0D5EAF' }}>
            Ω
          </span>
          <h1 className="mt-2 text-xl font-bold" style={{ color: 'var(--foreground)' }}>
            Sign in to Elliniká
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          {error && (
            <div
              className="rounded-lg px-4 py-3 text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-medium underline" style={{ color: '#0D5EAF' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
