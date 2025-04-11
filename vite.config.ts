import { resolve } from "node:path"
import { defineConfig } from "vite"
import scssPlugin from "@csstools/postcss-sass"
import legacyPnpImporter from "pnp-sass-importer/legacy"
import scss from "postcss-scss"

const srcDir = resolve(__dirname, "src")
const distDir = resolve(__dirname, "dist")
const publicDir = resolve(__dirname, "public")

export default defineConfig({
  root: srcDir,
  publicDir: publicDir,
  base: "/univ-vis",
  build: {
    emptyOutDir: true,
    outDir: distDir,
    rollupOptions: {
      input: {
        'particle-filter': resolve(srcDir, "particle-filter", "index.html"),
        'q-learning': resolve(srcDir, "q-learning", "index.html"),
        '.': resolve(srcDir, "index.html")
      }
    }
  },
  css: {
    postcss: {
      syntax: scss,
      plugins: [
        scssPlugin({
          importer: legacyPnpImporter(__dirname)
        })
      ]
    }
  }
})