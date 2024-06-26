import { defineConfig } from "vite";
import solidjs from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [solidjs(), tsconfigPaths()],
  root: ".",
  server: {
    port: 8080,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      external: ["solid-js", "axios"],
      output: {
        paths: {
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.8.17/+esm",
          axios: "https://cdn.jsdelivr.net/npm/axios@1.7.2/dist/axios.min.js",
        },
      },
    },
  },
});
