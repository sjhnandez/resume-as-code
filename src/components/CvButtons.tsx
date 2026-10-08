import { ui } from '../content/ui'
import { cvFilename, cvUrl } from '../lib/cv'
import { useLang } from '../lib/lang'
import { DownloadIcon } from './Icons'

const solid = 'inline-flex items-center gap-2 rounded-full font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110'
const ghost =
  'inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition hover:border-accent/60 hover:text-ink'

interface CvButtonsProps {
  /** Compact single button for the sticky nav; full pair for the hero. */
  compact?: boolean
}

export function CvButtons({ compact = false }: CvButtonsProps) {
  const { lang } = useLang()
  const t = ui[lang].cv
  const other = lang === 'en' ? 'es' : 'en'

  if (compact) {
    return (
      <a
        href={cvUrl(lang)}
        download={cvFilename(lang)}
        aria-label={`${t.download} (${lang.toUpperCase()})`}
        className={`${solid} bg-linear-to-r from-accent to-accent2 px-3.5 py-1.5 text-xs`}
      >
        <DownloadIcon className="h-3.5 w-3.5" />
        CV
      </a>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={cvUrl(lang)} download={cvFilename(lang)} className={`${solid} bg-linear-to-r from-accent to-accent2 px-5 py-2.5 text-sm`}>
        <DownloadIcon className="h-4 w-4" />
        {t.download} ({lang.toUpperCase()})
      </a>
      <a href={cvUrl(other)} download={cvFilename(other)} className={ghost}>
        {t.other} ({other.toUpperCase()})
      </a>
    </div>
  )
}
