import type { ReactNode } from 'react'

import { ZEGlobalColos, ZEGlobalRouteCode } from '@/enums/global'

import { z } from 'zod'

export const ZDataGlobalRoute = z.object({
  path: z.string(),
  code: ZEGlobalRouteCode,
  color: z.object({
    name: ZEGlobalColos,
    hex: z.string().regex(/^#[0-9A-F]{6}$/i),
    twVar: z.string().regex(/^--color-.+$/),
  }),
})

export const ZDataGlobalRoutes = z.array(ZDataGlobalRoute)

export const ZDataGlobalPages = z
  .record(ZEGlobalRouteCode, z.function().returns(z.custom<ReactNode | null>()))
  .refine((obj): obj is Required<typeof obj> => ZEGlobalRouteCode.options.every((key) => obj[key] !== null))

//
//
//
//

export type TDataGlobalRoute = z.infer<typeof ZDataGlobalRoute>
export type TDataGlobalRoutes = z.infer<typeof ZDataGlobalRoutes>
export type TDataGlobalPages = z.infer<typeof ZDataGlobalPages>
