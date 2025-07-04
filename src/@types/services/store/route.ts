import { z } from 'zod/v4'

export const ZStoreRouteData = z.object({
  current: z.string().optional(),
})

export const ZStoreRouteActions = z.object({
  setCurrent: z.custom<(path: string) => void>(),
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
