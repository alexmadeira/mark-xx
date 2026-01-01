import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TTechnologiesFetcherProps } from '@/services/fetcher/technologies'

import _ from 'lodash'

import { TechnologyMapper } from '_SRV/mapper/technology-mapper'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'

export class TechnologiesFetcher implements IFetcher<TTechnologiesFetcherProps> {
  private readonly technologiesActions = useFetcherTechnologies.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TTechnologiesFetcherProps = {}) {
    this.technologiesActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:technologies', ['mark-xx:technologies', name], {
        return: 'all',
        type: 'technology',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.technologiesActions.setList(result.map(TechnologyMapper.toStore))
      this.technologiesActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.technologiesActions.setStatus('error')
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
