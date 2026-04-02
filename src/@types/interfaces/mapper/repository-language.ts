import type { TRawSchemaGithubRepositoryLanguages } from '@/services/schema/github-repository-language'
import type { TStoreFetcherRepositoryLanguage } from '@/services/store/fetcher-repository-languages'

export interface IRepositoryLanguageMapper {
  toStore(
    raw: TRawSchemaGithubRepositoryLanguages,
    libraries: Record<string, string>,
  ): TStoreFetcherRepositoryLanguage[]

  assignPackages(
    raw: TRawSchemaGithubRepositoryLanguages,
    packages: Record<string, string>,
  ): Record<string, Record<string, number>>
}
