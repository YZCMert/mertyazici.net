import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
