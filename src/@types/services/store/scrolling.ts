import type { Scrolling } from 'lenis'

import { z } from 'zod/v4'

export const ZStoreScrollingDetails = z.object({
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

export const ZStoreScrollingData = z.object({
  details: ZStoreScrollingDetails,
})

export const ZStoreScrollingActions = z.object({
  setDetails: z.custom<(details: z.infer<typeof ZStoreScrollingDetails>) => void>(),
})

export const ZStoreScrolling = z.object({
  data: ZStoreScrollingData,
  actions: ZStoreScrollingActions,
})

//
//
//
//

export type TStoreScrollingDetails = z.infer<typeof ZStoreScrollingDetails>
export type TStoreScrollingData = z.infer<typeof ZStoreScrollingData>
export type TStoreScrollingActions = z.infer<typeof ZStoreScrollingActions>
export type TStoreScrolling = z.infer<typeof ZStoreScrolling>
