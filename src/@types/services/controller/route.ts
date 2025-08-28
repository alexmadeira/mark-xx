import { ZRoutePages } from '@/config/route/page'
import { ZRoutePath } from '@/config/route/path'

import { z } from 'zod/v4'

export const ZRoutePathname = z.string()

export const ZRouteProps = z.object({
  pages: ZRoutePages,
  paths: z.array(ZRoutePath),
})

//
//
//
//

export type TRoutePathname = z.infer<typeof ZRoutePathname>

export type TRouteProps = z.infer<typeof ZRouteProps>
