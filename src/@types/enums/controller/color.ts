import { z } from 'zod'

import { COLOR_DEFAULT_KEYS } from '_SRV/constant/controller/color'

export const ZEColorDefaultKey = z.enum(COLOR_DEFAULT_KEYS)

//
//
//
//

export type TEColorDefaultKey = z.infer<typeof ZEColorDefaultKey>
