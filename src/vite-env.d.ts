/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Hashed CV filename for the English PDF, injected by scripts/deploy.sh. */
  readonly VITE_CV_EN?: string
  /** Hashed CV filename for the Spanish PDF, injected by scripts/deploy.sh. */
  readonly VITE_CV_ES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
