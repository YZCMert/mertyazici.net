import { motion } from 'framer-motion'

interface ArrowIconProps {
  className?: string
}

export default function ArrowIcon({ className = '' }: ArrowIconProps) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </motion.span>
  )
}
