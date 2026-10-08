import en from '../../resume/data/en.json'
import es from '../../resume/data/es.json'
import type { Lang, ResumeData } from './types'

export type { Contact, Entry, LinkItem, ProjectEntry, ResumeData, SkillGroup } from './types'
export type { Lang } from './types'

// The single source of truth. resume/data/{en,es}.json also feeds the Typst CV
// PDFs (resume/render.typ), so the page and the downloads can never drift.
export const content: Record<Lang, ResumeData> = {
  en: en as unknown as ResumeData,
  es: es as unknown as ResumeData,
}

export const langs: Lang[] = ['en', 'es']

// Fail the build early if a content file loses a section instead of shipping a
// broken deploy (deploys run automatically on every commit).
for (const lang of langs) {
  const d = content[lang]
  for (const key of ['profile', 'skills', 'experience', 'projects', 'education'] as const) {
    if (!d.sections || !d.sections[key]) {
      throw new Error(`resume/data/${lang}.json is missing sections.${key}`)
    }
  }
  if (!d.name || !d.role || !d.meta?.title || !d.contacts?.length) {
    throw new Error(`resume/data/${lang}.json is missing name, role, meta, or contacts`)
  }
}
