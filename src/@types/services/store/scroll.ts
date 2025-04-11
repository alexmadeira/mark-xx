import type { Scrolling } from 'lenis'

import { z } from 'zod'

export const ZStoreScrollDetails = z.object({
  limit: z.number(),
  isHorizontal: z.boolean(),
  actualScroll: z.number(),
  scroll: z.number(),
  progress: z.number(),
  isScrolling: z.custom<Scrolling>(),
  isStopped: z.boolean(),
  isLocked: z.boolean(),
  isSmooth: z.boolean(),
})

export const ZStoreScrollData = z.object({
  details: ZStoreScrollDetails,
})

export const ZStoreScrollActions = z.object({
  setDetails: z.function(z.tuple([ZStoreScrollDetails])).returns(z.void()),
})

export const ZStoreScroll = z.object({
  data: ZStoreScrollData,
  actions: ZStoreScrollActions,
})

//
//
//
//

export type TStoreScrollDetails = z.infer<typeof ZStoreScrollDetails>
export type TStoreScrollData = z.infer<typeof ZStoreScrollData>
export type TStoreScrollActions = z.infer<typeof ZStoreScrollActions>
export type TStoreScroll = z.infer<typeof ZStoreScroll>
