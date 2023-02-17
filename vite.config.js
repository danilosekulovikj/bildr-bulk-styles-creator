// vite.config.js

module.exports = {
  build: {
    target: "es2015",
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "./src/main.js",
      output: {
        entryFileNames: "main.min.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
      },
    },
  },
};
