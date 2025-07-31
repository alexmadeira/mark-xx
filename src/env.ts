import { z } from 'zod/v4'

const ZEnvGlobal = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export const ZEnvClient = ZEnvGlobal.extend({
  VITE_STORAGE_KEY: z.string().default('ALEX_MADEIRA::storage'),
  VITE_QUERY_GC_TIME: z.coerce.number().default(1000 * 60 * 60 * 24), // 24 hours
  VITE_QUERY_CLIENT_STALE_TIME: z.coerce.number().default(1000 * 60 * 5), // 5 minutes

  BASE_URL: z.string(),
  DEV: z.coerce.boolean(),
  MODE: z.enum(['development', 'production']),
  PROD: z.coerce.boolean(),
  SSR: z.coerce.boolean(),
})
export const env = ZEnvClient.parse(import.meta.env)
