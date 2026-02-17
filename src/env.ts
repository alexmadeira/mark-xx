import { z } from 'zod/v4'

const ZEnvGlobal = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const ZStringArray = z
  .string()
  .transform((str) =>
    str
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .default([])

export const ZEnvClient = ZEnvGlobal.extend({
  PACKAGE_VERSION: z.string().default('0.0.0'),
  BUILD_VERSIO: z.string().default('19901002_000000000'),

  VITE_ROOT_URL: z.url().default('http://localhost:5173/'),

  VITE_VERONICA_API: z.url().default('http://localhost:3001/api/'),

  VITE_EASTERE_EGG_RESET_DELAY: z.coerce.number().default(1000),

  VITE_GITHUB_API: z.url().default('https://api.github.com/'),
  VITE_GITHUB_ACCESS_TOKEN: z.string(),
  VITE_GITHUB_OMIT_LANGUAGES: ZStringArray,
  VITE_GITHUB_OMIT_REPOSITORY: ZStringArray,
  VITE_GITHUB_TOTAL_REPOSITORIES: z.coerce.number().default(20),

  VITE_STORAGE_KEY: z.string().default('ALEX_MADEIRA::storage'),
  VITE_QUERY_GC_TIME: z.coerce.number().default(1000 * 60 * 60 * 24), // 24 hours
  VITE_QUERY_CLIENT_STALE_TIME: z.coerce.number().default(1000 * 60 * 5), // 5 minutes

  VITE_PRISMIC_REPOSITORY_NAME: z.string(),
  VITE_PRISMIC_ACCESS_TOKEN: z.string(),

  BASE_URL: z.string(),
  DEV: z.coerce.boolean(),
  MODE: z.enum(['development', 'production']),
  PROD: z.coerce.boolean(),
  SSR: z.coerce.boolean(),
})

export const env = ZEnvClient.parse(import.meta.env)
