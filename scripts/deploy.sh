#!/usr/bin/env bash
# One-command deploy:
#   1. compile the CV PDFs + OG card (Docker Typst),
#   2. publish content-hashed copies under public/cv/ (keep newest 3),
#   3. build the site with the hashed filenames injected (Docker Node),
#   4. atomically swap dist.new over dist/.
# Run automatically by .githooks/post-commit, or manually: npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."

bash scripts/build-cv.sh

# Publish content-hashed PDFs and prune old builds (keep 3 per language).
mkdir -p public/cv
publish() { # publish <compiled-pdf> <slug> -> echoes published filename
  local src="$1" slug="$2" hash dest
  hash="$(sha256sum "$src" | cut -c1-8)"
  dest="public/cv/${slug}-${hash}.pdf"
  cp -f "$src" "$dest"
  ls -1t public/cv/"${slug}"-*.pdf | tail -n +4 | xargs -r rm -f
  printf '%s' "${slug}-${hash}.pdf"
}
CV_EN="$(publish build/Sebastian_Hernandez_Resume_EN.pdf cv-en)"
CV_ES="$(publish build/Sebastian_Hernandez_Resume_ES.pdf cv-es)"
cp -f build/og.png public/og.png

echo "[deploy] building site (VITE_CV_EN=$CV_EN VITE_CV_ES=$CV_ES)…"
VITE_CV_EN="$CV_EN" VITE_CV_ES="$CV_ES" bash scripts/node.sh npm run build

# Two renames instead of one build-in-place: nginx never sees a half-written site.
rm -rf dist.old
if [[ -d dist ]]; then mv dist dist.old; fi
mv dist.new dist
rm -rf dist.old

pages() {
  if command -v pdfinfo >/dev/null 2>&1; then
    pdfinfo "$1" 2>/dev/null | awk '/^Pages:/ { print $2 }'
  else
    echo "?"
  fi
}
echo "[deploy] live: /cv/$CV_EN ($(pages build/Sebastian_Hernandez_Resume_EN.pdf) page), /cv/$CV_ES ($(pages build/Sebastian_Hernandez_Resume_ES.pdf) page)"
echo "[deploy] done — check: curl -sI http://localhost:3002/ | head -1"
