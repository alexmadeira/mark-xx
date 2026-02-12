import type { TRawSchemaGithubRepository } from '@/services/schema/github-repository'
import type { TStoreFetcherRepository } from '@/services/store/fetcher-repositories'

import _ from 'lodash'

export class RepositoryMapper {
  public static toStore(raw: TRawSchemaGithubRepository): TStoreFetcherRepository {
    return {
      id: raw.id.toString(),
      name: raw.name,
      size: raw.size,
      owner: raw.owner.login,
      private: !!raw.private,
      language: raw.language,
      pushedAt: new Date(raw.pushed_at),
      createdAt: new Date(raw.created_at),
      updatedAt: new Date(raw.updated_at),
    }
  }
}
