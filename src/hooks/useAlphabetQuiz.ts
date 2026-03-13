'use client'

import { useState, useCallback, useMemo } from 'react'
import type { AlphabetLetter } from '@/types/alphabet'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useAlphabetQuiz(letters: AlphabetLetter[]) {
  const [shuffled, setShuffled] = useState<AlphabetLetter[]>(() => shuffle(letters))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const total = shuffled.length
  const currentLetter = shuffled[currentIndex] ?? null
  const isFinished = currentIndex >= total

  const checkAnswer = useCallback(
    (answer: string) => {
      if (!currentLetter || isAnswered) return
      const trimmed = answer.trim().toLowerCase()
      const correct = currentLetter.letter_name.toLowerCase()
      const right = trimmed === correct
      setUserAnswer(answer)
      setIsAnswered(true)
      setIsCorrect(right)
      if (right) setScore((s) => s + 1)
    },
    [currentLetter, isAnswered]
  )

  const nextLetter = useCallback(() => {
    setCurrentIndex((i) => i + 1)
    setIsAnswered(false)
    setUserAnswer('')
    setIsCorrect(null)
  }, [])

  const restart = useCallback(() => {
    setShuffled(shuffle(letters))
    setCurrentIndex(0)
    setScore(0)
    setIsAnswered(false)
    setUserAnswer('')
    setIsCorrect(null)
  }, [letters])

  const progress = total > 0 ? (currentIndex / total) * 100 : 0

  return {
    currentLetter,
    currentIndex,
    score,
    total,
    isAnswered,
    userAnswer,
    isCorrect,
    isFinished,
    progress,
    checkAnswer,
    nextLetter,
    restart,
  }
}
