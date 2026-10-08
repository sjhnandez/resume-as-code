# Resume sources (Typst, data-driven)

The CV PDFs are compiled from JSON: `data/en.json` (US Letter) and `data/es.json`
(A4) are the single source of truth — the same files feed the profile website.

## Files

- `data/en.json`, `data/es.json` — **the content. Edit these**, not the .typ files.
- `render.typ` — maps JSON onto the shared layout helpers (sections, entries,
  bullet lists, contact row). Also merges the website project cards flagged
  `inResume: true` back into the single reviewed CV entry.
- `template.typ` — layout: ATS-friendly single column, uppercase section
  headings, right-aligned dates, no graphics.
- `resume_en.typ` / `resume_es.typ` — thin wrappers (paper size + margins).
- `og.typ` — 1200×630 Open Graph card for link previews (built at deploy time).
- `fonts/` — Carlito (OFL, ≈ Calibri metrics) so Linux builds match the
  original Windows rendering. ATS-clean.

## Build

From the repo root (Docker required, host Typst not needed):

    npm run build:cv        # -> build/Sebastian_Hernandez_Resume_{EN,ES}.pdf + build/og.png

or a single file manually:

    docker run --rm -v "$PWD":/work -w /work --user $(id -u):$(id -g) \
      ghcr.io/typst/typst:latest \
      compile --font-path resume/fonts resume/resume_en.typ build/out.pdf

## ATS notes

- Single column, linear text order, no graphics/tables/text boxes.
- Standard section names, selectable text, embedded fonts.
- Date ranges use plain hyphens; keep em dashes out of resume content.
- Bullets stay one-sentence each; the website re-uses them verbatim.
