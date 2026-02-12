import { z } from 'zod/v4'

import { ZGithubUser } from './user'

export const ZGithubRepositorySort = z.enum(['created', 'updated', 'pushed', 'full_name'])
export const ZGithubRepositoryType = z.enum(['all', 'owner', 'member'])
export const ZGithubRepositoryDirection = z.enum(['asc', 'desc'])

export const ZGithubRepositoryParams = z.object({
  page: z.number(),
  per_page: z.number(),
  sort: ZGithubRepositorySort,
  type: ZGithubRepositoryType,
  direction: ZGithubRepositoryDirection,
})

export const ZGithubRepository = z.object({
  id: z.number(),
  name: z.string(),
  size: z.number(),
  html_url: z.url(),
  private: z.boolean(),
  archived: z.boolean(),
  disabled: z.boolean(),
  homepage: z.string().nullish(),
  language: z.string().nullish(),
  visibility: z.string().nullish(),
  description: z.string().nullish(),
  pushed_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  owner: ZGithubUser,
})

//
//
//
//

export type TGithubRepositorySort = z.infer<typeof ZGithubRepositorySort>
export type TGithubRepositoryType = z.infer<typeof ZGithubRepositoryType>
export type TGithubRepositoryDirection = z.infer<typeof ZGithubRepositoryDirection>

export type TGithubRepositoryParams = z.infer<typeof ZGithubRepositoryParams>

export type TGithubRepository = z.infer<typeof ZGithubRepository>
