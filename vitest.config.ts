import { defineConfig } from 'vitest/config'

// Unit tests for the content pipeline (resume/data/*.json → src/content).
// Deliberately a separate config — Vitest prefers it over vite.config.ts — so
// running tests never loads the production build plugins. The tests are plain
// TS + JSON and need no app plugins; coverage is v8 with a text report for the
// log and JSON summaries for tooling (CI reads coverage-summary.json).
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary'],
    },
  },
})
