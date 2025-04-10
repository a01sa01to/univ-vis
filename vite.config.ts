import { resolve } from "node:path"
import { defineConfig } from "vite"

const srcDir = resolve(__dirname, "src")
const distDir = resolve(__dirname, "dist")
const publicDir = resolve(__dirname, "public")

export default defineConfig({
  root: srcDir,
  publicDir: publicDir,
  build: {
    emptyOutDir: true,
    outDir: distDir,
    rollupOptions: {
      input: {
        'particle-filter': resolve(srcDir, "particle-filter", "index.html"),
        'q-learning': resolve(srcDir, "q-learning", "index.html"),
      }
    }
  }
})