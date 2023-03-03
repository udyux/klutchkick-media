/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YT_API_KEY: string;
  readonly VITE_YT_CHANNEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
