import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  const { lang } = useLang()
  const s = content[lang].sections.education

  return (
    <Section id="education" index="05" title={s.title}>
      <ul className="space-y-7">
        {s.entries.map((e, i) => (
          <li key={e.id}>
            <Reveal delay={i * 0.06}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-base font-semibold sm:text-lg">{e.title}</h3>
                {e.dates ? <p className="font-mono text-xs text-dim">{e.dates}</p> : null}
              </div>
              <p className="mt-1 text-sm text-muted">
                <span className="italic">{e.org}</span>
              </p>
              {e.meta ? <p className="mt-0.5 text-xs text-dim">{e.meta}</p> : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
