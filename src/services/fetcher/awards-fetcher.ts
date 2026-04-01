import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { AwardMapper } from '_SRV/mapper/award-mapper'
import type { IRequester } from '@/interfaces/api'
import type { TAwardsFetcherProps } from '@/services/fetcher/awards'
import type { TStoreFetcherAwards } from '@/services/store/fetcher-awards'

import _ from 'lodash'

import { Fetcher } from './fetcher'

export class AwardsFetcher extends Fetcher<TAwardsFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: AwardMapper,
    private readonly fetcherAwards: TStoreFetcherAwards,
  ) {
    super()
  }

  public async fetch(name: string, options: TAwardsFetcherProps = {}) {
    this.fetcherAwards.actions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:awards', ['mark-xx:awards', name], {
        return: 'all',
        type: 'award',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherAwards.actions.setList(result.map(this.mapper.toStore))
      this.fetcherAwards.actions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherAwards.actions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TAwardsFetcherProps = {}) {
    this.refetch(name, options)
    return {
      tags: ['awards'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
