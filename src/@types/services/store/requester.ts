import { ZERequesterCacheStatus } from '@/enums/requester'

import { z } from 'zod/v4'

export const ZStoreRequesterCache = z.object({
  restoreStatus: ZERequesterCacheStatus,
  restored: z.boolean(),
  empty: z.boolean(),
})

export const ZStoreRequesterData = z.object({
  cache: ZStoreRequesterCache,
})

export const ZStoreRequesterActions = z.object({
  setCacheStatus: z.custom<(status: z.infer<typeof ZERequesterCacheStatus>) => void>(),
})

export const ZStoreRequester = z.object({
  data: ZStoreRequesterData,
  actions: ZStoreRequesterActions,
})

//
//
//
//

export type TStoreRequesterData = z.infer<typeof ZStoreRequesterData>
export type TStoreRequesterActions = z.infer<typeof ZStoreRequesterActions>
export type TStoreRequester = z.infer<typeof ZStoreRequester>
