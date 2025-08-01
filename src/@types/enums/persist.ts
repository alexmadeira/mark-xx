import { z } from 'zod'

import { PERSIST_CACHE_STATUS, PERSIST_CLIENT_STATUS } from '_SRV/constant/persist'

export const ZEPersistCacheStatus = z.enum(PERSIST_CACHE_STATUS)
export const ZEPersistClientStatus = z.enum(PERSIST_CLIENT_STATUS)

//
//
//
//

export type TEPersistCacheStatus = z.infer<typeof ZEPersistCacheStatus>
export type TEPersistClientStatus = z.infer<typeof ZEPersistClientStatus>
