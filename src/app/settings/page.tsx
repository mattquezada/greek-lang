'use client'

import ThemeToggle from '@/components/layout/ThemeToggle'

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
          Settings
        </h1>
        <p className="mt-1 text-base" style={{ color: 'var(--muted-foreground)' }}>
          Ρυθμίσεις — App preferences
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Appearance */}
        <section
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div
            className="px-5 py-3 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              Appearance
            </h2>
          </div>

          {/* Dark mode row */}
          <div
            className="flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
        <section
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div
            className="px-5 py-3 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              About
            </h2>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold"
                style={{ backgroundColor: 'rgba(13,94,175,0.1)', color: '#0D5EAF' }}
              >
                Ω
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Elliniká</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Learn Modern Greek</p>
              </div>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
              v1.0
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}
