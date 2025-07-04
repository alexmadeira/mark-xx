import type { Nullish } from '@/utils/nullish'

import { z } from 'zod/v4'

export const ZStoreOverlapCollision = z.record(z.string(), z.string().nullish())

export const ZStoreOverlapData = z.object({
  collision: ZStoreOverlapCollision,
})

export const ZStoreOverlapActions = z.object({
  setCollision: z.custom<(target: string, props: Nullish<string>) => void>(),
})

export const ZStoreOverlap = z.object({
  data: ZStoreOverlapData,
  actions: ZStoreOverlapActions,
})

//
//
//
//

export type TStoreOverlapCollision = z.infer<typeof ZStoreOverlapCollision>
export type TStoreOverlapData = z.infer<typeof ZStoreOverlapData>
export type TStoreOverlapActions = z.infer<typeof ZStoreOverlapActions>
export type TStoreOverlap = z.infer<typeof ZStoreOverlap>
