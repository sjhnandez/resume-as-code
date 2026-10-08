import { content } from '../content'
import { useLang } from '../lib/lang'
import { iconFor } from './Icons'

const chip =
  'inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-ink sm:px-3.5 sm:text-sm'

export function ContactChips() {
  const { lang } = useLang()
  const d = content[lang]

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {d.contacts.map((c) => {
        const Icon = iconFor(c.id)
        const body = (
          <>
            <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
            {c.label}
          </>
        )
        const isExternal = c.href?.startsWith('http')
        return (
          <li key={c.id}>
            {c.href ? (
              <a
                href={c.href}
                className={chip}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {body}
              </a>
            ) : (
              <span className={chip}>{body}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
