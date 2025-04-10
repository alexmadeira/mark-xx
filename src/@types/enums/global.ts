import { z } from 'zod'

import { GLOBAL_COLORS, GLOBAL_ROUTE_CODES } from '_SRV/constant/global'

export const ZEGlobalRouteCode = z.enum(GLOBAL_ROUTE_CODES)
export const ZEGlobalColos = z.enum(GLOBAL_COLORS)

//
//
//
//

export type TEGlobalRouteCode = z.infer<typeof ZEGlobalRouteCode>
export type TEGlobalColos = z.infer<typeof ZEGlobalColos>
