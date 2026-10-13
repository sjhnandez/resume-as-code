# profile.superseb.xyz

[![CI](https://github.com/sjhnandez/resume-as-code/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/sjhnandez/resume-as-code/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/sjhnandez/resume-as-code/badges/coverage.json)](https://github.com/sjhnandez/resume-as-code/actions/workflows/ci.yml)

Single-page profile site + resume pipeline for Sebastian Hernandez.

**One canonical content source** — `resume/data/{en,es}.json` — generates both the
Typst CV PDFs and the React page, so the web page and the Download-CV buttons can
never show different versions.

## How it works

```
resume/data/en.json ──┬─► resume/render.typ ──► Typst ──► build/Sebastian_Hernandez_Resume_EN.pdf ─┐
resume/data/es.json ──┤                                              (A4)                          │ content-hash → public/cv/
                      │                                                                            v
                      └─► src/content (typed i18n) ──► Vite build ─────────────────────────► dist/ (served by nginx)
```

`scripts/deploy.sh` runs the whole chain and atomically swaps `dist.new` → `dist`.
`.githooks/post-commit` runs it on every commit (`core.hooksPath` is set to `.githooks`).

## Commands (Docker only — no host Node/Typst install needed)

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server in a Node container → http://localhost:5173 |
| `npm run deploy` | Full pipeline: compile CVs → hash → build site → swap |
| `npm run build:cv` | Just the Typst CV PDFs + OG card (output in `build/`) |
| `scripts/node.sh npm ci` | Install/refresh dependencies in the container |

First-time setup on a fresh clone:

```sh
git config core.hooksPath .githooks   # enable auto-deploy
scripts/node.sh npm ci                # install dependencies (Docker)
npm run deploy                        # first build
```

Skip the auto-deploy on a heavy/unsafe commit with `SKIP_DEPLOY=1 git commit ...`.

## Content editing

Edit `resume/data/en.json` / `es.json` — everything else is generated. The schema:

- `meta` (title/description for SEO — feeds `index.html` too), `name`, `role`, `contacts`
- `sections.profile.text` — the About paragraph
- `sections.skills.groups[]` — label + chips
- `sections.experience.entries[]` / `education.entries[]` — title/dates/org/meta/bullets
- `sections.projects.entries[]` — one entry per website card. Entries with
  `"inResume": true` are merged into the single CV entry titled by `resumeTitle`;
  `summary`/`tags`/`links` are site-only extras. `"inResume": false` entries
  (`Resume as Code`) appear only on the site.

EN stays US Letter, ES stays A4. PDF layout lives in `resume/template.typ`;
JSON → Typst mapping in `resume/render.typ`.

## Deployment

- `apps/docker-compose.yaml` → `apps-profile` (nginx:alpine, `3002:80`) serves
  `profile/dist` with `nginx.conf` (immutable hashed assets + PDFs, no-cache shell).
- `network/terraform/terraform.tfvars` → apps tunnel route
  `profile.superseb.xyz → http://apps-profile:80` (public; Cloudflare Access
  covers only the admin services).

## Fonts

`resume/fonts/` bundles Carlito (OFL, metrically compatible with Calibri) so the
PDF build is deterministic on Linux. The site uses Space Grotesk / Inter /
JetBrains Mono via @fontsource variable packages.
