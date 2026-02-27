interface ProjectThumbnailProps {
  color: string
  title: string
  category: string
  className?: string
}

export default function ProjectThumbnail({ color, title, category, className = '' }: ProjectThumbnailProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${color} ${className}`}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <span className="font-mono text-[8px] tracking-[0.3em] text-white/50 uppercase">{category}</span>
        <span className="mt-1 font-display text-sm font-normal text-white/80">{title}</span>
      </div>
    </div>
  )
}
