interface RotatingText3DProps {
  texts: string[]
  className?: string
}

export default function RotatingText3D({ texts, className = '' }: RotatingText3DProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div className="text-rotate-3d" style={{ transformStyle: 'preserve-3d' }}>
        {texts.map((text, i) => (
          <div
            key={i}
            className="text-outline text-center font-display text-7xl font-normal tracking-[0.02em] md:text-9xl lg:text-[11rem]"
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              backfaceVisibility: 'hidden',
              transform: `rotateX(${(360 / texts.length) * i}deg) translateZ(60px)`,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
