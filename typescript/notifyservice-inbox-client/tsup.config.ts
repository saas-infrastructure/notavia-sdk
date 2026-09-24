import { defineConfig } from "tsup";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  outDir: "dist",
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".js" }),
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  target: "es2020",
  platform: "browser",
  treeshake: true,
  define: { PKG_VERSION: JSON.stringify(pkg.version) },
});
