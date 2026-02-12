import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaGithubRepository } from '@/services/schema/github-repository'

import { z } from 'zod/v4'

export const ZStoreFetcherRepository = ZSchemaGithubRepository

export const ZStoreFetcherRepositoriesData = z.object({
  status: ZEFetcherStatus,
  list: ZStoreFetcherRepository.array(),
})
export const ZStoreFetcherRepositoriesActions = z.object({
  setList: z.custom<(repositories: z.infer<typeof ZStoreFetcherRepository>[]) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherRepositories = z.object({
  data: ZStoreFetcherRepositoriesData,
  actions: ZStoreFetcherRepositoriesActions,
})

//
//
//
//

export type TStoreFetcherRepository = z.infer<typeof ZStoreFetcherRepository>
export type TStoreFetcherRepositoriesData = z.infer<typeof ZStoreFetcherRepositoriesData>
export type TStoreFetcherRepositoriesActions = z.infer<typeof ZStoreFetcherRepositoriesActions>
export type TStoreFetcherRepositories = z.infer<typeof ZStoreFetcherRepositories>
