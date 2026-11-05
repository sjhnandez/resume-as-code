import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  const { lang } = useLang()
  const s = content[lang].sections.experience

  return (
    <Section id="experience" index="02" title={s.title}>
      <ol className="divide-y divide-line">
        {s.entries.map((e, i) => (
          <li key={e.id} className="py-8 first:pt-0 last:pb-0">
            <Reveal delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-3xl leading-tight">{e.title}</h3>
                {e.dates ? <p className="label">{e.dates}</p> : null}
              </div>
              <p className="mt-2 text-sm text-dim">
                <span className="text-ink">{e.org}</span>
                {e.meta ? <span> · {e.meta}</span> : null}
              </p>
              {e.bullets?.length ? (
                <ul className="mt-5 max-w-3xl space-y-3">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
