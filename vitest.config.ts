import solidjs from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solidjs(), tsconfigPaths()],
  test: {
    root: "src",
    globals: true,
    passWithNoTests: true,
    environmentMatchGlobs: [
      ['**\/*.(tsx,jsx)', 'happy-dom'],
      ['**\/*.ts', 'node'],
    ],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
    },
    watch: false,
  },
});
