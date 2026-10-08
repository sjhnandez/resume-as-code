import type { Lang } from './types'

/** UI chrome strings (navigation, buttons) — content itself lives in the JSON. */
export interface UiStrings {
  skip: string
  navLabel: string
  nav: {
    about: string
    experience: string
    projects: string
    skills: string
    education: string
  }
  lang: {
    label: string
    en: string
    es: string
  }
  hero: {
    greeting: string
  }
  cv: {
    download: string
    other: string
  }
  footer: {
    built: string
    backToTop: string
  }
}

export const ui: Record<Lang, UiStrings> = {
  en: {
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
    },
    lang: { label: 'Language', en: 'EN', es: 'ES' },
    hero: { greeting: "Hello, I'm" },
    cv: { download: 'Download CV', other: 'CV in Spanish' },
    footer: {
      built: 'One JSON source → Typst PDFs + this React page. Auto-deployed on every commit.',
      backToTop: 'Back to top',
    },
  },
  es: {
    skip: 'Saltar al contenido',
    navLabel: 'Navegación principal',
    nav: {
      about: 'Perfil',
      experience: 'Experiencia',
      projects: 'Proyectos',
      skills: 'Habilidades',
      education: 'Educación',
    },
    lang: { label: 'Idioma', en: 'EN', es: 'ES' },
    hero: { greeting: 'Hola, soy' },
    cv: { download: 'Descargar CV', other: 'CV en inglés' },
    footer: {
      built: 'Una única fuente JSON → PDF en Typst + esta página React. Desplegado automáticamente con cada commit.',
      backToTop: 'Volver arriba',
    },
  },
}
