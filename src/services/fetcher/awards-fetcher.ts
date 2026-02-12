import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TAwardsFetcherProps } from '@/services/fetcher/awards'

import _ from 'lodash'

import { AwardMapper } from '_SRV/mapper/award-mapper'

import { useFetcherAwards } from '_STR/useFetcherAwards'

export class AwardsFetcher implements IFetcher<TAwardsFetcherProps> {
  private readonly fetcherAwardsActions = useFetcherAwards.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TAwardsFetcherProps = {}) {
    this.fetcherAwardsActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:awards', ['mark-xx:awards', name], {
        return: 'all',
        type: 'award',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherAwardsActions.setList(result.map(AwardMapper.toStore))
      this.fetcherAwardsActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherAwardsActions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TAwardsFetcherProps = {}) {
    return {
      tags: ['awards'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
