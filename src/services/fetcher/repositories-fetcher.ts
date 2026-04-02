import type { githubPaths } from '_CFG/requester/paths/github'
import type { IRequester } from '@/interfaces/api'
import type { IRepositoryMapper } from '@/interfaces/mapper/repository'
import type { TRepositoriesFetcherProps } from '@/services/fetcher/repositories'
import type { TStoreFetcherRepositories } from '@/services/store/fetcher-repositories'

import _ from 'lodash'

import { Fetcher } from './fetcher'

export class RepositoriesFetcher extends Fetcher<TRepositoriesFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof githubPaths>,
    private readonly mapper: IRepositoryMapper,
    private readonly fetcherRepositories: TStoreFetcherRepositories,
  ) {
    super()
  }

  public async fetch(name: string, options: TRepositoriesFetcherProps = {}) {
    this.fetcherRepositories.actions.setStatus('loading')
    try {
      const result = await this.api.query('github:repositories', ['github:repositories', name], {
        page: options.params?.page || 1,
        per_page: options.params?.perPage || 30,
        type: options.params?.type || 'all',
        sort: options.params?.sort || 'updated',
        direction: options.params?.direction || 'desc',
      })

      this.fetcherRepositories.actions.setList(result.map(this.mapper.toStore))

      this.fetcherRepositories.actions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherRepositories.actions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TRepositoriesFetcherProps = {}) {
    this.refetch(name, options)

    return {
      tags: ['repositories'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
