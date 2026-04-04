'use client'

import { useState, useEffect } from 'react'

interface WordCard {
  greek: string
  english: string
  type: 'verb' | 'noun' | 'adjective'
}

interface Props {
  words: WordCard[]
}

type Direction = 'greek-to-english' | 'english-to-greek'

interface Challenge {
  word: WordCard
  choices: string[]
  correctIndex: number
  direction: Direction
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildChallenge(words: WordCard[], direction: Direction): Challenge | null {
  if (words.length < 4) return null
  const shuffled = shuffle(words)
  const word = shuffled[0]
  const pool = shuffled.slice(1, 4)
  const isGTE = direction === 'greek-to-english'
  const correct = isGTE ? word.english : word.greek
  const wrongs = pool.map((w) => isGTE ? w.english : w.greek)
  const choices = shuffle([correct, ...wrongs])
  return { word, choices, correctIndex: choices.indexOf(correct), direction }
}

const TYPE_COLORS: Record<string, string> = {
  verb: '#0D5EAF',
  noun: '#7c3aed',
  adjective: '#059669',
}

export default function VocabQuiz({ words }: Props) {
  const [started, setStarted] = useState(false)
  const [direction, setDirection] = useState<Direction>('greek-to-english')
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0 })

  const nextChallenge = (dir = direction) => {
    setChallenge(buildChallenge(words, dir))
    setSelected(null)
  }

  useEffect(() => { if (started) nextChallenge() }, [started]) // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (i: number) => {
    if (selected !== null || !challenge) return
    setSelected(i)
    const correct = i === challenge.correctIndex
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
      streak: correct ? s.streak + 1 : 0,
    }))
  }

  const switchDirection = (dir: Direction) => {
    setDirection(dir)
    setSelected(null)
    setChallenge(buildChallenge(words, dir))
  }

  if (!started) {
    return (
      <div className="glass rounded-3xl p-10 flex flex-col items-center gap-6 text-center card-3d perspective">
        <div className="text-6xl animate-float-medium">📖</div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gradient-blue">Vocabulary Quiz</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {words.length} words · multiple choice
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Greek → English or English → Greek. Switch anytime.
          </p>
        </div>
        {/* Direction selector */}
        <div className="flex gap-2">
          {(['greek-to-english', 'english-to-greek'] as Direction[]).map((dir) => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
              style={
                direction === dir
                  ? { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff' }
                  : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--muted-foreground)' }
              }
            >
              {dir === 'greek-to-english' ? 'Greek → English' : 'English → Greek'}
            </button>
          ))}
        </div>
        <button
          onClick={() => setStarted(true)}
          className="rounded-2xl px-10 py-3.5 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
        >
          Start Quiz
        </button>
      </div>
    )
  }

  if (!challenge) {
    return (
      <p className="text-center py-10" style={{ color: 'var(--muted-foreground)' }}>
        Not enough words loaded (need at least 4).
      </p>
    )
  }

  const answered = selected !== null
  const accent = TYPE_COLORS[challenge.word.type] ?? '#0D5EAF'
  const prompt = challenge.direction === 'greek-to-english' ? challenge.word.greek : challenge.word.english

  return (
    <div className="flex flex-col gap-4">
      {/* Score + direction toggle */}
      <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-4 text-sm">
          <span className="font-semibold" style={{ color: '#10b981' }}>{score.correct} correct</span>
          <span style={{ color: 'var(--muted-foreground)' }}>{score.total - score.correct} missed</span>
          {score.streak >= 2 && <span className="font-bold text-gradient-gold">🔥 {score.streak}</span>}
        </div>
        <div className="flex gap-1">
          {(['greek-to-english', 'english-to-greek'] as Direction[]).map((dir) => (
            <button
              key={dir}
              onClick={() => switchDirection(dir)}
              className="rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
              style={
                direction === dir
                  ? { background: '#0D5EAF', color: '#fff' }
                  : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--muted-foreground)' }
              }
            >
              {dir === 'greek-to-english' ? 'GR→EN' : 'EN→GR'}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge card */}
      <div className="glass rounded-3xl p-6 animate-fade-up">
        {/* Type badge */}
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white mb-3 capitalize"
          style={{ background: accent }}
        >
          {challenge.word.type}
        </span>

        {/* Prompt word */}
        <p
          className={`text-3xl font-bold mb-6 ${challenge.direction === 'greek-to-english' ? 'greek-text' : ''}`}
          style={{ color: accent }}
        >
          {prompt}
        </p>

        <p className="text-sm font-medium mb-3" style={{ color: 'var(--muted-foreground)' }}>
          {challenge.direction === 'greek-to-english' ? 'What does this mean in English?' : 'Which is the correct Greek word?'}
        </p>

        {/* Choices */}
        <div className="flex flex-col gap-2">
          {challenge.choices.map((choice, i) => {
            const isCorrectChoice = i === challenge.correctIndex
            const isSelected = i === selected
            let border = 'var(--glass-border)'
            let bg = 'var(--glass-bg)'
            let color = 'var(--foreground)'

            if (answered) {
              if (isCorrectChoice) { border = 'rgba(16,185,129,0.5)'; bg = 'rgba(16,185,129,0.08)'; color = '#10b981' }
              else if (isSelected) { border = 'rgba(239,68,68,0.4)'; bg = 'rgba(239,68,68,0.06)'; color = '#ef4444' }
            }

            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={answered}
                className={`rounded-2xl px-4 py-3 text-left text-sm transition-all ${challenge.direction === 'english-to-greek' ? 'greek-text' : ''}`}
                style={{ background: bg, border: `1px solid ${border}`, color, backdropFilter: 'blur(8px)' }}
              >
                <span className="font-semibold mr-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {choice}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="mt-4 flex flex-col gap-3">
            <div
              className="glass-strong rounded-2xl px-4 py-2.5 text-sm"
              style={{ border: `1px solid ${selected === challenge.correctIndex ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` }}
            >
              <span style={{ color: 'var(--muted-foreground)' }}>
                {challenge.direction === 'greek-to-english' ? 'Greek: ' : 'English: '}
              </span>
              <span className={`font-semibold ${challenge.direction === 'english-to-greek' ? '' : 'greek-text'}`} style={{ color: accent }}>
                {challenge.direction === 'greek-to-english' ? challenge.word.greek : challenge.word.english}
              </span>
              <span className="mx-2" style={{ color: 'var(--muted-foreground)' }}>·</span>
              <span style={{ color: 'var(--muted-foreground)' }}>
                {challenge.direction === 'greek-to-english' ? 'English: ' : 'Greek: '}
              </span>
              <span className={`font-semibold ${challenge.direction === 'english-to-greek' ? 'greek-text' : ''}`} style={{ color: accent }}>
                {challenge.direction === 'greek-to-english' ? challenge.word.english : challenge.word.greek}
              </span>
            </div>
            <button
              onClick={() => nextChallenge()}
              className="w-full rounded-2xl py-3 text-sm font-semibold text-white glow-blue transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
