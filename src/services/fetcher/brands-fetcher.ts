import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IRequester } from '@/interfaces/api'
import type { TBrandsFetcherProps } from '@/services/fetcher/brands'
import type { TStoreFetcherBrands } from '@/services/store/fetcher-brands'

import _ from 'lodash'

import { BrandMapper } from '_SRV/mapper/brand-mapper'

import { Fetcher } from './fetcher'

export class BrandsFetcher extends Fetcher<TBrandsFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: BrandMapper,
    private readonly fetcherBrands: TStoreFetcherBrands,
  ) {
    super()
  }

  public async fetch(name: string, options: TBrandsFetcherProps = {}) {
    this.fetcherBrands.actions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:brands', ['mark-xx:brands', name], {
        return: 'all',
        type: 'brand',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherBrands.actions.setList(result.map(this.mapper.toStore))
      this.fetcherBrands.actions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherBrands.actions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TBrandsFetcherProps = {}) {
    this.refetch(name, options)
    return {
      tags: ['brands'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
