export type RepoBadge = { src: string; href: string; alt: string }

// Live status chips shown under each GitHub link on the project cards. Only
// github.com links owned by sjhnandez get badges; every other href (other
// hosts, other owners, unknown repos, malformed input) yields none and the
// card renders without a badge row. The CI workflow URL doubles as the href
// for every badge — the icons are decorative pointers into the same run list.
const CI_WORKFLOW_HREF = (repo: string) =>
  `https://github.com/sjhnandez/${repo}/actions/workflows/ci.yml`

// Coverage badge files published by each repo's CI to its `badges` branch.
// An empty list means the repo gets the CI badge only; a repo absent from
// this map gets no badges at all (and shows no badge row on its card).
const COVERAGE_FILES: Record<string, { file: string; alt: string }[]> = {
  'homelab-ai-stack': [{ file: 'coverage.json', alt: 'Test coverage' }],
  'subgen-gateway': [{ file: 'coverage.json', alt: 'Test coverage' }],
  'routing-lab': [
    { file: 'coverage-python.json', alt: 'Python coverage' },
    { file: 'coverage-dashboard.json', alt: 'Dashboard coverage' },
  ],
  'homelab-terraform': [],
  'resume-as-code': [{ file: 'coverage.json', alt: 'Test coverage' }],
}

export function badgesForRepo(href: string): RepoBadge[] {
  let url: URL
  try {
    url = new URL(href)
  } catch {
    return []
  }
  if (url.hostname !== 'github.com') return []

  // Tolerate trailing slashes, queries, and fragments; anything deeper than
  // /<owner>/<repo> is ignored so sub-page links keep their badges.
  const [owner, repo] = url.pathname.split('/').filter(Boolean)
  if (owner !== 'sjhnandez' || !repo || !(repo in COVERAGE_FILES)) return []

  const ci: RepoBadge = {
    src: `https://img.shields.io/github/actions/workflow/status/sjhnandez/${repo}/ci.yml?branch=main&style=flat-square&label=ci`,
    href: CI_WORKFLOW_HREF(repo),
    alt: 'CI status',
  }
  const coverage = COVERAGE_FILES[repo].map(({ file, alt }) => ({
    src: `https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/sjhnandez/${repo}/badges/${file}&style=flat-square`,
    href: CI_WORKFLOW_HREF(repo),
    alt,
  }))
  return [ci, ...coverage]
}
