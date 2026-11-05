import { ui } from '../content/ui'
import { cvFilename, cvUrl } from '../lib/cv'
import { useLang } from '../lib/lang'
import { DownloadIcon } from './Icons'

const solid =
  'inline-flex items-center gap-2 rounded-md bg-accent text-ink transition-colors hover:bg-ink hover:text-accent'
const ghost =
  'inline-flex h-11 items-center gap-2 rounded-md border border-ink px-5 text-sm transition-colors hover:bg-ink hover:text-bg'

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
        className={`${solid} h-8 px-3 text-xs`}
      >
        <DownloadIcon className="h-3.5 w-3.5" />
        CV
      </a>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={cvUrl(lang)} download={cvFilename(lang)} className={`${solid} h-11 px-5 text-sm`}>
        <DownloadIcon className="h-4 w-4" />
        {t.download} ({lang.toUpperCase()})
      </a>
      <a href={cvUrl(other)} download={cvFilename(other)} className={ghost}>
        {t.other} ({other.toUpperCase()})
      </a>
    </div>
  )
}
