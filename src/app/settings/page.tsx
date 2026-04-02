'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null)
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main className="min-h-dvh bg-mesh">
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-up flex items-center gap-4">
          <div className="glass flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl glow-blue" style={{ color: '#0D5EAF' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="3" />
              <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.22 4.22l1.06 1.06M14.72 14.72l1.06 1.06M4.22 15.78l1.06-1.06M14.72 5.28l1.06-1.06" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-blue">Settings</h1>
            <p className="mt-0.5 text-sm greek-text" style={{ color: 'var(--muted-foreground)' }}>
              Ρυθμίσεις — App preferences
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 animate-fade-up delay-100">
          {/* Profile section */}
          {userEmail && (
            <section className="glass rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--glass-border)' }}>
                <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                  Profile
                </h2>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #0D5EAF, #7c3aed)' }}
                  >
                    {userEmail.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{userEmail}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Signed in</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="glass rounded-xl px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: '#ef4444' }}
                >
                  Sign out
                </button>
              </div>
            </section>
          )}

          {/* Appearance */}
          <section className="glass rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                Appearance
              </h2>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="glass flex h-9 w-9 items-center justify-center rounded-xl" style={{ color: 'var(--foreground)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Dark Mode</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Toggle light and dark theme</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </section>

          {/* About */}
          <section className="glass rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                About
              </h2>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold glow-blue"
                  style={{ background: 'rgba(13,94,175,0.12)', color: '#0D5EAF' }}
                >
                  Ω
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Elliniká</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Learn Modern Greek</p>
                </div>
              </div>
              <span className="glass rounded-full text-xs font-medium px-3 py-1" style={{ color: 'var(--muted-foreground)' }}>
                v1.0
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
