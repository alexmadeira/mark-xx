import { z } from 'zod'

import { REQUESTER_CACHE_STATUS, REQUESTER_METHODS } from '_SRV/constant/requester'

export const ZERequesterMethod = z.enum(REQUESTER_METHODS)
export const ZERequesterCacheStatus = z.enum(REQUESTER_CACHE_STATUS)

//
//
//
//

export type TERequesterMethod = z.infer<typeof ZERequesterMethod>
export type TERequesterCacheStatus = z.infer<typeof ZERequesterCacheStatus>
