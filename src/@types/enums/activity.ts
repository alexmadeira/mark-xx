import { z } from 'zod/v4'

import { ACTIVITY_STATUS } from '_SRV/constant/activity'

export const ZEActivityStatus = z.enum(ACTIVITY_STATUS)

//
//
//
//

export type TEActivityStatus = z.infer<typeof ZEActivityStatus>
