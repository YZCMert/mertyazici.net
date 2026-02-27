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

  const selectedProjects = projects.slice(0, 10)

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

        <div className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-5 px-6 md:gap-8">
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
            <motion.h1
              className="hero-name font-hero text-center text-[10vw] font-bold uppercase leading-none tracking-[0.04em] whitespace-nowrap md:text-[8vw] lg:text-[7vw]"
              initial={{ filter: 'blur(12px)', scale: 0.95 }}
              animate={{ filter: 'blur(0px)', scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TextReveal text={t('hero.firstName')} mode="character" trigger="immediate" delay={0.6} />
              <span className="inline-block w-[0.3em]" />
              <TextReveal text={t('hero.lastName')} mode="character" trigger="immediate" delay={0.8} />
            </motion.h1>
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
            <span className="font-mono text-[10px] font-light tracking-[0.2em] text-white/40 uppercase md:tracking-[0.4em]">
              {t('hero.location')}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
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
      <section className="px-4 py-40 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl text-center">
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

      <div className="mx-auto max-w-6xl px-4 md:px-10 lg:px-20">
        <SectionDivider />
      </div>

      {/* ===== SECTION 2: EXPERTISE ===== */}
      <section className="px-4 py-40 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[13px] font-light tracking-[0.5em] text-white/35 uppercase">
              {t('home.expertise.title')}
            </span>
          </motion.div>

          <StaggerReveal className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
            {expertiseData.map(({ key, icon }) => (
              <motion.div
                key={key}
                className="group flex flex-col items-center px-6 py-16 text-center transition-all duration-500 hover:bg-[#9C9C9C]/[0.05]"
                whileHover={{ y: -2 }}
                transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              >
                <div className="mb-10 flex h-14 w-14 items-center justify-center transition-colors duration-500">
                  <FontAwesomeIcon icon={icon} className="text-lg text-white/40 transition-colors duration-500 group-hover:text-white/60" />
                </div>
                <h4 className="mb-5 font-sans text-sm font-medium tracking-[0.2em] uppercase text-white/90">
                  {t(`home.expertise.${key}.title`)}
                </h4>
                <p className="text-[15px] font-light leading-[1.7] text-white/40">
                  {t(`home.expertise.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/hizmetler"
              className="group inline-flex items-center gap-4 font-mono text-[13px] font-light tracking-[0.3em] text-white/40 uppercase no-underline transition-colors duration-500 hover:text-white/70"
            >
              <ScrambleText text={t('home.expertise.allServices')} />
              <FontAwesomeIcon icon={faArrowRight} className="text-[13px] transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-10 lg:px-20">
        <SectionDivider />
      </div>

      {/* ===== SECTION 3: SELECTED WORK ===== */}
      <section className="px-4 py-40 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[13px] font-light tracking-[0.5em] text-white/35 uppercase">
              {t('home.selectedWork')}
            </span>
          </motion.div>

          <StaggerReveal className="flex flex-col" staggerDelay={0.08}>
            {selectedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/calismalar/${project.slug}`}
                className="group flex items-center justify-between py-4 no-underline transition-colors duration-300"
              >
                <span className="w-1/3 font-mono text-base uppercase tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white">
                  <ScrambleText text={project.title} />
                </span>
                <span className="hidden flex-1 font-mono text-[13px] uppercase tracking-[0.2em] text-[#9C9C9C] md:block">
                  {project.category}
                </span>
                <span className="shrink-0 text-right font-mono text-[13px] uppercase tracking-[0.15em] text-[#9C9C9C]">
                  {project.technologies.join(', ')}
                </span>
              </Link>
            ))}
          </StaggerReveal>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/calismalar"
              className="group inline-flex items-center gap-4 font-mono text-[13px] font-light tracking-[0.3em] text-white/40 uppercase no-underline transition-colors duration-500 hover:text-white/70"
            >
              <ScrambleText text={t('home.allWork')} />
              <FontAwesomeIcon icon={faArrowRight} className="text-[13px] transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-10 lg:px-20">
        <SectionDivider />
      </div>

      {/* ===== SECTION 4: CTA ===== */}
      <section className="px-4 py-48 md:px-10 lg:px-20">
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
