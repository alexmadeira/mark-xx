import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaUsageLanguage } from '@/services/schema/usage-language'

import { z } from 'zod/v4'

export const ZStoreFetcherUsageLanguageList = z.array(ZSchemaUsageLanguage)
export const ZStoreFetcherUsageLanguagesData = z.object({
  list: ZStoreFetcherUsageLanguageList,
  total: z.number(),
  status: ZEFetcherStatus,
})
export const ZStoreFetcherUsageLanguagesActions = z.object({
  setList: z.custom<(usageLanguages: z.infer<typeof ZStoreFetcherUsageLanguageList>) => void>(),
  setTotal: z.custom<(usageTotal: number) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherUsageLanguages = z.object({
  data: ZStoreFetcherUsageLanguagesData,
  actions: ZStoreFetcherUsageLanguagesActions,
})

//
//
//
//

export type TStoreFetcherUsageLanguageList = z.infer<typeof ZStoreFetcherUsageLanguageList>
export type TStoreFetcherUsageLanguagesData = z.infer<typeof ZStoreFetcherUsageLanguagesData>
export type TStoreFetcherUsageLanguagesActions = z.infer<typeof ZStoreFetcherUsageLanguagesActions>
export type TStoreFetcherUsageLanguages = z.infer<typeof ZStoreFetcherUsageLanguages>
