import { z } from 'zod'

import { ZDataGlobalRoute, ZDataGlobalRoutes } from '../content-data/global'

export const ZStoreRouteData = z.object({
  routes: ZDataGlobalRoutes,
  current: ZDataGlobalRoute,
})

export const ZStoreRouteActions = z.object({
  setRoutes: z.function(z.tuple([ZDataGlobalRoutes])).returns(z.void()),
  setCurrent: z.function(z.tuple([ZDataGlobalRoute])).returns(z.void()),
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
