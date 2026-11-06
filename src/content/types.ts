export type Lang = 'en' | 'es'

export interface Contact {
  id: string
  label: string
  href?: string
}

export interface LinkItem {
  label: string
  href: string
}

export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export interface Entry {
  id: string
  title: string
  dates?: string
  org?: string
  meta?: string
  bullets?: string[]
}

export interface ProjectEntry extends Entry {
  /** Title of the merged entry in the CV PDF. */
  resumeTitle?: string
  /** Included in the CV PDF (the site shows every card either way). */
  inResume?: boolean
  /** Site-only card copy. */
  summary?: string
  tags?: string[]
  links?: LinkItem[]
}

/** Site-only showcase band under the hero. The CV renderer ignores it. */
export interface Featured {
  eyebrow: string
  title: string
  summary: string
  points: { title: string; text: string }[]
  cta: LinkItem
  source: LinkItem
}

export interface ResumeData {
  meta: {
    lang: Lang
    title: string
    description: string
    site: string
  }
  name: string
  role: string
  contacts: Contact[]
  featured: Featured
  sections: {
    profile: { title: string; text: string }
    skills: { title: string; groups: SkillGroup[] }
    experience: { title: string; entries: Entry[] }
    projects: { title: string; entries: ProjectEntry[] }
    education: { title: string; entries: Entry[] }
  }
}
