import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  const { lang } = useLang()
  const s = content[lang].sections.experience

  return (
    <Section id="experience" index="02" title={s.title}>
      <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
        {s.entries.map((e, i) => (
          <li key={e.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-linear-to-br from-accent to-accent2 sm:-left-[39px]"
            />
            <Reveal delay={i * 0.08}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                {e.dates ? <p className="font-mono text-xs text-dim">{e.dates}</p> : null}
              </div>
              <p className="mt-1 text-sm text-muted">
                <span className="italic">{e.org}</span>
                {e.meta ? <span className="text-dim"> · {e.meta}</span> : null}
              </p>
              {e.bullets?.length ? (
                <ul className="mt-3 space-y-2">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
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
