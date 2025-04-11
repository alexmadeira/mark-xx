import { z } from 'zod'

import { ZDataGlobalPages, ZDataGlobalRoutes } from '../content-data/global'

export const ZRouteProps = z.object({
  routes: ZDataGlobalRoutes,
  pages: ZDataGlobalPages,
})

//
//
//
//

export type TRouteProps = z.infer<typeof ZRouteProps>
