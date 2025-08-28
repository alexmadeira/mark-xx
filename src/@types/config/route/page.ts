import type { ReactNode } from 'react'

import { ZERouteType } from '@/enums/route'

import { z } from 'zod/v4'

export const ZRoutePage = z.custom<() => ReactNode>()
export const ZRoutePages = z.record(ZERouteType, ZRoutePage)

//
//
//
//

export type TRoutePage = z.infer<typeof ZRoutePage>
export type TRoutePages = z.infer<typeof ZRoutePages>
