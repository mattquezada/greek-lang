'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.045 9.519c-.02-2.063 1.682-3.061 1.759-3.109--.959-1.4-2.452-1.591-2.984-1.61-1.268-.13-2.481.748-3.124.748-.643 0-1.633-.731-2.688-.71-1.378.02-2.656.802-3.364 2.037-1.433 2.489-.368 6.181 1.03 8.2.683.985 1.495 2.093 2.563 2.053 1.031-.04 1.421-.664 2.67-.664 1.248 0 1.6.664 2.693.643 1.11-.02 1.808-.998 2.485-1.987.784-1.138 1.106-2.24 1.124-2.297-.024-.011-2.152-.826-2.164-3.304zM11.88 3.16c.567-.688.95-1.645.846-2.597-.818.033-1.808.546-2.393 1.233-.525.607-.985 1.579-.862 2.51.913.07 1.843-.464 2.41-1.146z"/>
    </svg>
  )
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setIsLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({ email, password })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setError(null)
    setOauthLoading(provider)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (authError) {
      setError(authError.message)
      setOauthLoading(null)
    }
  }

  if (success) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-4"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div
          className="w-full max-w-sm rounded-2xl border p-8 text-center"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div className="mb-4 text-4xl">📬</div>
          <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--foreground)' }}>
            Check your email!
          </h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            We sent a confirmation link to{' '}
            <strong style={{ color: 'var(--foreground)' }}>{email}</strong>. Click the link to activate
            your account.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 block text-sm font-medium underline"
            style={{ color: '#0D5EAF' }}
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
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
          <span className="text-4xl font-bold" style={{ color: '#0D5EAF' }}>Ω</span>
          <h1 className="mt-2 text-xl font-bold" style={{ color: 'var(--foreground)' }}>
            Create your account
          </h1>
        </div>

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3 mb-5">
          <button
            onClick={() => handleOAuth('google')}
            disabled={!!oauthLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
          >
            <GoogleIcon />
            {oauthLoading === 'google' ? 'Redirecting…' : 'Continue with Google'}
          </button>
          <button
            onClick={() => handleOAuth('apple')}
            disabled={!!oauthLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
          >
            <AppleIcon />
            {oauthLoading === 'apple' ? 'Redirecting…' : 'Continue with Apple'}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-5 flex items-center">
          <div className="flex-1 border-t" style={{ borderColor: 'var(--border)' }} />
          <span className="mx-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>or</span>
          <div className="flex-1 border-t" style={{ borderColor: 'var(--border)' }} />
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
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
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
              autoComplete="new-password"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
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
            disabled={isLoading || !!oauthLoading}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#0D5EAF' }}
          >
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium underline" style={{ color: '#0D5EAF' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
