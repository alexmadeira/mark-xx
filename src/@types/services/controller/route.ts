import { ZRoutePages } from '@/config/route/page'
import { ZRoutePath } from '@/config/route/path'

import { z } from 'zod/v4'

export const ZRouteProps = z.object({
  pages: ZRoutePages,
  paths: z.array(ZRoutePath),
})

//
//
//
//

export type TRouteProps = z.infer<typeof ZRouteProps>
