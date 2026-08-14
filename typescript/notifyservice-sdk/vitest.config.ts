import { defineConfig } from "vitest/config";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  define: {
    PKG_VERSION: JSON.stringify(pkg.version),
  },
});
