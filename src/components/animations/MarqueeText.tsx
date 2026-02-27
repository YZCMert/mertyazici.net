interface MarqueeTextProps {
  text: string
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

export default function MarqueeText({
  text,
  direction = 'left',
  speed = 30,
  className = '',
}: MarqueeTextProps) {
  const animationClass = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={animationClass}
        style={
          { '--marquee-duration': `${speed}s`, display: 'inline-block' } as React.CSSProperties
        }
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-block">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
