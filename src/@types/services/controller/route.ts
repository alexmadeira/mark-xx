import type { RouteObject } from 'react-router-dom'

import { z } from 'zod'

import { ZDataGlobalPages, ZDataGlobalRoutes } from '../content-data/global'

export const ZRouteProps = z.object({
  routes: ZDataGlobalRoutes,
  pages: ZDataGlobalPages,
})

export const ZRoute = z.object({
  setRoute: z.function(z.tuple([z.string()])).returns(z.void()),
  routesObject: z.custom<RouteObject[]>(),
  pages: ZDataGlobalPages,
  routes: ZDataGlobalRoutes,
})

//
//
//
//

export type TRouteProps = z.infer<typeof ZRouteProps>
export type IRoute = z.infer<typeof ZRoute>
