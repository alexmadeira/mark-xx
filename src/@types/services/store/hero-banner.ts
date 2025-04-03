import { ZDataTechnology } from '@/services/content-data/technologies'

import { z } from 'zod'

export const ZStoreHeroBannerConfig = z.object({
  delay: z.number(),
  speed: z.number(),
  deletionSpeed: z.number(),
})

export const ZStoreHeroBannerData = z.object({
  current: ZDataTechnology,
  config: ZStoreHeroBannerConfig,
})

export const ZStoreHeroBannerActions = z.object({
  setCurrent: z.function(z.tuple([ZDataTechnology])).returns(z.void()),
})

export const ZStoreHeroBanner = z.object({
  data: ZStoreHeroBannerData,
  actions: ZStoreHeroBannerActions,
})

//
//
//
//

export type TStoreHeroBannerConfig = z.infer<typeof ZStoreHeroBannerConfig>
export type TStoreHeroBannerData = z.infer<typeof ZStoreHeroBannerData>
export type TStoreHeroBannerActions = z.infer<typeof ZStoreHeroBannerActions>
export type TStoreHeroBanner = z.infer<typeof ZStoreHeroBanner>
