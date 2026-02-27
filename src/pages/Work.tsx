import { useMemo } from 'react'
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

export default function Work() {
  const { t } = useTranslation()

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
      className="min-h-screen px-6 pt-32 pb-20 md:px-16 lg:px-32"
    >
      {/* Title */}
      <div className="mx-auto mb-20 max-w-5xl">
        <h1 className="font-display text-5xl font-normal tracking-wide text-white/95 md:text-7xl lg:text-8xl">
          <TextReveal text={t('work.title')} mode="character" trigger="immediate" delay={0.1} />
        </h1>
      </div>

      {/* Project List */}
      <div className="mx-auto max-w-5xl">
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

                <div className="flex items-center gap-6 pl-14 md:pl-0">
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

              {/* Tech tags — visible on hover */}
              <div className="mt-4 flex flex-wrap gap-2 pl-14 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:pl-16">
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
    </motion.div>
  )
}
