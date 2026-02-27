import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface LoadingScreenProps {
  isVisible: boolean
  onComplete: () => void
}

export default function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const { t } = useTranslation()

  const lines = [t('loading.line1'), t('loading.line2'), t('loading.line3')]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
          }}
          onAnimationComplete={(definition) => {
            if (typeof definition === 'object' && 'clipPath' in definition) {
              onComplete()
            }
          }}
        >
          <div className="flex flex-col items-center gap-4">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  className="font-display text-4xl font-normal tracking-wide text-white md:text-6xl lg:text-7xl"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-20 h-[1px] bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 2, ease: 'linear' }}
            onAnimationComplete={() => {
              // Trigger exit after progress completes
            }}
          />

          {/* Auto-dismiss timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2.5 }}
            onAnimationComplete={() => onComplete()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
