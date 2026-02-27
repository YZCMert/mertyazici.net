import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrambleText from './animations/ScrambleText'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="bg-[#0a0a0a] px-6 pt-32 pb-10 md:px-10">
      {/* Editorial CTA */}
      <div className="mx-auto mb-20 max-w-5xl text-center">
        <h2 className="font-display text-4xl font-normal leading-[1.1] text-white/90 md:text-6xl lg:text-7xl">
          {t('footer.cta', { defaultValue: "Let's create something together" })}
        </h2>
        <Link
          to="/iletisim"
          className="mt-8 inline-block font-mono text-[10px] font-light tracking-[0.4em] text-white/50 uppercase no-underline transition-colors duration-500 hover:text-white"
        >
          <ScrambleText text={t('nav.contact')} />
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-auto mb-14 max-w-5xl">
        <div className="h-px w-full bg-white/[0.10]" />
      </div>

      {/* Info grid */}
      <div className="mx-auto mb-16 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Email */}
        <div>
          <span className="mb-3 block font-display text-sm italic text-white/35">Email</span>
          <a
            href="mailto:yzc.mert@icloud.com"
            className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase no-underline transition-colors duration-500 hover:text-white"
          >
            <ScrambleText text="yzc.mert@icloud.com" />
          </a>
        </div>

        {/* Location */}
        <div>
          <span className="mb-3 block font-display text-sm italic text-white/35">Location</span>
          <span className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">
            Istanbul, TR
          </span>
        </div>

        {/* Social */}
        <div>
          <span className="mb-3 block font-display text-sm italic text-white/35">Social</span>
          <div className="flex flex-col gap-2">
            {[
              { name: 'INSTAGRAM', href: 'https://instagram.com/yzc.mert' },
              { name: 'LINKEDIN', href: 'https://linkedin.com/in/mertyazici' },
              { name: 'GITHUB', href: 'https://github.com/mertyazici' },
            ].map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-[0.2em] text-white/70 no-underline transition-colors duration-500 hover:text-white"
              >
                <ScrambleText text={name} />
              </a>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <span className="mb-3 block font-display text-sm italic text-white/35">Status</span>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/70" />
            <span className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">
              {t('footer.available', { defaultValue: 'Available' })}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 h-px w-full bg-white/[0.06]" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
            &copy; {year} M.YAZICI &mdash; {t('footer.copyright')}
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">
            Designed &amp; Built by Mert Yazici
          </p>
        </div>
      </div>
    </footer>
  )
}
