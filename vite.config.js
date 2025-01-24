import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

export const viteConfigObj = {
  resolve: {
    alias: {
      _: path.resolve(__dirname, "src"),
    },
  },
};
