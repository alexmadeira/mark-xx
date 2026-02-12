import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TTechnologiesFetcherProps } from '@/services/fetcher/technologies'

import _ from 'lodash'

import { TechnologyMapper } from '_SRV/mapper/technology-mapper'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'

export class TechnologiesFetcher implements IFetcher<TTechnologiesFetcherProps> {
  private readonly fetcherTechnologiesActions = useFetcherTechnologies.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TTechnologiesFetcherProps = {}) {
    this.fetcherTechnologiesActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:technologies', ['mark-xx:technologies', name], {
        return: 'all',
        type: 'technology',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherTechnologiesActions.setList(result.map(TechnologyMapper.toStore))
      this.fetcherTechnologiesActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherTechnologiesActions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TTechnologiesFetcherProps = {}) {
    return {
      tags: ['technologies'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
