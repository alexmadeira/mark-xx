import { ZEHeroStatus } from '@/enums/hero'

import { z } from 'zod/v4'

export const ZStoreHeroStatus = z.object({
  current: ZEHeroStatus,
  loaded: z.boolean(),
  loading: z.boolean(),
  error: z.boolean(),
})

export const ZStoreHeroCurrentProps = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  banner: z.string(),
  type: z.string(),
})

export const ZStoreHeroCurrent = z.object({
  typing: z.string(),
  content: ZStoreHeroCurrentProps,
})

export const ZStoreHeroData = z.object({
  status: ZStoreHeroStatus,
  current: ZStoreHeroCurrent,
})

export const ZStoreHeroActions = z.object({
  setStatus: z.custom<(status: z.infer<typeof ZEHeroStatus>) => void>(),
  setCurrent: z.custom<(typing: string, content: z.infer<typeof ZStoreHeroCurrentProps>) => void>(),
})

export const ZStoreHero = z.object({
  data: ZStoreHeroData,
  actions: ZStoreHeroActions,
})

//
//
//
//

export type TStoreHeroData = z.infer<typeof ZStoreHeroData>
export type TStoreHeroActions = z.infer<typeof ZStoreHeroActions>
export type TStoreHero = z.infer<typeof ZStoreHero>
