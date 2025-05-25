import { z } from 'zod'

export const ZStoreOverlapCollision = z.record(z.string(), z.string().optional())

export const ZStoreOverlapData = z.object({
  collision: ZStoreOverlapCollision,
})

export const ZStoreOverlapActions = z.object({
  setCollision: z.function(z.tuple([z.string(), z.string().nullish()])).returns(z.void()),
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
