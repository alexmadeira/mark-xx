import { z } from 'zod/v4'

import { GLOBAL_COLORS } from '_SRV/constant/global'

export const ZEGlobalColos = z.enum(GLOBAL_COLORS)

//
//
//
//

export type TEGlobalColos = z.infer<typeof ZEGlobalColos>
