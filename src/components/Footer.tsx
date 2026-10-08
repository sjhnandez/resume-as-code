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
    <footer className="border-t border-line/40">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              <span className="gradient-text">{d.name}</span>
            </p>
            <p className="mt-1 text-sm text-muted">{d.role}</p>
          </div>
          <ContactChips />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-end gap-4 border-t border-line/40 pt-6">
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-ink"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
            {t.footer.backToTop}
          </a>
        </div>
        <p className="mt-6 text-xs text-dim">
          © {new Date().getFullYear()} {d.name}
        </p>
      </div>
    </footer>
  )
}
