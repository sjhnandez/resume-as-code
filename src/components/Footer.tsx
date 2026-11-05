import { content } from '../content'
import { ui } from '../content/ui'
import { useLang } from '../lib/lang'
import { ContactChips } from './ContactChips'
import { ArrowUpIcon } from './Icons'

export function Footer() {
  const { lang } = useLang()
  const d = content[lang]
  const t = ui[lang]

  return (
    <footer className="mt-10 bg-panel text-bg sm:mt-14">
      <div className="mx-auto max-w-[75rem] px-5 py-12 sm:px-8 sm:py-16">
        <p className="font-display text-5xl leading-none tracking-[-0.01em] sm:text-7xl">{d.name}</p>
        <p className="mt-4 text-sm opacity-70">{d.role}</p>
        <div className="mt-10">
          <ContactChips />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-bg/20 pt-5 text-xs">
          <p className="opacity-70">
            © {new Date().getFullYear()} {d.name}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 underline decoration-bg/30 underline-offset-4 transition-colors hover:decoration-bg"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
