import { ZEGlobalRouteCode } from '@/enums/global'

import { z } from 'zod/v4'

export const ZStoreRouteData = z.object({
  current: ZEGlobalRouteCode.optional(),
})

export const ZStoreRouteActions = z.object({
  setCurrent: z.custom<(code: z.infer<typeof ZEGlobalRouteCode>) => void>(),
})

export const ZStoreRoute = z.object({
  data: ZStoreRouteData,
  actions: ZStoreRouteActions,
})

//
//
//
//

export type TStoreRouteData = z.infer<typeof ZStoreRouteData>
export type TStoreRouteActions = z.infer<typeof ZStoreRouteActions>
export type TStoreRoute = z.infer<typeof ZStoreRoute>
