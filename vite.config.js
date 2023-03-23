// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: "es2015",
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/main.js'),
      name: 'bulk_style_creator',
      // the proper extensions will be added
      fileName: 'bulk_style_creator',
    },
  },
});
