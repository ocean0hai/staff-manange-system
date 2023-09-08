// uno.config.ts
import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import transformerDirectives from "@unocss/transformer-directives";
export default defineConfig({
  // ...UnoCSS options
  content: {
    pipeline: {
      exclude: [
        "node_modules",
        "dist",
        ".git",
        ".husky",
        ".vscode",
        "public",
        "build",
        "mock",
        "./stats.html",
      ],
    },
  },
  presets: [presetUno({ dark: "class" })],
  transformers: [transformerDirectives()],
});
