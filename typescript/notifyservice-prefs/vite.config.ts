import { defineConfig } from "vite";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  define: { PKG_VERSION: JSON.stringify(pkg.version) },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "NotifyServicePrefs",
      fileName: (fmt) => `notifyservice-prefs.${fmt === "es" ? "es.js" : "umd.js"}`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
    sourcemap: true,
    target: "es2020",
  },
});
