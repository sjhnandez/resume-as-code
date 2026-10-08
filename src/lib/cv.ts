import type { Lang } from '../content/types'

// Content-hashed filenames are injected at build time by scripts/deploy.sh so
// the download button always points at the newest compiled PDF. The fallback
// keeps `npm run dev` working before the first pipeline run.
export function cvUrl(lang: Lang): string {
  const hashed = lang === 'es' ? import.meta.env.VITE_CV_ES : import.meta.env.VITE_CV_EN
  return `/cv/${hashed ?? `cv-${lang}.pdf`}`
}

export function cvFilename(lang: Lang): string {
  return `Sebastian_Hernandez_Resume_${lang.toUpperCase()}.pdf`
}
