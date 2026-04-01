import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IRequester } from '@/interfaces/api'
import type { ITechnologyMapper } from '@/interfaces/mapper/technology'
import type { TTechnologiesFetcherProps } from '@/services/fetcher/technologies'
import type { TStoreFetcherTechnologies } from '@/services/store/fetcher-technologies'

import _ from 'lodash'

import { Fetcher } from './fetcher'

export class TechnologiesFetcher extends Fetcher<TTechnologiesFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: ITechnologyMapper,
    private readonly fetcherTechnologies: TStoreFetcherTechnologies,
  ) {
    super()
  }

  public async fetch(name: string, options: TTechnologiesFetcherProps = {}) {
    this.fetcherTechnologies.actions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:technologies', ['mark-xx:technologies', name], {
        return: 'all',
        type: 'technology',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherTechnologies.actions.setList(result.map(this.mapper.toStore))
      this.fetcherTechnologies.actions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherTechnologies.actions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TTechnologiesFetcherProps = {}) {
    this.refetch(name, options)

    return {
      tags: ['technologies'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
