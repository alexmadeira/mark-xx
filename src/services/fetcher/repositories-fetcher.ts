import type { githubPaths } from '_CFG/requester/paths/github'
import type { Requester } from '_SRV/builder/requester'
import type { TRepositoriesFetcherProps } from '@/services/fetcher/repositories'

import _ from 'lodash'

import { RepositoryMapper } from '_SRV/mapper/repository-mapper'

import { useFetcherRepositories } from '_STR/useFetcherRepositories'

import { Fetcher } from './fetcher'

export class RepositoriesFetcher extends Fetcher<TRepositoriesFetcherProps> {
  private readonly fetcherRepositoriesActions = useFetcherRepositories.getState().actions

  constructor(private readonly api: Requester<typeof githubPaths>) {
    super()
  }

  public async fetch(name: string, options: TRepositoriesFetcherProps = {}) {
    this.fetcherRepositoriesActions.setStatus('loading')
    try {
      const result = await this.api.query('github:repositories', ['github:repositories', name], {
        page: options.params?.page || 1,
        per_page: options.params?.perPage || 30,
        type: options.params?.type || 'all',
        sort: options.params?.sort || 'updated',
        direction: options.params?.direction || 'desc',
      })

      this.fetcherRepositoriesActions.setList(result.map(RepositoryMapper.toStore))

      this.fetcherRepositoriesActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherRepositoriesActions.setStatus('error')
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
