import type { TRequesterPaths } from '@/services/builder/requester'

import { ZRawSchemaGithubRepository, ZSchemaGithubRepositoryParams } from '@/services/schema/github-repository'
import {
  ZRawSchemaGithubRepositoryLanguages,
  ZSchemaGithubRepositoryLanguagesParams,
} from '@/services/schema/github-repository-language'
import {
  ZRawSchemaGithubRepositoryPackages,
  ZSchemaGithubRepositoryPackagesParams,
} from '@/services/schema/github-repository-package'

import z from 'zod'

export const githubPaths = {
  'github:repositories': {
    method: 'get',
    path: '/user/repos',
    schema: z.array(ZRawSchemaGithubRepository),
    params: ZSchemaGithubRepositoryParams,
  },
  'github:repository-languages': {
    method: 'get',
    path: '/repos/:owner/:repo/languages',
    schema: ZRawSchemaGithubRepositoryLanguages,
    params: ZSchemaGithubRepositoryLanguagesParams,
  },
  'github:repository-packages': {
    method: 'get',
    path: '/repos/:owner/:repo/contents/package.json',
    schema: ZRawSchemaGithubRepositoryPackages,
    params: ZSchemaGithubRepositoryPackagesParams,
  },
} as const satisfies TRequesterPaths
