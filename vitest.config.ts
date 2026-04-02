import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    reporters: ['verbose'],
    dir: './src/__tests__',

    include: ['./**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    includeTaskLocation: true,
    coverage: {
      provider: 'v8',
      reporter: ['html-spa'],
      include: ['src/**'],
      exclude: ['**/@types/**', '**/__tests__/**'],
    },
  },
})
