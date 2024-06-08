interface ImportMetaEnv {
  readonly VITE_BACKEND_API_ENDPOINT: string
  readonly VITE_BASE_URL: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
