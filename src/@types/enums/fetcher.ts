import { z } from 'zod/v4'

import { FETCHER_STATUS } from '_SRV/constant/fetcher'

export const ZEFetcherStatus = z.enum(FETCHER_STATUS)

//
//
//
//

export type TEFetcherStatus = z.infer<typeof ZEFetcherStatus>
