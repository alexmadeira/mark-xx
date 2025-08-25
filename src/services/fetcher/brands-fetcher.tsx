import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TBrandsFetcherProps } from '@/services/fetcher/brands'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherBrands } from '_STR/useFetcherBrands'

export class BrandsFetcher {
  private readonly brandsActions = useFetcherBrands.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new BrandsFetcher(api)
  }

  public async fetch(name: string, options: TBrandsFetcherProps = {}) {
    this.brandsActions.setStatus('loading')
    try {
      const brands = await this.api.query('mark-xx:brands', ['mark-xx:brands', name])

      this.brandsActions.setList(brands)
      this.brandsActions.setStatus('loaded')

      if (options.callback) options.callback()
      return brands
    } catch (error) {
      this.brandsActions.setStatus('error')
      throw error
    }
  }
}
