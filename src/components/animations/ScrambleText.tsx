import { useState, useCallback, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCÇDEFGĞHIIJKLMNOÖPRSŞTUÜVYZ0123456789!@#$%&'

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
  const rafRef = useRef<number | null>(null)
  const lockedRef = useRef<Set<number>>(new Set())
  const spanRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(spanRef, { once: true, margin: '-50px' })
  const hasPlayed = useRef(false)

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
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
    let lastTime = 0

    function tick(time: number) {
      if (!lastTime) lastTime = time
      const elapsed = time - lastTime

      if (elapsed >= scrambleSpeed) {
        lastTime = time
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
          setDisplay(text)
          return
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [text, scrambleSpeed])

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setDisplay(text)
    lockedRef.current = new Set()
  }, [text])

  // InView trigger — auto-scramble when element enters viewport
  useEffect(() => {
    if (isInView && !hasPlayed.current) {
      hasPlayed.current = true
      scramble()
    }
  }, [isInView, scramble])

  return (
    <span
      ref={spanRef}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </span>
  )
}
