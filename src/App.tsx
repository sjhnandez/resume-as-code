import { MotionConfig } from 'motion/react'
import { ui } from './content/ui'
import { LanguageProvider, useLang } from './lib/lang'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Footer } from './components/Footer'
import { Seo } from './components/Seo'

function Page() {
  const { lang } = useLang()
  return (
    <MotionConfig reducedMotion="user">
      <Seo />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        {ui[lang].skip}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  )
}
