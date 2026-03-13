'use client'

import ThemeToggle from '@/components/layout/ThemeToggle'

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Settings
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Ρυθμίσεις — App preferences
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Appearance */}
        <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Appearance</h2>
          <div className="flex items-center justify-between rounded-xl border px-5 py-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
            <div>
              <p className="font-medium" style={{ color: 'var(--foreground)' }}>Theme</p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Toggle between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </section>
      </div>
    </main>
  )
}
