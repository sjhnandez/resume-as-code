import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  const { lang } = useLang()
  const s = content[lang].sections.education

  return (
    <Section id="education" index="05" title={s.title}>
      <ul className="divide-y divide-line">
        {s.entries.map((e, i) => (
          <li key={e.id} className="py-5 first:pt-0 last:pb-0">
            <Reveal delay={i * 0.04}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl leading-tight">{e.title}</h3>
                {e.dates ? <p className="label">{e.dates}</p> : null}
              </div>
              <p className="mt-1.5 text-sm text-ink">{e.org}</p>
              {e.meta ? <p className="mt-0.5 text-sm text-dim">{e.meta}</p> : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
