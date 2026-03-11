import { Link } from 'react-router-dom'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
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
      <span className="flex items-center gap-1.5 font-mono text-[15px] tracking-[0.15em] text-red-500/70 uppercase">
        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
        rec
      </span>
      <span
        ref={spanRef}
        className="font-mono text-[15px] tracking-[0.2em] text-white/40"
      />
    </div>
  )
}

function LanguageToggle() {
  const { i18n } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const rotateX = useMotionValue(0)
  const isFlipping = useRef(false)

  const isTr = i18n.language === 'tr'

  function toggle() {
    if (isFlipping.current) return
    isFlipping.current = true

    animate(rotateX, -90, {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }).then(() => {
      rotateX.set(0)
      isFlipping.current = false
      const newLang = isTr ? 'en' : 'tr'
      i18n.changeLanguage(newLang)
      localStorage.setItem('lang', newLang)
    })
  }

  useEffect(() => {
    if (isFlipping.current) return
    animate(rotateX, hovered ? -25 : 0, {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    })
  }, [hovered, isTr, rotateX])

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      style={{ perspective: '400px' }}
      aria-label="Change language"
    >
      <div className="relative" style={{ height: 24, width: 36 }}>
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            rotateX,
          }}
        >
          {/* Front face — current language */}
          <span
            className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold tracking-[0.3em] text-white/80 uppercase"
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(12px)' }}
          >
            {isTr ? 'TR' : 'EN'}
          </span>
          {/* Bottom face — next language */}
          <span
            className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold tracking-[0.3em] text-white/50 uppercase"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(90deg) translateZ(12px)' }}
          >
            {isTr ? 'EN' : 'TR'}
          </span>
        </motion.div>
      </div>
    </button>
  )
}

function ContactLink({ children }: { children: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className="relative inline-flex items-center gap-2.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ping signal indicator */}
      <span className="relative flex h-1.5 w-1.5">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/75"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>

      {/* Text with staggered wave */}
      <span className="relative">
        <span className="inline-flex">
          {children.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={
                hovered
                  ? { y: [0, -2, 0], opacity: [0.8, 1, 0.8] }
                  : { y: 0, opacity: 1 }
              }
              transition={{
                duration: 0.5,
                delay: hovered ? i * 0.035 : 0,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>

        {/* Underline from center */}
        <motion.span
          className="absolute -bottom-1 left-1/2 h-px bg-emerald-400/50"
          initial={{ width: 0, x: 0 }}
          animate={{
            width: hovered ? '100%' : '0%',
            marginLeft: hovered ? '-50%' : '0%',
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </span>
    </span>
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
    { icon: faGithub, href: 'https://github.com/YZCMert', label: 'GitHub' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-7 transition-all duration-500 md:px-14 ${
          scrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent mix-blend-difference'
        }`}
      >
        {/* Left: Logo + Clock */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-sans text-lg font-medium tracking-[0.3em] uppercase text-white no-underline"
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
        <div className="flex items-center gap-7">
          {/* Social + Contact — desktop only */}
          <div className="hidden items-center gap-7 md:flex">
            {socialLinks.map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors duration-300 hover:text-white">
                <FontAwesomeIcon icon={icon} className="text-xl" />
              </a>
            ))}
            <span className="h-6 w-px bg-white/10" />
            <Link to="/iletisim" className="font-mono text-[15px] font-light tracking-[0.3em] text-white/80 uppercase no-underline">
              <ContactLink>{t('nav.contact')}</ContactLink>
            </Link>
          </div>
          {/* Language toggle — mobile only */}
          <div className="md:hidden">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Mobile bottom social bar */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center gap-10 border-t border-white/[0.06] bg-black/70 py-4 backdrop-blur-md md:hidden">
        {socialLinks.map(({ icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-white/40 transition-colors duration-300 active:text-white"
          >
            <FontAwesomeIcon icon={icon} className="text-xl" />
            <span className="font-mono text-[11px] tracking-[0.15em] text-white/25 uppercase">{label}</span>
          </a>
        ))}
        <Link
          to="/iletisim"
          className="flex flex-col items-center gap-1 text-white/40 no-underline transition-colors duration-300 active:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          <span className="font-mono text-[11px] tracking-[0.15em] text-white/25 uppercase">{t('nav.contact')}</span>
        </Link>
      </div>
    </>
  )
}
