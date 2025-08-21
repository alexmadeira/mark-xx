import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TTechnologiesFetcherProps } from '@/services/fetcher/technologies'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'

export class TechnologiesFetcher {
  private readonly technologiesActions = useFetcherTechnologies.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new TechnologiesFetcher(api)
  }

  public async fetch(name: string, options: TTechnologiesFetcherProps = {}) {
    this.technologiesActions.setStatus('loading')
    try {
      const technologies = await this.api.query('mark-xx:technologies', ['mark-xx:technologies', name])

      this.technologiesActions.setList(technologies)
      this.technologiesActions.setStatus('loaded')

      if (options.callback) options.callback()
      return technologies
    } catch (error) {
      this.technologiesActions.setStatus('error')
      throw error
    }
  }
}
