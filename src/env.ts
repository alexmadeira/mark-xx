import { z } from 'zod/v4'

const ZEnvGlobal = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export const ZEnvClient = ZEnvGlobal.extend({
  PACKAGE_VERSION: z.string().default('0.0.0'),
  BUILD_VERSIO: z.string().default('19901002_000000000'),

  VITE_VERONICA_API: z.url().default('http://localhost:3001/api/'),

  VITE_STORAGE_KEY: z.string().default('ALEX_MADEIRA::storage'),
  VITE_QUERY_GC_TIME: z.coerce.number().default(1000 * 60 * 60 * 24), // 24 hours
  VITE_QUERY_CLIENT_STALE_TIME: z.coerce.number().default(1000 * 60 * 5), // 5 minutes

  VITE_PRISMIC_REPOSITORY_NAME: z.string(),
  VITE_PRISMIC_CUSTOM_TYPES_TOKEN: z.string(),
  VITE_PRISMIC_ACCESS_TOKEN: z.string(),

  BASE_URL: z.string(),
  DEV: z.coerce.boolean(),
  MODE: z.enum(['development', 'production']),
  PROD: z.coerce.boolean(),
  SSR: z.coerce.boolean(),
})

export const env = ZEnvClient.parse(import.meta.env)
