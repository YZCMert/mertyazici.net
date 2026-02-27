interface GradientOverlayProps {
  position: 'top' | 'bottom' | 'both'
  className?: string
}

export default function GradientOverlay({ position, className = '' }: GradientOverlayProps) {
  return (
    <>
      {(position === 'top' || position === 'both') && (
        <div
          className={`pointer-events-none absolute top-0 left-0 z-10 h-40 w-full bg-gradient-to-b from-black to-transparent ${className}`}
        />
      )}
      {(position === 'bottom' || position === 'both') && (
        <div
          className={`pointer-events-none absolute bottom-0 left-0 z-10 h-40 w-full bg-gradient-to-t from-black to-transparent ${className}`}
        />
      )}
    </>
  )
}
