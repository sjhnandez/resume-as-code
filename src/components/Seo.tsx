import { useEffect } from 'react'
import { content } from '../content'
import { useLang } from '../lib/lang'

/**
 * Keeps <title> and the meta description in sync with the active language and
 * injects a JSON-LD Person record (built from the English content — the
 * canonical identity) for search engines.
 */
export function Seo() {
  const { lang } = useLang()
  const d = content[lang]

  useEffect(() => {
    document.title = d.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', d.meta.description)
  }, [d])

  useEffect(() => {
    const person = content.en
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      jobTitle: person.role,
      url: person.meta.site,
      email: person.contacts.find((c) => c.id === 'email')?.label,
      sameAs: person.contacts.filter((c) => c.href?.startsWith('http')).map((c) => c.href),
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    document.head.append(script)
    return () => script.remove()
  }, [])

  return null
}
