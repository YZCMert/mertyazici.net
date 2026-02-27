import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { pageVariants } from '@/lib/animations'
import MarqueeText from '@/components/animations/MarqueeText'
import TextReveal from '@/components/animations/TextReveal'
import RotatingText3D from '@/components/animations/RotatingText3D'
import SectionDivider from '@/components/animations/SectionDivider'
import StaggerReveal from '@/components/animations/StaggerReveal'
import MagneticButton from '@/components/animations/MagneticButton'
import ScrambleText from '@/components/animations/ScrambleText'
import { projects } from '@/data/projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faBrain, faPenRuler, faServer, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

const expertiseData = [
  { key: 'fullstack', icon: faCode },
  { key: 'ai', icon: faBrain },
  { key: 'uiux', icon: faPenRuler },
  { key: 'devops', icon: faServer },
] as const

export default function Home() {
  const { t } = useTranslation()
  const [isDesktop, setIsDesktop] = useState(false)

  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).slice(-2)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const selectedProjects = projects.slice(0, 3)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        {isDesktop && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}

        <div className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-8 px-6">
          <motion.div
            className="flex items-center gap-3 font-mono text-[10px] font-light tracking-[0.5em] text-white/40 uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span>{month}-{year}</span>
            <span className="h-px w-8 bg-white/30" />
            <span>PORTFOLIO</span>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <MarqueeText
              text={t('hero.marquee1')}
              direction="left"
              speed={35}
              className="font-sans text-xs font-light tracking-[0.35em] text-white/[0.15] uppercase md:text-sm"
            />
          </motion.div>

          <div className="relative my-6">
            <h1 className="font-display text-center text-7xl font-normal tracking-[0.02em] md:text-9xl lg:text-[11rem]">
              <TextReveal text={t('hero.firstName')} mode="character" trigger="immediate" delay={0.6} />
              <span className="inline-block w-[0.3em]" />
              <TextReveal text={t('hero.lastName')} mode="character" trigger="immediate" delay={0.8} />
            </h1>
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-15">
              <RotatingText3D texts={['DEVELOPER', 'ENGINEER', 'CREATOR']} className="w-full" />
            </div>
          </div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <MarqueeText
              text={t('hero.marquee2')}
              direction="right"
              speed={35}
              className="font-sans text-xs font-light tracking-[0.35em] text-white/[0.15] uppercase md:text-sm"
            />
          </motion.div>

          <motion.p
            className="mt-6 text-center font-sans text-sm font-light tracking-[0.15em] text-white/50 md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="mt-4 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
              <circle cx="12" cy="12" r="10" />
              <ellipse cx="12" cy="12" rx="4" ry="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span className="font-mono text-[10px] font-light tracking-[0.4em] text-white/40 uppercase">
              {t('hero.location')}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="font-mono text-[9px] font-light tracking-[0.5em] text-white/30 uppercase">
            {t('hero.scroll')}
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/25">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SECTION 1: INTRO ===== */}
      <section className="px-6 py-40 md:px-16 lg:px-32">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            className="mb-12 font-display text-4xl leading-[1.15] text-white/90 md:text-5xl lg:text-6xl"
          >
            <TextReveal text={t('home.intro')} mode="word" trigger="inView" delay={0} />
          </h2>
          <motion.p
            className="mx-auto max-w-xl text-base font-light leading-[1.8] text-white/50 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('home.introDesc')}
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-32">
        <SectionDivider />
      </div>

      {/* ===== SECTION 2: EXPERTISE ===== */}
      <section className="bg-white/[0.02] px-6 py-40 md:px-16 lg:px-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[10px] font-light tracking-[0.5em] text-white/35 uppercase">
              {t('home.expertise.title')}
            </span>
          </motion.div>

          <StaggerReveal className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
            {expertiseData.map(({ key, icon }) => (
              <motion.div
                key={key}
                className="group flex flex-col items-center px-8 py-14 text-center transition-all duration-500 hover:bg-white/[0.02]"
                whileHover={{ y: -2 }}
                transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center transition-colors duration-500">
                  <FontAwesomeIcon icon={icon} className="text-base text-white/40 transition-colors duration-500 group-hover:text-white/60" />
                </div>
                <h4 className="mb-4 font-sans text-xs font-medium tracking-[0.2em] uppercase text-white/90">
                  {t(`home.expertise.${key}.title`)}
                </h4>
                <p className="text-[13px] font-light leading-[1.7] text-white/40">
                  {t(`home.expertise.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>

          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/hizmetler"
              className="group inline-flex items-center gap-4 font-mono text-[10px] font-light tracking-[0.3em] text-white/40 uppercase no-underline transition-colors duration-500 hover:text-white/70"
            >
              <ScrambleText text={t('home.expertise.allServices')} />
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-32">
        <SectionDivider />
      </div>

      {/* ===== SECTION 3: SELECTED WORK ===== */}
      <section className="px-6 py-40 md:px-16 lg:px-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[10px] font-light tracking-[0.5em] text-white/35 uppercase">
              {t('home.selectedWork')}
            </span>
          </motion.div>

          <StaggerReveal className="flex flex-col border-t border-white/[0.10]" staggerDelay={0.12}>
            {selectedProjects.map((project, i) => (
              <Link
                key={project.id}
                to={`/calismalar/${project.slug}`}
                className="group flex items-center border-b border-white/[0.10] py-8 no-underline transition-all duration-500 md:py-10"
              >
                {/* Color bar */}
                <div className={`mr-6 hidden h-14 w-1 rounded-full bg-gradient-to-b ${project.color} opacity-40 transition-opacity duration-500 group-hover:opacity-90 md:block`} />

                {/* Number */}
                <span className="mr-6 w-8 shrink-0 font-mono text-xs tabular-nums text-white/20 md:mr-4">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <h4 className="flex-1 text-xl font-medium tracking-wide text-white/90 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white md:text-3xl lg:text-4xl">
                  <ScrambleText text={project.title} />
                </h4>

                {/* Category + Year */}
                <div className="hidden items-center gap-8 md:flex">
                  <span className="font-mono text-[10px] font-light tracking-[0.25em] text-white/30 uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-white/20">
                    {project.year}
                  </span>
                </div>

                {/* Arrow */}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-8 text-xs text-white/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/50"
                />
              </Link>
            ))}
          </StaggerReveal>

          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/calismalar"
              className="group inline-flex items-center gap-4 font-mono text-[10px] font-light tracking-[0.3em] text-white/40 uppercase no-underline transition-colors duration-500 hover:text-white/70"
            >
              <ScrambleText text={t('home.allWork')} />
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-32">
        <SectionDivider />
      </div>

      {/* ===== SECTION 4: CTA ===== */}
      <section className="bg-white/[0.02] px-6 py-48 md:px-16 lg:px-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.h2
            className="mb-16 font-display text-4xl font-normal leading-[1.1] text-white/95 md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('home.ctaHeading')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/iletisim">
              <MagneticButton className="border border-white/20 bg-transparent px-14 py-5 font-mono text-[10px] font-medium tracking-[0.4em] text-white/80 uppercase transition-all duration-700 hover:border-white/60 hover:text-white">
                {t('home.ctaButton')}
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            className="mt-14 flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/70" />
            <span className="font-mono text-[9px] font-light tracking-[0.4em] text-white/35 uppercase">
              {t('home.ctaAvailable')}
            </span>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
