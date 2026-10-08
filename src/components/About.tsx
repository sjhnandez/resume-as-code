import { content } from '../content'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  const { lang } = useLang()
  const d = content[lang]

  return (
    <Section id="about" index="01" title={d.sections.profile.title}>
      <Reveal>
        <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
          {d.sections.profile.text}
        </p>
      </Reveal>
    </Section>
  )
}
