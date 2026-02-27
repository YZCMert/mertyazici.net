import { useState, useCallback, useRef } from 'react'

const CHARS = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ0123456789!@#$%&'

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
}

export default function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 50,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lockedRef = useRef<Set<number>>(new Set())

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    lockedRef.current = new Set()

    // Collect all non-space indices
    const indices = text.split('').reduce<number[]>((acc, char, i) => {
      if (char !== ' ') acc.push(i)
      return acc
    }, [])

    // Shuffle indices for random lock order
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }

    let lockIndex = 0

    intervalRef.current = setInterval(() => {
      const locked = lockedRef.current

      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (locked.has(i)) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplay(next)

      // Lock next random character
      if (lockIndex < indices.length) {
        locked.add(indices[lockIndex])
        lockIndex++
      }

      if (lockIndex >= indices.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplay(text)
      }
    }, scrambleSpeed)
  }, [text, scrambleSpeed])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplay(text)
    lockedRef.current = new Set()
  }, [text])

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </span>
  )
}
