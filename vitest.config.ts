import { defineConfig } from 'vitest/config'

import { alias } from './vite.alias'

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    dir: './src/__tests__',
    include: ['./**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    includeTaskLocation: true,
    coverage: {
      reporter: 'html-spa',
      include: ['src/**'],
      exclude: ['**/@types/**', '**/__tests__/**'],
    },
  },
  resolve: {
    alias,
  },
})
