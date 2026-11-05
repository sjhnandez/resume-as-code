import { content } from '../content'
import { useLang } from '../lib/lang'
import { iconFor } from './Icons'

// Colors inherit, so the same row works on the paper hero and the dark footer.
const item = 'inline-flex items-center gap-2 text-sm'
const link = `${item} underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current`

export function ContactChips() {
  const { lang } = useLang()
  const d = content[lang]

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {d.contacts.map((c) => {
        const Icon = iconFor(c.id)
        const body = (
          <>
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {c.label}
          </>
        )
        const isExternal = c.href?.startsWith('http')
        return (
          <li key={c.id}>
            {c.href ? (
              <a
                href={c.href}
                className={link}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {body}
              </a>
            ) : (
              <span className={item}>{body}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
