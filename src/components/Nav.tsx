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
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex h-14 max-w-[75rem] items-center justify-between gap-3 px-5 sm:px-8">
        <a href="#top" className="font-display text-xl whitespace-nowrap">
          {name}
        </a>

        <nav aria-label={t.navLabel} className="hidden items-center md:flex">
          {anchorIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.lang.label}
            className="flex items-center rounded-md border border-line p-0.5"
          >
            {(['en', 'es'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={
                  lang === code
                    ? 'rounded bg-ink px-2 py-1 text-xs text-bg'
                    : 'rounded px-2 py-1 text-xs text-muted transition-colors hover:text-ink'
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
