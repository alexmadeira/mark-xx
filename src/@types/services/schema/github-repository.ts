import { ZGithubRepository, ZGithubRepositoryParams } from '@/github/repository'

import { z } from 'zod/v4'

export const ZRawSchemaGithubRepository = ZGithubRepository
export const ZSchemaGithubRepositoryParams = ZGithubRepositoryParams

export const ZSchemaGithubRepository = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  owner: z.string(),
  private: z.boolean(),
  language: z.string().nullish(),
  pushedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

//
//
//
//

export type TRawSchemaGithubRepository = z.infer<typeof ZRawSchemaGithubRepository>
export type TSchemaGithubRepositoryParams = z.infer<typeof ZSchemaGithubRepositoryParams>
export type TSchemaGithubRepository = z.infer<typeof ZSchemaGithubRepository>
