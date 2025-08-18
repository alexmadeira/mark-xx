import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TAwardsFetcherProps } from '@/services/fetcher/awards'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherAwards } from '_STR/useFetcherAwards'

export class AwardsFetcher {
  private readonly awardsActions = useFetcherAwards.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new AwardsFetcher(api)
  }

  public async fetch(name: string, options: TAwardsFetcherProps = {}) {
    this.awardsActions.setStatus('loading')
    try {
      const awards = await this.api.query('mark-xx:awards', ['mark-xx:awards', name])

      this.awardsActions.setList(awards)
      this.awardsActions.setStatus('loaded')

      if (options.callback) options.callback()
      return awards
    } catch (error) {
      this.awardsActions.setStatus('error')
      throw error
    }
  }
}
