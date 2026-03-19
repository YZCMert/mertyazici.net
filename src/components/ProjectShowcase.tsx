import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import StaggerReveal from './animations/StaggerReveal'

const ShowcaseScene = lazy(() => import('./three/ShowcaseScene'))

interface ShowcaseProject {
  id: number
  title: string
  description: string
  video: string
  hoverVideo: string
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: 'ProkApp Mobile APP',
    description: 'Cross-platform mobile application',
    video: '/video/showcase_01.mp4',
    hoverVideo: '/video/showcase_01.mp4',
  },
  {
    id: 2,
    title: 'PROKA AI Assistant',
    description: 'Self-hosted RAG-powered AI chat platform',
    video: '/video/showcase_02.mp4',
    hoverVideo: '/video/showcase_02.mp4',
  },
  {
    id: 3,
    title: 'CRM Gantt Chart',
    description: 'Real-time project visualization for CRM',
    video: '/video/showcase_03.mp4',
    hoverVideo: '/video/showcase_03.mp4',
  },
]

function ShowcaseCard({
  project,
  scrollProgress,
}: {
  project: ShowcaseProject
  scrollProgress: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoverActive, setHoverActive] = useState(0)
  const hoverVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let raf: number
    const target = isHovered ? 1 : 0
    const step = () => {
      setHoverActive((prev) => {
        const diff = target - prev
        if (Math.abs(diff) < 0.01) return target
        raf = requestAnimationFrame(step)
        return prev + diff * 0.1
      })
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isHovered])

  return (
    <div
      className="group relative w-[85vw] shrink-0 snap-center overflow-hidden rounded-lg md:w-[45vw] lg:w-[30vw]"
      style={{ height: '74vh', minHeight: '400px', maxHeight: '700px' }}
      onMouseEnter={() => {
        setIsHovered(true)
        hoverVideoRef.current?.play()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        hoverVideoRef.current?.pause()
        if (hoverVideoRef.current) hoverVideoRef.current.currentTime = 0
      }}
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[#121813]">
            <video
              src={project.video}
              muted
              autoPlay
              loop
              playsInline
              className="h-full w-full object-cover opacity-50"
            />
          </div>
        }
      >
        <ShowcaseScene
          videoSrc={project.video}
          progress={scrollProgress}
          hoverActive={hoverActive}
          className="absolute inset-0 h-full w-full"
        />
      </Suspense>

      <div
        className="absolute inset-x-[15%] inset-y-[20%] z-10 origin-bottom overflow-hidden rounded-md transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          boxShadow: isHovered ? '0 0 40px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <video
          ref={hoverVideoRef}
          src={project.hoverVideo}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-8">
        <span className="mb-2 font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase">
          {String(project.id).padStart(2, '0')}
        </span>
        <h3 className="mb-1 font-sans text-xl font-medium tracking-wide text-white/95 md:text-2xl">
          {project.title}
        </h3>
        <p className="font-mono text-xs font-light tracking-wider text-white/50">
          {project.description}
        </p>
      </div>
    </div>
  )
}

export default function ProjectShowcase() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-10%' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const unsubscribe = progress.on('change', (v) => {
      setCurrentProgress(v)
    })
    return unsubscribe
  }, [progress])

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="mb-12 text-center md:mb-16">
        <motion.span
          className="font-mono text-[13px] font-light tracking-[0.5em] text-white/35 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          {t('home.showcase', 'ÖNE ÇIKAN PROJELER')}
        </motion.span>
      </div>

      <StaggerReveal staggerDelay={0.15}>
        <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory md:gap-6 md:px-10 lg:gap-8 lg:px-20">
          {showcaseProjects.map((project) => (
            <ShowcaseCard
              key={project.id}
              project={project}
              scrollProgress={currentProgress}
            />
          ))}
        </div>
      </StaggerReveal>
    </section>
  )
}
