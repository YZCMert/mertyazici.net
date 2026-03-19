import { lazy, Suspense, useMemo, useState, useEffect, Component, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { pageVariants } from '@/lib/animations'
import { projects } from '@/data/projects'
import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'
import ScrambleText from '@/components/animations/ScrambleText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const WorkScene = lazy(() => import('@/components/three/WorkScene'))

class WorkSceneBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

export default function Work() {
  const { t } = useTranslation()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const sorted = useMemo(
    () => [...projects].sort((a, b) => Number(b.year) - Number(a.year)),
    [],
  )

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen"
    >
      {/* 3D Background — full viewport, desktop only */}
      {isDesktop && (
        <WorkSceneBoundary>
          <Suspense fallback={null}>
            <div className="fixed inset-0 z-0">
              <WorkScene />
            </div>
          </Suspense>
        </WorkSceneBoundary>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 md:px-16 lg:px-24">
        {/* Title */}
        <div className="mb-20 max-w-5xl">
          <h1 className="font-display text-5xl font-normal tracking-wide text-white/95 md:text-7xl lg:text-8xl">
            <TextReveal text={t('work.title')} mode="character" trigger="immediate" delay={0.1} />
          </h1>
        </div>

        {/* Project List */}
        <div className="max-w-5xl">
          <StaggerReveal className="flex flex-col border-t border-white/[0.10]" staggerDelay={0.08}>
            {sorted.map((project, i) => (
              <Link
                key={project.id}
                to={`/calismalar/${project.slug}`}
                className="group block border-b border-white/[0.10] py-8 no-underline transition-all duration-500 hover:bg-white/[0.015] md:py-10"
              >
                {/* Desktop layout */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${project.color} opacity-50 transition-opacity duration-500 group-hover:opacity-100`} />
                    <span className="w-8 shrink-0 font-mono text-xs tabular-nums text-white/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-xl font-medium tracking-wide text-white/90 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white md:text-3xl lg:text-4xl">
                      <ScrambleText text={project.title} />
                    </h2>
                  </div>

                  <div className="flex items-center gap-6 pl-10 md:pl-0">
                    <span className="font-mono text-[10px] font-light tracking-[0.25em] text-white/30 uppercase">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] tabular-nums text-white/20">
                      {project.year}
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xs text-white/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/50"
                    />
                  </div>
                </div>

                {/* Tech tags — always visible on mobile, hover on desktop */}
                <div className="mt-4 flex flex-wrap gap-2 pl-10 opacity-100 md:pl-16 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/[0.10] px-3 py-1 font-mono text-[10px] font-light tracking-[0.15em] text-white/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </motion.div>
  )
}
