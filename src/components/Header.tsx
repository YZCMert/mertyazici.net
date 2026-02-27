import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
import FlipLink from './animations/FlipLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

function formatClock(): string {
  const now = new Date()
  const day = DAYS[now.getDay()]
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return `${day}${h}:${m}:${s}`
}

function LiveClock() {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (spanRef.current) spanRef.current.textContent = formatClock()
    const id = setInterval(() => {
      if (spanRef.current) spanRef.current.textContent = formatClock()
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hidden items-center gap-2 md:flex">
      <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] text-red-500/70 uppercase">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        rec
      </span>
      <span
        ref={spanRef}
        className="font-mono text-[10px] tracking-[0.2em] text-white/40"
      />
    </div>
  )
}

function LanguageToggle() {
  const { i18n } = useTranslation()
  const [isFlipping, setIsFlipping] = useState(false)

  function toggle() {
    setIsFlipping(true)
    const newLang = i18n.language === 'tr' ? 'en' : 'tr'
    setTimeout(() => {
      i18n.changeLanguage(newLang)
      localStorage.setItem('lang', newLang)
      setIsFlipping(false)
    }, 150)
  }

  return (
    <button
      onClick={toggle}
      className="cursor-pointer border-none bg-transparent font-mono text-xs tracking-[0.3em] text-white/60 uppercase transition-colors hover:text-white"
      style={{ perspective: '600px' }}
      aria-label="Change language"
    >
      <motion.span
        className="inline-block"
        animate={{ rotateX: isFlipping ? 90 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {i18n.language === 'tr' ? 'TR' : 'EN'}
      </motion.span>
    </button>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const rafPending = useRef(false)

  useEffect(() => {
    function onScroll() {
      if (rafPending.current) return
      rafPending.current = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        rafPending.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const socialLinks = [
    { icon: faInstagram, href: 'https://instagram.com/yzc.mert', label: 'Instagram' },
    { icon: faLinkedinIn, href: 'https://www.linkedin.com/in/yzcmert/', label: 'LinkedIn' },
    { icon: faGithub, href: 'https://github.com/jnrmert', label: 'GitHub' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 transition-all duration-500 md:px-10 ${
          scrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent mix-blend-difference'
        }`}
      >
        {/* Left: Logo + Clock */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-white no-underline"
          >
            &copy;M.YAZICI
          </Link>
          <LiveClock />
        </div>

        {/* Center: Language toggle — desktop only */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <LanguageToggle />
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {/* Social + Contact — desktop only */}
          <div className="hidden items-center gap-5 md:flex">
            {socialLinks.map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors duration-300 hover:text-white">
                <FontAwesomeIcon icon={icon} className="text-sm" />
              </a>
            ))}
            <span className="h-4 w-px bg-white/10" />
            <Link to="/iletisim" className="font-mono text-[10px] font-light tracking-[0.3em] text-white/80 uppercase no-underline">
              <FlipLink>{t('nav.contact')}</FlipLink>
            </Link>
          </div>
          {/* Language toggle — mobile only */}
          <div className="md:hidden">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Mobile bottom social bar */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center gap-8 border-t border-white/[0.06] bg-black/70 py-3 backdrop-blur-md md:hidden">
        {socialLinks.map(({ icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-white/40 transition-colors duration-300 active:text-white"
          >
            <FontAwesomeIcon icon={icon} className="text-base" />
            <span className="font-mono text-[8px] tracking-[0.15em] text-white/25 uppercase">{label}</span>
          </a>
        ))}
        <Link
          to="/iletisim"
          className="flex flex-col items-center gap-1 text-white/40 no-underline transition-colors duration-300 active:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          <span className="font-mono text-[8px] tracking-[0.15em] text-white/25 uppercase">{t('nav.contact')}</span>
        </Link>
      </div>
    </>
  )
}
