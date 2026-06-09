import { z } from 'zod/v4'

import { ZGithubRepositoryPackages, ZGithubRepositoryPackagesParams } from '@/github/repository-packages'

export const ZRawSchemaGithubRepositoryPackages = ZGithubRepositoryPackages
export const ZSchemaGithubRepositoryPackagesParams = ZGithubRepositoryPackagesParams

export const ZSchemaGithubRepositoryPackages = z.record(z.number(), z.number())

//
//
//
//

export type TRawSchemaGithubRepositoryPackages = z.infer<typeof ZRawSchemaGithubRepositoryPackages>
export type TSchemaGithubRepositoryPackagesParams = z.infer<typeof ZSchemaGithubRepositoryPackagesParams>
export type TSchemaGithubRepositoryPackages = z.infer<typeof ZSchemaGithubRepositoryPackages>
