import { ZELoaderStatus } from '@/enums/loader'

import { z } from 'zod/v4'

export const ZStoreLoaderLoaded = z.number().min(0).max(1).default(0)
export const ZStoreLoaderData = z.object({
  status: ZELoaderStatus,
  loaded: ZStoreLoaderLoaded,
})

export const ZStoreLoaderActions = z.object({
  setLoaded: z.custom<(loaded: z.infer<typeof ZStoreLoaderLoaded>) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZELoaderStatus>) => void>(),
})

export const ZStoreLoader = z.object({
  data: ZStoreLoaderData,
  actions: ZStoreLoaderActions,
})

//
//
//
//

export type TStoreLoaderData = z.infer<typeof ZStoreLoaderData>
export type TStoreLoaderActions = z.infer<typeof ZStoreLoaderActions>
export type TStoreLoader = z.infer<typeof ZStoreLoader>
