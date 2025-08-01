import { z } from 'zod'

import { API_REQUESTER_METHODS } from '_SRV/constant/requester'

export const ZERequesterMethod = z.enum(API_REQUESTER_METHODS)

//
//
//
//

export type TERequesterMethod = z.infer<typeof ZERequesterMethod>
