import { z } from 'zod/v4'

import { AWARD_TYPES } from '_SRV/constant/award'

export const ZEAwardType = z.enum(AWARD_TYPES)

//
//
//
//

export type TEAwardType = z.infer<typeof ZEAwardType>
