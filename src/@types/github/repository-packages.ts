import { z } from 'zod/v4'

export const ZGithubRepositoryPackagesParams = z.object({
  repo: z.string(),
  owner: z.string(),
})

export const ZGithubRepositoryPackages = z.object({
  content: z.string(),
})

//
//
//
//

export type TGithubRepositoryPackagesParams = z.infer<typeof ZGithubRepositoryPackagesParams>

export type TGithubRepositoryPackages = z.infer<typeof ZGithubRepositoryPackages>
