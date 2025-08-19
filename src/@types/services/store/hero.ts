import { ZEFetcherStatus } from '@/enums/fetcher'

import { z } from 'zod/v4'

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
  status: ZEFetcherStatus,
  current: ZStoreHeroCurrent,
})

export const ZStoreHeroActions = z.object({
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
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
