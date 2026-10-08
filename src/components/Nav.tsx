import { content } from '../content'
import { ui } from '../content/ui'
import { useLang } from '../lib/lang'
import { CvButtons } from './CvButtons'

const anchorIds = ['about', 'experience', 'projects', 'skills', 'education'] as const

export function Nav() {
  const { lang, setLang } = useLang()
  const t = ui[lang]
  const name = content[lang].name

  return (
    <header className="sticky top-0 z-40 border-b border-line/50 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-5 sm:px-8">
        <a href="#top" className="font-display text-sm font-bold tracking-tight whitespace-nowrap">
          <span className="gradient-text">{name}</span>
        </a>

        <nav aria-label={t.navLabel} className="hidden items-center md:flex">
          {anchorIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-white/5 hover:text-ink"
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.lang.label}
            className="flex items-center rounded-full border border-line p-0.5"
          >
            {(['en', 'es'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={
                  lang === code
                    ? 'rounded-full bg-linear-to-r from-accent to-accent2 px-2.5 py-1 font-mono text-xs text-white'
                    : 'rounded-full px-2.5 py-1 font-mono text-xs text-muted transition hover:text-ink'
                }
              >
                {t.lang[code]}
              </button>
            ))}
          </div>
          <CvButtons compact />
        </div>
      </div>
    </header>
  )
}
