import solidjs from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solidjs(), tsconfigPaths()],
  test: {
    globals: true,
    passWithNoTests: true,
    environmentMatchGlobs: [
      ["**/*.(tsx,jsx)", "happy-dom"],
      ["**/*.ts", "node"],
    ],
    coverage: {
      reportOnFailure: true,
      cleanOnRerun: true,
      include: ["src/**/*"],
      exclude: ["src/main/**/*"],
      thresholds: {
        perFile: true,
      },
    },
    watch: false,
  },
});
