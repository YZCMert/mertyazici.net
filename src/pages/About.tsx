import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { pageVariants } from '@/lib/animations'
import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'
import SectionDivider from '@/components/animations/SectionDivider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faBrain, faPenRuler, faServer } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

function CounterAnimation({ value, label }: { value: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="border-b border-white/[0.10] py-6 md:border-b-0 md:border-r md:border-white/[0.10] md:px-8 md:py-0 last:border-0">
      <div ref={ref} className="flex flex-col gap-2">
        <span className="font-mono text-[9px] font-light tracking-[0.4em] text-white/35 uppercase">{label}</span>
        <motion.span
          className="font-display text-3xl font-normal tracking-wide text-white/90"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {value}
        </motion.span>
      </div>
    </div>
  )
}

function ExpertiseCard({ title, desc, icon }: { title: string; desc: string; icon: IconDefinition }) {
  return (
    <motion.div
      className="group px-6 py-10 text-center transition-all duration-500 hover:bg-[#9C9C9C]/[0.05]"
      whileHover={{ y: -2 }}
      transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mb-6 flex h-10 w-10 items-center justify-center"><FontAwesomeIcon icon={icon} className="text-base text-white/40 transition-opacity duration-500 group-hover:text-white/70" /></div>
      <h3 className="mb-3 font-sans text-xs font-medium tracking-[0.2em] uppercase text-white/90">{title}</h3>
      <p className="text-[13px] font-light leading-[1.7] text-white/40">{desc}</p>
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="mx-auto min-h-screen w-full max-w-7xl px-6 pt-32 pb-20 md:px-16 lg:px-24"
    >
      {/* Title */}
      <div className="mx-auto mb-20 max-w-5xl">
        <h1 className="font-display text-5xl font-normal tracking-wide text-white/95 md:text-7xl lg:text-8xl">
          <TextReveal text={t('about.title')} mode="character" trigger="immediate" delay={0.1} />
        </h1>
      </div>

      {/* Bio Section */}
      <div className="mx-auto mb-24 max-w-5xl">
        <p className="font-display text-2xl font-normal leading-[1.4] text-white/70 md:text-3xl lg:text-4xl">
          <TextReveal text={t('about.bio')} mode="word" trigger="inView" className="text-white/70" />
        </p>
        <motion.p
          className="mt-10 max-w-xl text-base font-light leading-[1.8] text-white/50 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t('about.bio2')}
        </motion.p>
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionDivider />
      </div>

      {/* Stats Grid */}
      <div className="mx-auto mb-24 max-w-5xl">
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4" staggerDelay={0.15}>
          <CounterAnimation
            value={t('about.stats.experience')}
            label={t('about.stats.experienceLabel')}
          />
          <CounterAnimation
            value={t('about.stats.projects')}
            label={t('about.stats.projectsLabel')}
          />
          <CounterAnimation
            value={t('about.stats.location')}
            label={t('about.stats.locationLabel')}
          />
          <div className="border-b border-white/[0.10] py-6 md:border-b-0 md:px-8 md:py-0">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] font-light tracking-[0.4em] text-white/35 uppercase">
                {t('about.stats.statusLabel')}
              </span>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/70" />
                <motion.span
                  className="font-display text-3xl font-normal tracking-wide text-white/90"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {t('about.stats.status')}
                </motion.span>
              </div>
            </div>
          </div>
        </StaggerReveal>
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionDivider />
      </div>

      {/* Expertise Areas */}
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 font-mono text-[10px] font-light tracking-[0.5em] text-white/35 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('about.expertise.title')}
        </motion.h2>

        <StaggerReveal className="grid gap-px md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          <ExpertiseCard
            icon={faCode}
            title={t('about.expertise.fullstack.title')}
            desc={t('about.expertise.fullstack.desc')}
          />
          <ExpertiseCard
            icon={faBrain}
            title={t('about.expertise.ai.title')}
            desc={t('about.expertise.ai.desc')}
          />
          <ExpertiseCard
            icon={faPenRuler}
            title={t('about.expertise.uiux.title')}
            desc={t('about.expertise.uiux.desc')}
          />
          <ExpertiseCard
            icon={faServer}
            title={t('about.expertise.devops.title')}
            desc={t('about.expertise.devops.desc')}
          />
        </StaggerReveal>
      </div>
    </motion.div>
  )
}
