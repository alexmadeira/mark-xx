import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    setupFiles: ['./src/__tests__/utils/setup/testing-library.ts'],
    reporters: ['verbose'],
    dir: './src/__tests__',

    include: ['./**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    includeTaskLocation: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit:node',
          environment: 'node',
          include: ['./unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: [
            './integration/**/*.{test,spec}.?(c|m)[jt]s?(x)',
            './unit/{app,components,pages,providers}/**/*.{test,spec}.?(c|m)[jt]s?(x)',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'unit:dom',
          environment: 'happy-dom',
          include: [
            './unit/{app,components,pages,providers}/**/*.{test,spec}.?(c|m)[jt]s?(x)',
          ],
          exclude: [
            './integration/**/*.{test,spec}.?(c|m)[jt]s?(x)',
            './unit/services/**/*.{test,spec}.?(c|m)[jt]s?(x)',
            './unit/emulator/**/*.{test,spec}.?(c|m)[jt]s?(x)',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration:node',
          environment: 'node',
          include: ['./integration/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: ['./unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['html-spa'],
      include: ['src/**'],
      exclude: [
        '**/@types/**',
        '**/__tests__/**',
        'src/services/controller/_defaults/**',
        'src/services/constant/**',
        'src/services/store/_defaults/**',
      ],
    },
  },
})
