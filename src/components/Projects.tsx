import { content } from '../content'
import { badgesForRepo } from '../lib/badges'
import { useLang } from '../lib/lang'
import { ExternalLinkIcon } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  const { lang } = useLang()
  const s = content[lang].sections.projects

  return (
    <Section id="projects" index="03" title={s.title}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {s.entries.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition duration-300 hover:border-accent/50 hover:shadow-[0_18px_50px_-18px_rgba(79,140,255,0.45)] motion-safe:hover:-translate-y-1">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              {p.summary ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
              ) : null}
              {p.bullets?.length ? (
                <ul className="mt-4 space-y-2">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-xs leading-relaxed text-dim">
                      <span aria-hidden="true" className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-accent2" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-auto pt-5">
                {p.tags?.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-dim transition group-hover:border-accent/40 group-hover:text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {p.links?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-4">
                    {p.links.map((l) => {
                      const badges = badgesForRepo(l.href)
                      return (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-accent transition hover:text-ink"
                          >
                            {l.label}
                            <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                          {badges.length ? (
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                              {badges.map((b) => (
                                <a
                                  key={b.src}
                                  href={b.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  title={b.alt}
                                >
                                  <img
                                    src={b.src}
                                    alt={b.alt}
                                    loading="lazy"
                                    className="h-4 w-auto opacity-80 transition group-hover:opacity-100"
                                  />
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
