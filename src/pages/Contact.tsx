import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { pageVariants } from '@/lib/animations'
import MarqueeText from '@/components/animations/MarqueeText'
import MagneticButton from '@/components/animations/MagneticButton'
import ScrambleText from '@/components/animations/ScrambleText'

function FloatingInput({
  label,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase transition-all duration-300 ${
          isActive ? '-top-5 text-[9px] text-white/50' : 'top-3'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className="w-full border-b border-white/[0.12] bg-transparent py-3 font-sans text-sm font-light text-white outline-none transition-colors duration-500 focus:border-white/30"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-white/60"
        initial={{ width: 0 }}
        animate={{ width: focused ? '100%' : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

function FloatingTextarea({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase transition-all duration-300 ${
          isActive ? '-top-5 text-[9px] text-white/50' : 'top-3'
        }`}
      >
        {label}
      </label>
      <textarea
        required={required}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className="w-full resize-none border-b border-white/[0.12] bg-transparent py-3 font-sans text-sm font-light text-white outline-none transition-colors duration-500 focus:border-white/30"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-white/60"
        initial={{ width: 0 }}
        animate={{ width: focused ? '100%' : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/[0.10] py-6">
      <span className="mb-2 block font-mono text-[9px] font-light tracking-[0.4em] text-white/35 uppercase">
        {label}
      </span>
      <div className="text-sm font-medium tracking-wide text-white/80">{children}</div>
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mesajiniz gönderildi!')
    setForm({ email: '', phone: '', message: '' })
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="mx-auto min-h-screen w-full max-w-7xl px-6 pt-32 pb-20 md:px-16 lg:px-24"
    >
      {/* Marquee band */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <MarqueeText
          text={t('contact.marquee')}
          direction="left"
          speed={25}
          className="font-sans text-sm font-light tracking-[0.35em] text-white/[0.15] uppercase md:text-lg"
        />
      </motion.div>

      {/* Big heading */}
      <motion.h1
        className="mb-20 max-w-3xl font-display text-4xl font-normal leading-[1.1] text-white/95 md:text-6xl lg:text-7xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {t('contact.heading')}
      </motion.h1>

      <div className="mx-auto grid max-w-5xl gap-20 lg:grid-cols-2">
        {/* Left: Form */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="mb-10 font-mono text-[10px] font-light tracking-[0.5em] text-white/35 uppercase">
            {t('contact.form.subtitle')}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <FloatingInput
              label={t('contact.form.email')}
              type="email"
              required
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder={t('contact.form.emailPlaceholder')}
            />
            <FloatingInput
              label={t('contact.form.phone')}
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder={t('contact.form.phonePlaceholder')}
            />
            <FloatingTextarea
              label={t('contact.form.message')}
              required
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder={t('contact.form.messagePlaceholder')}
            />
            <MagneticButton
              type="submit"
              className="mt-4 w-fit border border-white/20 bg-white/[0.04] px-10 py-4 font-mono text-[10px] font-medium tracking-[0.4em] text-white/80 uppercase transition-all duration-700 hover:border-white/60 hover:bg-white/[0.08] hover:text-white"
            >
              {t('contact.form.submit')}
            </MagneticButton>
          </form>
        </motion.div>

        {/* Right: Info rows */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <InfoRow label={t('contact.info.expertise')}>
            {t('contact.info.expertiseValue')}
          </InfoRow>

          <InfoRow label={t('contact.info.email')}>
            <a
              href="mailto:yzc.mert@icloud.com"
              className="text-white/80 no-underline transition-colors duration-500 hover:text-white"
            >
              <ScrambleText text={t('contact.info.emailValue')} />
            </a>
          </InfoRow>

          <InfoRow label={t('contact.info.location')}>
            {t('contact.info.locationValue')}
          </InfoRow>

          <InfoRow label={t('contact.info.social')}>
            <div className="flex gap-8">
              {[
                { name: 'INSTAGRAM', href: 'https://instagram.com/yzc.mert' },
                { name: 'LINKEDIN', href: 'https://www.linkedin.com/in/yzcmert/' },
                { name: 'GITHUB', href: 'https://github.com/jnrmert' },
              ].map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] font-light tracking-[0.25em] text-white/50 no-underline transition-colors duration-500 hover:text-white/80"
                >
                  <ScrambleText text={name} />
                </a>
              ))}
            </div>
          </InfoRow>

          <InfoRow label={t('contact.info.status')}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/70" />
              <span>{t('contact.info.statusValue')}</span>
            </div>
          </InfoRow>
        </motion.div>
      </div>
    </motion.div>
  )
}
