import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import FlipLink from './animations/FlipLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'

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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 transition-all duration-500 md:px-10 ${
        scrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent mix-blend-difference'
      }`}
    >
      {/* Left: Logo */}
      <Link
        to="/"
        className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-white no-underline"
      >
        &copy;M.YAZICI
      </Link>

      {/* Center: Language toggle */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <LanguageToggle />
      </div>

      {/* Right: Social + Contact */}
      <div className="flex items-center gap-5">
        <a href="https://instagram.com/yzc.mert" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors duration-300 hover:text-white">
          <FontAwesomeIcon icon={faInstagram} className="text-sm" />
        </a>
        <a href="https://linkedin.com/in/mertyazici" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors duration-300 hover:text-white">
          <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
        </a>
        <a href="https://github.com/mertyazici" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors duration-300 hover:text-white">
          <FontAwesomeIcon icon={faGithub} className="text-sm" />
        </a>
        <span className="h-4 w-px bg-white/10" />
        <Link to="/iletisim" className="font-mono text-[10px] font-light tracking-[0.3em] text-white/80 uppercase no-underline">
          <FlipLink>{t('nav.contact')}</FlipLink>
        </Link>
      </div>
    </header>
  )
}
