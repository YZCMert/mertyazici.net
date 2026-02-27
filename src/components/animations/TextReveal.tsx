import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  text: string
  mode?: 'character' | 'word'
  trigger?: 'inView' | 'immediate'
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function TextReveal({
  text,
  mode = 'character',
  trigger = 'inView',
  delay = 0,
  className = '',
  as: Tag = 'span',
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const parts = mode === 'character' ? text.split('') : text.split(' ')
  const shouldAnimate = trigger === 'immediate' || isInView

  return (
    <Tag ref={ref} className={`inline-block ${className}`}>
      {parts.map((part, i) => (
        <span key={i} className="inline-block overflow-hidden py-[0.15em]">
          <motion.span
            className="inline-block px-[0.02em]"
            initial={{ y: '100%', opacity: 0 }}
            animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * (mode === 'character' ? 0.03 : 0.08),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {part === ' ' ? '\u00A0' : part}
            {mode === 'word' && i < parts.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
