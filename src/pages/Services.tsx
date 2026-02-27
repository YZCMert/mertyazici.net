import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { pageVariants } from '@/lib/animations'
import TextReveal from '@/components/animations/TextReveal'
import MarqueeText from '@/components/animations/MarqueeText'
import MagneticButton from '@/components/animations/MagneticButton'
import StaggerReveal from '@/components/animations/StaggerReveal'
import SectionDivider from '@/components/animations/SectionDivider'

const serviceKeys = ['fullstack', 'ai', 'uiux', 'devops'] as const

function ServiceItem({ serviceKey, isOpen, onToggle }: {
  serviceKey: string
  isOpen: boolean
  onToggle: () => void
}) {
  const { t } = useTranslation()
  const num = t(`services.items.${serviceKey}.num`)
  const title = t(`services.items.${serviceKey}.title`)
  const desc = t(`services.items.${serviceKey}.desc`)
  const tags = t(`services.items.${serviceKey}.tags`, { returnObjects: true }) as string[]

  return (
    <div
      className="group cursor-pointer border-b border-white/[0.10] py-10 transition-colors duration-500 hover:border-white/[0.12]"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-[10px] tabular-nums text-white/20">{num}</span>
          <h2 className="text-xl font-medium tracking-wide text-white/90 md:text-3xl lg:text-4xl">{title}</h2>
        </div>
        <motion.span
          className="text-lg text-white/20"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4 }}
        >
          +
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-6 max-w-2xl pl-12 text-[13px] font-light leading-[1.7] text-white/45 md:pl-16">
              {desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 pl-12 md:pl-16">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/[0.10] px-3 py-1 font-mono text-[10px] font-light tracking-[0.15em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen px-6 pt-32 pb-20 md:px-16 lg:px-32"
    >
      {/* Title */}
      <div className="mx-auto mb-20 max-w-5xl">
        <h1 className="font-display text-5xl font-normal tracking-wide text-white/95 md:text-7xl lg:text-8xl">
          <TextReveal text={t('services.title')} mode="character" trigger="immediate" delay={0.1} />
        </h1>
      </div>

      {/* Service List */}
      <div className="mx-auto max-w-5xl">
        <StaggerReveal className="mb-20 border-t border-white/[0.10]">
          {serviceKeys.map((key, i) => (
            <ServiceItem
              key={key}
              serviceKey={key}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </StaggerReveal>

        <SectionDivider />

        {/* Tech Stack Marquee */}
        <div className="mb-20 py-8">
          <MarqueeText
            text={t('services.techMarquee')}
            direction="left"
            speed={20}
            className="font-sans text-xl font-light tracking-[0.2em] text-white/[0.12] uppercase md:text-3xl"
          />
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/iletisim">
            <MagneticButton className="border border-white/20 bg-transparent px-14 py-5 font-mono text-[10px] font-medium tracking-[0.4em] text-white/80 uppercase transition-all duration-700 hover:border-white/60 hover:text-white">
              {t('services.cta')}
            </MagneticButton>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
