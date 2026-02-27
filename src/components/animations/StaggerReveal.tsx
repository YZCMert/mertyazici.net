import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode, Children } from 'react'

interface StaggerRevealProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export default function StaggerReveal({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
