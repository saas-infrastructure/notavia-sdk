import { defineConfig } from "tsup";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  entry: ["src/index.ts", "src/inbox/index.ts", "src/prefs/index.ts", "src/webhooks/index.ts"],
  format: ["esm", "cjs"],
  outDir: "dist",
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".js" }),
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  target: "node20",
  treeshake: true,
  define: {
    PKG_VERSION: JSON.stringify(pkg.version),
  },
});
