import { describe, expect, it } from 'vitest'
import { content, langs } from '../content'
import { badgesForRepo } from './badges'

// Guards the live status chips rendered under each GitHub link in Projects.tsx.
// The site loads badge images from img.shields.io at runtime, so a wrong owner
// or repo name would ship broken images with no build error — these tests pin
// the URL shapes for every repo the project cards link to.

// Repo → expected badge count: CI for all, plus coverage per repo.
const expectedCounts: Record<string, number> = {
  'homelab-ai-stack': 2,
  'subgen-gateway': 2,
  'routing-lab': 3,
  'homelab-terraform': 1,
  'resume-as-code': 2,
}

describe('badgesForRepo', () => {
  for (const [repo, count] of Object.entries(expectedCounts)) {
    it(`returns ${count} badges for ${repo}`, () => {
      const badges = badgesForRepo(`https://github.com/sjhnandez/${repo}`)
      expect(badges).toHaveLength(count)

      const workflowHref = `https://github.com/sjhnandez/${repo}/actions/workflows/ci.yml`
      const [ci, ...coverage] = badges
      expect(ci.src).toContain('img.shields.io')
      expect(ci.src).toContain(`/sjhnandez/${repo}/ci.yml`)
      expect(ci.alt).toBe('CI status')
      expect(ci.href).toBe(workflowHref)

      for (const badge of coverage) {
        expect(badge.src).toContain(`raw.githubusercontent.com/sjhnandez/${repo}/badges/`)
        expect(badge.alt).toBeTruthy()
        expect(badge.href).toBe(workflowHref)
      }
    })
  }

  it('points routing-lab coverage badges at the python and dashboard files', () => {
    const sources = badgesForRepo('https://github.com/sjhnandez/routing-lab').map((b) => b.src)
    const coverage = sources.slice(1)
    expect(coverage.some((src) => src.includes('coverage-python.json'))).toBe(true)
    expect(coverage.some((src) => src.includes('coverage-dashboard.json'))).toBe(true)
  })

  it('tolerates trailing slashes, queries, and fragments', () => {
    expect(badgesForRepo('https://github.com/sjhnandez/routing-lab/')).toHaveLength(3)
    expect(badgesForRepo('https://github.com/sjhnandez/routing-lab/?tab=readme')).toHaveLength(3)
    expect(badgesForRepo('https://github.com/sjhnandez/routing-lab#readme')).toHaveLength(3)
  })

  it('returns [] for unknown repos, other owners, and other hosts', () => {
    expect(badgesForRepo('https://github.com/sjhnandez/unknown-repo')).toEqual([])
    expect(badgesForRepo('https://github.com/someone-else/routing-lab')).toEqual([])
    expect(badgesForRepo('https://gitlab.com/sjhnandez/routing-lab')).toEqual([])
    expect(badgesForRepo('https://example.com')).toEqual([])
    expect(badgesForRepo('https://github.com')).toEqual([])
  })

  it('returns [] for non-URL input without throwing', () => {
    expect(badgesForRepo('not a url')).toEqual([])
    expect(badgesForRepo('')).toEqual([])
    expect(badgesForRepo('github.com/sjhnandez/routing-lab')).toEqual([])
  })
})

describe('resume data drift guard', () => {
  it('has a badge mapping for every sjhnandez GitHub link on the project cards', () => {
    for (const lang of langs) {
      for (const entry of content[lang].sections.projects.entries) {
        for (const link of entry.links ?? []) {
          if (!link.href.startsWith('https://github.com/sjhnandez/')) continue
          expect(
            badgesForRepo(link.href),
            `${lang}: projects.${entry.id} link ${link.href} needs a badge mapping`,
          ).not.toHaveLength(0)
        }
      }
    }
  })
})
