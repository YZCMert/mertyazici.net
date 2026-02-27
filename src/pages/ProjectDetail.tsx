import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { pageVariants } from '@/lib/animations'
import { projects } from '@/data/projects'
import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'
import ScrambleText from '@/components/animations/ScrambleText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const projectIndex = useMemo(
    () => projects.findIndex((p) => p.slug === slug),
    [slug],
  )

  if (projectIndex === -1) return <Navigate to="/" replace />

  const project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  const description = isEn ? project.descriptionEn : project.description
  const purpose = isEn ? project.purposeEn : project.purpose

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero */}
      <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <motion.div
          className="absolute inset-0 opacity-50"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={`h-full w-full bg-gradient-to-br ${project.color}`} />
        </motion.div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)',
          }}
        />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
          <motion.span
            className="mb-8 font-mono text-[10px] font-light tracking-[0.5em] text-white/40 uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {project.category} &mdash; {project.year}
          </motion.span>

          <h1 className="mb-10 font-display text-5xl font-normal tracking-wide text-white/95 md:text-7xl lg:text-8xl">
            <TextReveal
              text={project.title}
              mode="character"
              trigger="immediate"
              delay={0.3}
            />
          </h1>

          <StaggerReveal
            className="flex flex-wrap justify-center gap-3"
            staggerDelay={0.05}
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="border border-white/[0.12] px-4 py-1.5 font-mono text-[10px] font-light tracking-[0.2em] text-white/50"
              >
                {tech}
              </span>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-7xl px-6 py-32 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          {/* About */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-10 font-mono text-[10px] font-light tracking-[0.5em] text-white/35 uppercase">
              {t('projectDetail.about')}
            </h3>
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h4 className="mb-5 font-mono text-[10px] font-light tracking-[0.3em] text-white/35 uppercase">
                  {t('projectDetail.description')}
                </h4>
                <p className="text-base font-light leading-[1.8] text-white/50 md:text-lg">
                  {description}
                </p>
              </div>
              <div>
                <h4 className="mb-5 font-mono text-[10px] font-light tracking-[0.3em] text-white/35 uppercase">
                  {t('projectDetail.purpose')}
                </h4>
                <p className="text-base font-light leading-[1.8] text-white/50 md:text-lg">
                  {purpose}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Technical Details */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-10 font-mono text-[10px] font-light tracking-[0.5em] text-white/35 uppercase">
              {t('projectDetail.technical')}
            </h3>

            <div className="grid gap-16 lg:grid-cols-2">
              {/* Architecture */}
              <div>
                <h4 className="mb-8 font-mono text-[10px] font-light tracking-[0.3em] text-white/35 uppercase">
                  {t('projectDetail.architecture')}
                </h4>
                <ul className="flex flex-col gap-5">
                  {project.architecture.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-5"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <span className="mt-0.5 font-mono text-[10px] tabular-nums text-white/20">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-light leading-[1.7] text-white/45">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies Grid */}
              <div>
                <h4 className="mb-8 font-mono text-[10px] font-light tracking-[0.3em] text-white/35 uppercase">
                  {t('projectDetail.technologies')}
                </h4>
                <div className="grid grid-cols-2 gap-px">
                  {project.technologies.map((tech) => (
                    <motion.div
                      key={tech}
                      className="flex items-center px-5 py-4 transition-colors duration-500 hover:bg-white/[0.02]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-mono text-[13px] font-light tracking-wide text-white/50">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="border-t border-white/[0.10] pt-14">
            <div className="flex items-center justify-between">
              {prevProject ? (
                <Link
                  to={`/calismalar/${prevProject.slug}`}
                  className="group flex items-center gap-4 no-underline transition-colors duration-500 hover:text-white"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-xs text-white/20 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-white/60"
                  />
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-light tracking-[0.3em] text-white/35 uppercase">
                      {t('projectDetail.prev')}
                    </span>
                    <span className="text-sm font-medium tracking-wide text-white/50 transition-colors duration-500 group-hover:text-white/90">
                      <ScrambleText text={prevProject.title} />
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Link
                to="/calismalar"
                className="font-mono text-[10px] font-light tracking-[0.3em] text-white/35 uppercase no-underline transition-colors duration-500 hover:text-white/60"
              >
                <ScrambleText text={t('projectDetail.allWork')} />
              </Link>

              {nextProject ? (
                <Link
                  to={`/calismalar/${nextProject.slug}`}
                  className="group flex items-center gap-4 text-right no-underline transition-colors duration-500 hover:text-white"
                >
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[9px] font-light tracking-[0.3em] text-white/35 uppercase">
                      {t('projectDetail.next')}
                    </span>
                    <span className="text-sm font-medium tracking-wide text-white/50 transition-colors duration-500 group-hover:text-white/90">
                      <ScrambleText text={nextProject.title} />
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/60"
                  />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
