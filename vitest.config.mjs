import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  esbuild: {
    jsx: "automatic"
  },
  resolve: {
    alias: { "@": path.resolve(process.cwd(), ".") }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    include: ["tests/**/*.{test,spec}.{js,jsx}"],
    exclude: ["tests/e2e/**"],
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
