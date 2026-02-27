import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ParallaxSectionProps {
  speed?: number
  children: ReactNode
  className?: string
}

export default function ParallaxSection({
  speed = 0.3,
  children,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
