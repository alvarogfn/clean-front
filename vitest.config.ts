import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: "src",
    globals: true,
    environment: "node",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
    },
    watch: false,
  },
});
