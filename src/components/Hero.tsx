import { content } from '../content'
import { ui } from '../content/ui'
import { useLang } from '../lib/lang'
import { ContactChips } from './ContactChips'
import { CvButtons } from './CvButtons'

export function Hero() {
  const { lang } = useLang()
  const d = content[lang]

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="mesh pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <p className="font-mono text-sm text-accent">{ui[lang].hero.greeting}</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          {d.name}
        </h1>
        <p className="mt-5 font-display text-xl text-muted sm:text-2xl">{d.role}</p>
        <div className="mt-9">
          <CvButtons />
        </div>
        <div className="mt-9">
          <ContactChips />
        </div>
      </div>
    </section>
  )
}
