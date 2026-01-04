import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TBrandsFetcherProps } from '@/services/fetcher/brands'

import _ from 'lodash'

import { BrandMapper } from '_SRV/mapper/brand-mapper'

import { useFetcherBrands } from '_STR/useFetcherBrands'

export class BrandsFetcher implements IFetcher<TBrandsFetcherProps> {
  private readonly fetcherBrandsActions = useFetcherBrands.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TBrandsFetcherProps = {}) {
    this.fetcherBrandsActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:brands', ['mark-xx:brands', name], {
        return: 'all',
        type: 'brand',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherBrandsActions.setList(result.map(BrandMapper.toStore))
      this.fetcherBrandsActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherBrandsActions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TBrandsFetcherProps = {}) {
    return {
      tags: ['brands'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
