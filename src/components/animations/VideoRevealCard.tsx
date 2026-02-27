import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface VideoRevealCardProps {
  thumbnail: string
  video?: string
  title: string
  category: string
  year: string
  technologies?: string[]
}

export default function VideoRevealCard({
  thumbnail,
  video,
  title,
  category,
  year,
  technologies = [],
}: VideoRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleMouseEnter() {
    setIsHovered(true)
    videoRef.current?.play()
  }

  function handleMouseLeave() {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <div
          className="h-full w-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${thumbnail})`,
            filter: isHovered ? 'grayscale(0)' : 'grayscale(1)',
          }}
        />

        {/* Video overlay */}
        {video && (
          <motion.div
            className="absolute inset-0"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'bottom' }}
          >
            <video
              ref={videoRef}
              src={video}
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Info overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs tracking-[0.3em] text-white/60">{category}</span>
          <span className="font-mono text-xs tracking-[0.2em] text-white/40">{year}</span>
        </div>
        <div>
          <h3 className="mb-2 text-2xl font-bold tracking-wide md:text-3xl">{title}</h3>
          {technologies.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 px-3 py-1 text-[10px] tracking-wider text-white/70"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
