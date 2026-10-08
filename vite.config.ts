import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import en from './resume/data/en.json' with { type: 'json' }

// SEO/meta placeholders in index.html are filled from the same JSON that feeds
// the page and the CV PDFs, so the three outputs can never drift apart.
const meta = (en as { meta: { title: string; description: string; site: string } }).meta

function htmlMeta(): Plugin {
  const vars: Record<string, string> = {
    '%SITE_TITLE%': meta.title,
    '%SITE_DESCRIPTION%': meta.description,
    '%SITE_URL%': meta.site,
  }
  return {
    name: 'profile-html-meta',
    transformIndexHtml(html) {
      for (const [token, value] of Object.entries(vars)) {
        html = html.replaceAll(token, value)
      }
      return html
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlMeta()],
  build: {
    // deploy.sh builds into dist.new and atomically swaps it over dist/ so a
    // half-written build is never served.
    outDir: 'dist.new',
    emptyOutDir: true,
  },
})
