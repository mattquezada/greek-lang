export const metadata = {
  title: 'Greek Translator | Elliniká',
  description: 'Translate between Greek and English',
}

import TranslatorClient from '@/components/translate/TranslatorClient'

export default function TranslatePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Translator
        </h1>
        <p className="mt-1 text-lg" style={{ color: 'var(--muted-foreground)' }}>
          Μεταφραστής — Greek ↔ English
        </p>
      </div>
      <TranslatorClient />
    </main>
  )
}
