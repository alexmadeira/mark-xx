import { z } from 'zod/v4'

export const ZGithubRepositoryLanguagesParams = z.object({
  repo: z.string(),
  owner: z.string(),
})

export const ZGithubRepositoryLanguages = z.record(z.string(), z.number())

//
//
//
//

export type TGithubRepositoryLanguagesParams = z.infer<typeof ZGithubRepositoryLanguagesParams>

export type TGithubRepositoryLanguages = z.infer<typeof ZGithubRepositoryLanguages>
