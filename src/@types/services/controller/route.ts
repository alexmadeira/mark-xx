import type { ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZRoutePage = z.custom<() => ReactNode>()
export const ZRouteParams = z.record(z.string(), z.string())
export const ZRoutePathname = z.string()

export const ZRoutePath = z.object({
  pathname: z.string(),
  element: ZRoutePage,
})

export const ZRouteProps = z.object({
  paths: z.array(ZRoutePath),
})

//
//
//
//

export type TRoutePage = z.infer<typeof ZRoutePage>
export type TRouteParams = z.infer<typeof ZRouteParams>
export type TRoutePathname = z.infer<typeof ZRoutePathname>

export type TRoutePath = z.infer<typeof ZRoutePath>

export type TRouteProps = z.infer<typeof ZRouteProps>
