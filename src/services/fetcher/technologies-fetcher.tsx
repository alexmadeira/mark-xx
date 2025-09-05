import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TTechnologiesFetcherProps } from '@/services/fetcher/technologies'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'

export class TechnologiesFetcher implements IFetcher<TTechnologiesFetcherProps> {
  private readonly technologiesActions = useFetcherTechnologies.getState().actions

  constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TTechnologiesFetcherProps = {}) {
    this.technologiesActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:technologies', ['mark-xx:technologies', name])

      this.technologiesActions.setList(result)
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
