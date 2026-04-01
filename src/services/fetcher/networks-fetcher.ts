import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IRequester } from '@/interfaces/api'
import type { TNetworksFetcherProps } from '@/services/fetcher/networks'
import type { TStoreFetcherNetworks } from '@/services/store/fetcher-networks'

import _ from 'lodash'

import { NetworkMapper } from '_SRV/mapper/network-mapper'

import { Fetcher } from './fetcher'

export class NetworksFetcher extends Fetcher<TNetworksFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: NetworkMapper,
    private readonly fetcherNetworks: TStoreFetcherNetworks,
  ) {
    super()
  }

  public async fetch(name: string, options: TNetworksFetcherProps = {}) {
    this.fetcherNetworks.actions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:networks', ['mark-xx:networks', name], {
        return: 'all',
        type: 'social_network',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherNetworks.actions.setList(result.map(this.mapper.toStore))
      this.fetcherNetworks.actions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherNetworks.actions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TNetworksFetcherProps = {}) {
    this.refetch(name, options)
    return {
      tags: ['networks'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
