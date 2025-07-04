import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import { splashScreen } from "vite-plugin-splash-screen"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splashScreen({
      logoSrc: "splash-logo.svg",
      loaderType: "none",
      minDurationMs: 1000,
    }),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      manifest: {
        name: "Leser.Digital",
        short_name: "Leser",
        description:
          "Leser.Digital ist eine Plattform für digitale News-Inhalte.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
})
