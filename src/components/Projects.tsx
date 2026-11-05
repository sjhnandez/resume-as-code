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
    <Section id="projects" index="03" title={s.title} wide>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {s.entries.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-ink">
              <h3 className="font-display text-3xl leading-[1.1]">{p.title}</h3>
              {p.summary ? (
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
              ) : null}
              {p.bullets?.length ? (
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="text-[0.8125rem] leading-relaxed text-dim">
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-auto pt-6">
                {p.tags?.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <li key={tag} className="rounded-md bg-bg px-2 py-0.5 text-xs text-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {p.links?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                    {p.links.map((l) => {
                      const badges = badgesForRepo(l.href)
                      return (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                          >
                            {l.label}
                            <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                          {badges.length ? (
                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                              {badges.map((b) => (
                                <a
                                  key={b.src}
                                  href={b.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  title={b.alt}
                                >
                                  <img src={b.src} alt={b.alt} loading="lazy" className="h-4 w-auto" />
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
