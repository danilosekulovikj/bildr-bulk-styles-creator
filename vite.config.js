// vite.config.js

module.exports = {
  build: {
    target: "es2015",
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "./src/main.js",
    },
  },
};
