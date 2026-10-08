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
      backToTop: 'Volver arriba',
    },
  },
}
