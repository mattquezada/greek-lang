'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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


export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

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
    router.push('/dashboard')
  }

  const handleGoogleAuth = async () => {
    setError(null)
    setOauthLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (authError) {
      setError(authError.message)
      setOauthLoading(false)
    }
  }

  return (
    <div className="-mt-24 min-h-dvh bg-mesh-dark overflow-hidden relative flex items-center justify-center px-4 py-20">

      {/* Floating Greek letters */}
      <span className="greek-float animate-float-slow text-[6rem]" style={{ top: '10%', left: '5%' }}>Α</span>
      <span className="greek-float animate-float-medium text-[5rem] delay-200" style={{ top: '20%', right: '6%' }}>Ω</span>
      <span className="greek-float animate-float-slow text-[4rem] delay-400" style={{ bottom: '20%', left: '8%' }}>Λ</span>
      <span className="greek-float animate-float-medium text-[5rem] delay-100" style={{ bottom: '15%', right: '5%' }}>Σ</span>

      <div className="w-full max-w-sm relative z-10 perspective animate-fade-up">
        <div className="glass-strong rounded-3xl p-8 card-3d">
          {/* Logo */}
          <div className="mb-6 text-center">
            <span className="text-5xl font-bold animate-glow-pulse text-gradient-blue">Ω</span>
            <h1 className="mt-2 text-xl font-bold" style={{ color: 'var(--foreground)' }}>
              Sign in to Elliniká
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>Welcome back</p>
          </div>

          {/* OAuth */}
          <div className="mb-5">
            <button
              onClick={handleGoogleAuth}
              disabled={oauthLoading}
              className="glass flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ color: 'var(--foreground)' }}
            >
              <GoogleIcon />
              {oauthLoading ? 'Redirecting…' : 'Continue with Google'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-5 flex items-center">
            <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }} />
            <span className="mx-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input-glass w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="input-glass w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || oauthLoading}
              className="w-full rounded-xl py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
            No account?{' '}
            <Link href="/auth/signup" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: '#0D5EAF' }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
