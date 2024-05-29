import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    root: "src",
    globals: true,
    passWithNoTests: true,
    environment: "node",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
    },
    watch: false,
  },
});
