import type { ReactNode } from 'react'

import { ZEGlobalColos, ZEGlobalRouteCode } from '@/enums/global'

import { z } from 'zod/v4'

export const ZDataGlobalRouteColor = z.object({
  name: ZEGlobalColos,
  hex: z.string().regex(/^#[0-9A-F]{6}$/i),
  twVar: z.string().regex(/^--color-.+$/),
})

export const ZDataGlobalRouteHeader = z.object({
  className: z.string().optional(),
})

export const ZDataGlobalRoute = z.object({
  path: z.string(),
  code: ZEGlobalRouteCode,
  color: ZDataGlobalRouteColor,
  header: ZDataGlobalRouteHeader.optional(),
})

export const ZDataGlobalRoutes = z.array(ZDataGlobalRoute)

export const ZDataGlobalPages = z.record(ZEGlobalRouteCode, z.custom<() => ReactNode>())

//
//
//
//

export type TDataGlobalRoute = z.infer<typeof ZDataGlobalRoute>
export type TDataGlobalRoutes = z.infer<typeof ZDataGlobalRoutes>
export type TDataGlobalPages = z.infer<typeof ZDataGlobalPages>
