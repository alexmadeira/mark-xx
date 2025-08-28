import { z } from 'zod/v4'

export const ZStoreRouteParams = z.record(z.string(), z.string())

export const ZStoreRouteData = z.object({
  current: z.string().optional(),
  params: ZStoreRouteParams,
})

export const ZStoreRouteActions = z.object({
  setCurrent: z.custom<(path: string) => void>(),
  setParams: z.custom<(params: z.Infer<typeof ZStoreRouteParams>) => void>(),
})

export const ZStoreRoute = z.object({
  data: ZStoreRouteData,
  actions: ZStoreRouteActions,
})

//
//
//
//

export type TStoreRouteParams = z.infer<typeof ZStoreRouteParams>
export type TStoreRouteData = z.infer<typeof ZStoreRouteData>
export type TStoreRouteActions = z.infer<typeof ZStoreRouteActions>
export type TStoreRoute = z.infer<typeof ZStoreRoute>
