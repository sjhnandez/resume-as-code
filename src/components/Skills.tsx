import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  const { lang } = useLang()
  const s = content[lang].sections.skills

  return (
    <Section id="skills" index="04" title={s.title}>
      <div className="divide-y divide-line">
        {s.groups.map((g, i) => (
          <Reveal key={g.id} delay={i * 0.04}>
            <div className="grid gap-2 py-4 sm:grid-cols-9 sm:gap-6">
              <h3 className="label pt-1 sm:col-span-3">{g.label}</h3>
              <ul className="sm:col-span-6">
                {g.items.map((item, j) => (
                  <li key={item} className="inline text-[0.95rem] leading-relaxed">
                    {item}
                    {j < g.items.length - 1 ? <span className="text-dim">, </span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
