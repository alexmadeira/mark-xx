import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import version from 'vite-plugin-package-version'
import { VitePWA } from 'vite-plugin-pwa'

import { alias } from './vite.alias'

const buildDate = new Date()
  .toISOString()
  .replace(/[-:.Z]/g, '')
  .replace(/T/g, '.')

export default defineConfig({
  plugins: [
    version(),
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,mp4,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'github-api-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-cdn-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/mark-xx\.cdn\.prismic\.io\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mark-xx-api-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: { alias },
  define: {
    'import.meta.env.BUILD_VERSIO': JSON.stringify(buildDate),
  },
})
