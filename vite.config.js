import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js",
      name: "KsHybridTemplate",
      fileName: "hybrid-runtime",
      formats: ["es", "umd"]
    },
    outDir: "docs",
    emptyOutDir: false,
    sourcemap: false
  }
});
