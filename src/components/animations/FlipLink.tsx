import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlipLinkProps {
  children: string
  className?: string
}

export default function FlipLink({ children, className = '' }: FlipLinkProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ perspective: '600px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="inline-block"
        animate={{
          y: hovered ? '-100%' : '0%',
          rotateX: hovered ? 90 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute left-0 top-full inline-block"
        animate={{
          y: hovered ? '-100%' : '0%',
          rotateX: hovered ? 0 : -90,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
