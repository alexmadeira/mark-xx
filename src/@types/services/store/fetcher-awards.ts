import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaAward } from '@/services/schema/award'

import { z } from 'zod/v4'

export const ZStoreFetcherAwardList = z.array(ZSchemaAward)
export const ZStoreFetcherAwardsData = z.object({
  list: ZStoreFetcherAwardList,
  status: ZEFetcherStatus,
})
export const ZStoreFetcherAwardsActions = z.object({
  setList: z.custom<(awards: z.infer<typeof ZStoreFetcherAwardList>) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherAwards = z.object({
  data: ZStoreFetcherAwardsData,
  actions: ZStoreFetcherAwardsActions,
})

//
//
//
//

export type TStoreFetcherAwardList = z.infer<typeof ZStoreFetcherAwardList>
export type TStoreFetcherAwardsData = z.infer<typeof ZStoreFetcherAwardsData>
export type TStoreFetcherAwardsActions = z.infer<typeof ZStoreFetcherAwardsActions>
export type TStoreFetcherAwards = z.infer<typeof ZStoreFetcherAwards>
