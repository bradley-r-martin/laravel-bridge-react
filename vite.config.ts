import { defineConfig } from "vite";
import { dirname } from "path";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/expose.ts"),
      name: "LaravelBridge React",
      formats: ["es", "umd"],
      fileName: "laravel-bridge-react",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
  },
});
