#!/usr/bin/env bash
# Compile the Typst CV PDFs (EN = US Letter, ES = A4) and the OG card inside
# the official Typst container. Output lands in build/ (gitignored).
# docker pull ghcr.io/typst/typst:latest is the only prerequisite.
set -euo pipefail
cd "$(dirname "$0")/.."

TYPST_IMAGE="${TYPST_IMAGE:-ghcr.io/typst/typst:latest}"
mkdir -p build

typst() {
  # SOURCE_DATE_EPOCH pins Typst's embedded timestamps, making the PDF output
  # byte-deterministic: the content hash only changes when the content does.
  docker run --rm --user "$(id -u):$(id -g)" \
    -e SOURCE_DATE_EPOCH=0 \
    -v "$PWD":/work -w /work "$TYPST_IMAGE" "$@"
}

pdf_pages() {
  if command -v pdfinfo >/dev/null 2>&1; then
    pdfinfo "$1" 2>/dev/null | awk '/^Pages:/ { print $2 }'
  else
    echo "?"
  fi
}

echo "[cv] compiling EN (US Letter)…"
typst compile --font-path resume/fonts resume/resume_en.typ build/Sebastian_Hernandez_Resume_EN.pdf

echo "[cv] compiling ES (A4)…"
typst compile --font-path resume/fonts resume/resume_es.typ build/Sebastian_Hernandez_Resume_ES.pdf

echo "[cv] rendering OG card…"
typst compile --font-path resume/fonts --format png --ppi 96 resume/og.typ build/og.png

echo "[cv] done: EN $(pdf_pages build/Sebastian_Hernandez_Resume_EN.pdf) page(s), ES $(pdf_pages build/Sebastian_Hernandez_Resume_ES.pdf) page(s)"
