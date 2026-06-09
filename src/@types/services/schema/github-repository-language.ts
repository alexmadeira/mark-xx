import { z } from 'zod/v4'

import { ZGithubRepositoryLanguages, ZGithubRepositoryLanguagesParams } from '@/github/repository-language'

export const ZRawSchemaGithubRepositoryLanguages = ZGithubRepositoryLanguages
export const ZSchemaGithubRepositoryLanguagesParams = ZGithubRepositoryLanguagesParams

export const ZSchemaGithubRepositoryLanguage = z.object({
  id: z.string(),
  name: z.string(),
  usage: z.number(),
})

//
//
//
//

export type TRawSchemaGithubRepositoryLanguages = z.infer<typeof ZRawSchemaGithubRepositoryLanguages>
export type TSchemaGithubRepositoryLanguagesParams = z.infer<typeof ZSchemaGithubRepositoryLanguagesParams>
export type TSchemaGithubRepositoryLanguage = z.infer<typeof ZSchemaGithubRepositoryLanguage>
