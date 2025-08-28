import { ZERouteType } from '@/enums/route'

import { z } from 'zod/v4'

export const ZRoutePathColor = z.object({
  hex: z.string(),
  twVar: z.string(),
})
export const ZRoutePath = z.object({
  pathname: z.string(),
  type: ZERouteType,
  color: ZRoutePathColor,
})
export const ZRouteParams = z.partialRecord(ZERouteType, z.array(z.string()))

//
//
//
//

export type TRoutePathColor = z.infer<typeof ZRoutePathColor>
export type TRoutePath = z.infer<typeof ZRoutePath>
export type TRouteParams = z.infer<typeof ZRouteParams>
