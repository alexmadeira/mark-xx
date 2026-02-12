import { ZGithubRepositoryDirection, ZGithubRepositorySort, ZGithubRepositoryType } from '@/github/repository'

import { z } from 'zod/v4'

export const ZRepositoriesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZRepositoriesFetcherParams = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
  sort: ZGithubRepositorySort.optional(),
  type: ZGithubRepositoryType.optional(),
  direction: ZGithubRepositoryDirection.optional(),
})

export const ZRepositoriesFetcherProps = z.object({
  params: ZRepositoriesFetcherParams.optional(),
  callback: ZRepositoriesFetcherCallback.optional(),
})

//
//
//

export type TRepositoriesFetcherCallback = z.infer<typeof ZRepositoriesFetcherCallback>
export type TRepositoriesFetcherParams = z.infer<typeof ZRepositoriesFetcherParams>
export type TRepositoriesFetcherProps = z.infer<typeof ZRepositoriesFetcherProps>
