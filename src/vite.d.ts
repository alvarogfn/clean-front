/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "vitest-localstorage-mock";
