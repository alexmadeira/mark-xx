import { z } from 'zod/v4'

import { ROUTE_TYPES } from '_SRV/constant/route'

export const ZERouteType = z.enum(ROUTE_TYPES)

//
//
//
//

export type TERouteType = z.infer<typeof ZERouteType>
