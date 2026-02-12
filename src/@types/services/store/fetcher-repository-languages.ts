import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaGithubRepositoryLanguage } from '@/services/schema/github-repository-language'

import { z } from 'zod/v4'

export const ZStoreFetcherRepositoryLanguage = z.object({
  ...ZSchemaGithubRepositoryLanguage.shape,
  libs: ZSchemaGithubRepositoryLanguage.array(),
})

export const ZStoreFetcherRepositoryLanguagesData = z.object({
  list: z.record(z.string(), ZStoreFetcherRepositoryLanguage.array()),
  status: ZEFetcherStatus,
  totalUsage: z.number(),
  languageUsage: ZStoreFetcherRepositoryLanguage.array(),
})
export const ZStoreFetcherRepositoryLanguagesActions = z.object({
  setList: z.custom<(repository: string, languages: z.infer<typeof ZStoreFetcherRepositoryLanguage>[]) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherRepositoryLanguages = z.object({
  data: ZStoreFetcherRepositoryLanguagesData,
  actions: ZStoreFetcherRepositoryLanguagesActions,
})

//
//
//
//

export type TStoreFetcherRepositoryLanguage = z.infer<typeof ZStoreFetcherRepositoryLanguage>
export type TStoreFetcherRepositoryLanguagesData = z.infer<typeof ZStoreFetcherRepositoryLanguagesData>
export type TStoreFetcherRepositoryLanguagesActions = z.infer<typeof ZStoreFetcherRepositoryLanguagesActions>
export type TStoreFetcherRepositoryLanguages = z.infer<typeof ZStoreFetcherRepositoryLanguages>
