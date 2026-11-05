import { content } from '../content'
import { ui } from '../content/ui'
import { useLang } from '../lib/lang'
import { ContactChips } from './ContactChips'
import { CvButtons } from './CvButtons'

export function Hero() {
  const { lang } = useLang()
  const d = content[lang]

  return (
    <section id="top" className="mx-auto max-w-[75rem] scroll-mt-14 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
      <p className="label">{ui[lang].hero.greeting}</p>
      <h1 className="mt-4 font-display text-[clamp(4rem,14.5vw,12rem)] leading-[0.86] tracking-[-0.02em]">
        {d.name}
      </h1>
      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end md:gap-6">
        <p className="font-display text-3xl leading-tight sm:text-4xl md:col-span-5">
          <span className="marker">{d.role}</span>
        </p>
        <div className="space-y-6 md:col-span-7 md:justify-self-end">
          <CvButtons />
          <ContactChips />
        </div>
      </div>
    </section>
  )
}
