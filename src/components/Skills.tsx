import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  const { lang } = useLang()
  const s = content[lang].sections.skills

  return (
    <Section id="skills" index="04" title={s.title}>
      <div className="grid gap-8 sm:grid-cols-2">
        {s.groups.map((g, i) => (
          <Reveal key={g.id} delay={i * 0.05}>
            <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{g.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-sm text-muted transition hover:border-accent/50 hover:text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
