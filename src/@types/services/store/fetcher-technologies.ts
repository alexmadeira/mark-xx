import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaTechnology } from '@/services/schema/technology'

import { z } from 'zod/v4'

export const ZStoreFetcherTechnologyList = z.array(ZSchemaTechnology)
export const ZStoreFetcherTechnologiesData = z.object({
  list: ZStoreFetcherTechnologyList,
  status: ZEFetcherStatus,
})
export const ZStoreFetcherTechnologiesActions = z.object({
  setList: z.custom<(awards: z.infer<typeof ZStoreFetcherTechnologyList>) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherTechnologies = z.object({
  data: ZStoreFetcherTechnologiesData,
  actions: ZStoreFetcherTechnologiesActions,
})

//
//
//
//

export type TStoreFetcherTechnologieList = z.infer<typeof ZStoreFetcherTechnologyList>
export type TStoreFetcherTechnologiesData = z.infer<typeof ZStoreFetcherTechnologiesData>
export type TStoreFetcherTechnologiesActions = z.infer<typeof ZStoreFetcherTechnologiesActions>
export type TStoreFetcherTechnologies = z.infer<typeof ZStoreFetcherTechnologies>
