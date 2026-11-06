import { content } from '../content'
import { useLang } from '../lib/lang'
import { ExternalLinkIcon, GitHubIcon } from './Icons'
import { Reveal } from './Reveal'

/** Inverted band under the hero: the one project that can be tried right now. */
export function Featured() {
  const { lang } = useLang()
  const f = content[lang].featured

  return (
    <section id="lab" className="scroll-mt-14 bg-panel text-bg">
      <div className="mx-auto grid max-w-[75rem] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-7">
          <p className="label !text-bg/70">{f.eyebrow}</p>
          <h2 className="mt-4 font-display text-6xl leading-none tracking-[-0.01em] sm:text-8xl">
            {f.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty opacity-85">{f.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={f.cta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-ink transition-colors hover:bg-bg"
            >
              {f.cta.label}
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
            <a
              href={f.source.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm underline decoration-bg/30 underline-offset-4 transition-colors hover:decoration-bg"
            >
              <GitHubIcon className="h-4 w-4" />
              {f.source.label}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <ul className="divide-y divide-bg/20 border-y border-bg/20">
            {f.points.map((point) => (
              <li key={point.title} className="py-4">
                <h3 className="font-display text-2xl leading-tight">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-75">{point.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
