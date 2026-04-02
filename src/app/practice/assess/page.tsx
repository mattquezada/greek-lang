import LevelAssessmentClient from '@/components/practice/LevelAssessmentClient'

export default function AssessPage() {
  return (
    <main className="min-h-dvh bg-mesh pb-20">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-12">
        <div className="mb-8 text-center animate-fade-up">
          <div
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 24px rgba(124,58,237,0.35)' }}
          >
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
            Level Assessment
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Find your CEFR level and get personalised practice recommendations
          </p>
        </div>

        <LevelAssessmentClient />
      </div>
    </main>
  )
}
