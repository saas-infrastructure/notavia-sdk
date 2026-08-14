import { defineConfig } from "vite";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  define: { PKG_VERSION: JSON.stringify(pkg.version) },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "NotifyServiceInbox",
      fileName: (fmt) => `notifyservice-inbox.${fmt === "es" ? "es.js" : "umd.js"}`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["@microsoft/signalr"],
      output: { globals: { "@microsoft/signalr": "signalR" } },
    },
    sourcemap: true,
    target: "es2020",
  },
});
