import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { splashScreen } from "vite-plugin-splash-screen";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splashScreen({
      logoSrc: "small-logo.svg",
      loaderType: "none",
      minDurationMs: 1000,
    }),
  ],
  server: {
    port: 3000,
  },
});
