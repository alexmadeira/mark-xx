import type { TRawSchemaGithubRepository } from '@/services/schema/github-repository'
import type { TStoreFetcherRepository } from '@/services/store/fetcher-repositories'

export interface IRepositoryMapper {
  toStore(raw: TRawSchemaGithubRepository): TStoreFetcherRepository
}
