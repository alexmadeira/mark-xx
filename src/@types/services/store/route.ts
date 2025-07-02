import { z } from 'zod/v4'

import { ZDataGlobalRoute, ZDataGlobalRoutes } from '../content-data/global'

export const ZStoreRouteData = z.object({
  routes: ZDataGlobalRoutes,
  current: ZDataGlobalRoute,
})

export const ZStoreRouteActions = z.object({
  setRoutes: z.custom<(routes: z.infer<typeof ZDataGlobalRoutes>) => void>(),
  setCurrent: z.custom<(route: z.infer<typeof ZDataGlobalRoute>) => void>(),
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
