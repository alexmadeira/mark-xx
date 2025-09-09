import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import version from 'vite-plugin-package-version'

import { alias } from './vite.alias'

const buildDate = new Date()
  .toISOString()
  .replace(/[-:.Z]/g, '')
  .replace(/T/g, '.')

export default defineConfig({
  plugins: [version(), tailwindcss(), react()],
  resolve: { alias },
  define: {
    'import.meta.env.BUILD_VERSIO': JSON.stringify(buildDate),
  },
})
