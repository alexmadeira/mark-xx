import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { TNetworksFetcherProps } from '@/services/fetcher/networks'

import _ from 'lodash'

import { NetworkMapper } from '_SRV/mapper/network-mapper'

import { useFetcherNetworks } from '_STR/useFetcherNetworks'

import { Fetcher } from './fetcher'

export class NetworksFetcher extends Fetcher<TNetworksFetcherProps> {
  private readonly fetcherNetworksActions = useFetcherNetworks.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {
    super()
  }

  public async fetch(name: string, options: TNetworksFetcherProps = {}) {
    this.fetcherNetworksActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:networks', ['mark-xx:networks', name], {
        return: 'all',
        type: 'social_network',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherNetworksActions.setList(result.map(NetworkMapper.toStore))
      this.fetcherNetworksActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherNetworksActions.setStatus('error')
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
