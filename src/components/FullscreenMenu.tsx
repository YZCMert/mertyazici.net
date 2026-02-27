import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ArrowIcon from './ArrowIcon'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const socialLinks = [
  { label: 'INSTAGRAM', href: '#' },
  { label: 'BEHANCE', href: '#' },
  { label: 'GITHUB', href: '#' },
]

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const menuContainerVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const menuItemVariants = {
  closed: { y: 60, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const { t } = useTranslation()

  const menuItems = [
    { label: t('nav.about'), path: '/hakkimda' },
    { label: t('nav.services'), path: '/hizmetler' },
    { label: t('nav.work'), path: '/calismalar' },
    { label: t('nav.contact'), path: '/iletisim' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-black"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24">
            <motion.nav
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
            >
              {menuItems.map((item, i) => (
                <motion.div key={item.path} variants={menuItemVariants}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/10 py-5 text-white no-underline transition-colors hover:text-white/70 md:py-7"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-3xl font-normal tracking-wide md:text-5xl lg:text-6xl">
                        {item.label}
                      </span>
                    </div>
                    <span className="transition-transform group-hover:translate-x-2">
                      <ArrowIcon className="h-6 w-6 md:h-8 md:w-8" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Social links with 3D flip hover */}
            <motion.div
              className="mt-12 flex gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                  style={{ perspective: '600px' }}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:[transform:rotateX(360deg)]">
                    {link.label}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Bottom info */}
          <motion.div
            className="flex items-center justify-between px-8 pb-8 md:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-white/30">
              mert@mertyazici.net
            </span>
            <span className="font-mono text-xs tracking-[0.3em] text-white/30">
              TÜRKİYE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
