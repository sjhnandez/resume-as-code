import { describe, expect, it } from 'vitest'
import { content, langs } from './index'
import type { ResumeData } from './types'

// Guards the content pipeline: resume/data/{en,es}.json feeds both the Typst CV
// PDFs (resume/render.typ) and this site (src/content), so a malformed or
// lopsided file ships a broken page and/or a broken CV. These tests import the
// same JSON through src/content — the app's own entry point — and assert the
// required structure, the project-card invariants, and EN/ES parity.

const sectionKeys = ['profile', 'skills', 'experience', 'projects', 'education'] as const

describe.each(langs)('resume/data/%s.json', (lang) => {
  const data: ResumeData = content[lang]

  it('has meta (lang/title/description/site), name, and role', () => {
    expect(data.meta.lang).toBe(lang)
    expect(data.meta.title).toBeTruthy()
    expect(data.meta.description).toBeTruthy()
    expect(data.meta.site).toMatch(/^https:\/\//)
    expect(data.name).toBeTruthy()
    expect(data.role).toBeTruthy()
  })

  it('has contacts with id/label, and href for every non-location contact', () => {
    expect(Array.isArray(data.contacts)).toBe(true)
    expect(data.contacts.length).toBeGreaterThan(0)
    for (const contact of data.contacts) {
      expect(contact.id, 'contact id').toBeTruthy()
      expect(contact.label, `contacts.${contact.id} label`).toBeTruthy()
      if (contact.id !== 'location') {
        expect(contact.href, `contacts.${contact.id} needs an href`).toBeTruthy()
      }
    }
    const ids = data.contacts.map((contact) => contact.id)
    expect(new Set(ids).size, 'contact ids are unique').toBe(ids.length)
  })

  it('has all five sections, each titled, with a profile text', () => {
    expect(Object.keys(data.sections).sort()).toEqual([...sectionKeys].sort())
    for (const key of sectionKeys) {
      expect(data.sections[key].title, `sections.${key}.title`).toBeTruthy()
    }
    expect(data.sections.profile.text).toBeTruthy()
  })

  it('has skill groups with id/label and non-empty items', () => {
    const groups = data.sections.skills.groups
    expect(Array.isArray(groups)).toBe(true)
    expect(groups.length).toBeGreaterThan(0)
    for (const group of groups) {
      expect(group.id, 'skill group id').toBeTruthy()
      expect(group.label, `skills.${group.id} label`).toBeTruthy()
      expect(Array.isArray(group.items), `skills.${group.id} items`).toBe(true)
      expect(group.items.length, `skills.${group.id} items`).toBeGreaterThan(0)
      for (const item of group.items) expect(item, `skills.${group.id} item`).toBeTruthy()
    }
    const ids = groups.map((group) => group.id)
    expect(new Set(ids).size, 'skill group ids are unique').toBe(ids.length)
  })

  it('has experience and education entries with id/title', () => {
    for (const key of ['experience', 'education'] as const) {
      const entries = data.sections[key].entries
      expect(Array.isArray(entries), `sections.${key}.entries`).toBe(true)
      expect(entries.length, `sections.${key}.entries`).toBeGreaterThan(0)
      for (const entry of entries) {
        expect(entry.id, `sections.${key} entry id`).toBeTruthy()
        expect(entry.title, `sections.${key} entry title`).toBeTruthy()
      }
      const ids = entries.map((entry) => entry.id)
      expect(new Set(ids).size, `sections.${key} entry ids are unique`).toBe(ids.length)
    }
  })

  it('has project cards with id/title/summary/tags/bullets', () => {
    const entries = data.sections.projects.entries
    expect(Array.isArray(entries)).toBe(true)
    expect(entries.length).toBeGreaterThan(0)
    for (const entry of entries) {
      expect(entry.id, 'project id').toBeTruthy()
      expect(entry.title, `projects.${entry.id} title`).toBeTruthy()
      expect(entry.summary, `projects.${entry.id} summary`).toBeTruthy()
      expect(Array.isArray(entry.tags), `projects.${entry.id} tags`).toBe(true)
      expect((entry.tags ?? []).length, `projects.${entry.id} tags`).toBeGreaterThan(0)
      expect(Array.isArray(entry.bullets), `projects.${entry.id} bullets`).toBe(true)
      expect((entry.bullets ?? []).length, `projects.${entry.id} bullets`).toBeGreaterThan(0)
    }
    const ids = entries.map((entry) => entry.id)
    expect(new Set(ids).size, 'project ids are unique').toBe(ids.length)
  })

  it('labels every project link and points it at an https href', () => {
    for (const entry of data.sections.projects.entries) {
      for (const link of entry.links ?? []) {
        expect(link.label, `projects.${entry.id} link label`).toBeTruthy()
        expect(link.href, `projects.${entry.id} link href`).toMatch(/^https:\/\//)
      }
    }
  })

  it('keeps project inResume flags consistent with resumeTitle', () => {
    for (const entry of data.sections.projects.entries) {
      expect(typeof entry.inResume, `projects.${entry.id} inResume`).toBe('boolean')
      if (entry.inResume === true) {
        expect(entry.resumeTitle, `projects.${entry.id} resumeTitle`).toBeTruthy()
      }
    }
  })
})

describe('EN/ES structural parity', () => {
  it('has the same sections in the same order', () => {
    expect(Object.keys(content.es.sections)).toEqual(Object.keys(content.en.sections))
  })

  it('has the same contact ids in the same order', () => {
    expect(content.es.contacts.map((contact) => contact.id)).toEqual(
      content.en.contacts.map((contact) => contact.id),
    )
  })

  it('has the same skill group ids in the same order', () => {
    expect(content.es.sections.skills.groups.map((group) => group.id)).toEqual(
      content.en.sections.skills.groups.map((group) => group.id),
    )
  })

  it('has the same entry ids in the same order', () => {
    for (const key of ['experience', 'education', 'projects'] as const) {
      expect(content.es.sections[key].entries.map((entry) => entry.id), `sections.${key}`).toEqual(
        content.en.sections[key].entries.map((entry) => entry.id),
      )
    }
  })
})
