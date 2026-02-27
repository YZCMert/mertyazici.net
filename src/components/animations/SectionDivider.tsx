import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={`w-full py-4 ${className}`}>
      <div className="relative h-px w-full bg-white/[0.06]">
        <div
          className={`absolute top-0 left-0 h-full bg-white/[0.12] ${isInView ? 'draw-line-animation' : 'w-0'}`}
        />
      </div>
    </div>
  )
}
