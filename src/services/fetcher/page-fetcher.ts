import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TEPrismicPageType } from '@/enums/prismic'
import type { IRequester } from '@/interfaces/api'
import type { IPageMapper } from '@/interfaces/mapper/page'
import type { TPageFetcherProps } from '@/services/fetcher/page'
import type { TStoreFetcherPages } from '@/services/store/fetcher-pages'
import type { TStorePageConfigs } from '@/services/store/page-configs'

import { Fetcher } from './fetcher'

export class PageFetcher extends Fetcher<TPageFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: IPageMapper,
    private readonly fetcherPages: TStoreFetcherPages,
    private readonly pageConfigs: TStorePageConfigs,
  ) {
    super()
  }

  public async fetch(slug: TEPrismicPageType, options: TPageFetcherProps = {}) {
    try {
      this.fetcherPages.actions.setPageStatus(slug, 'loading')
      const result = await this.api.query('mark-xx:page', ['mark-xx:page', slug], { type: slug, return: 'one' })

      if (options.callback) options.callback()

      this.pageConfigs.actions.setPageConfig(this.mapper.config(result.data.body))
      this.fetcherPages.actions.setPage(slug, this.mapper.toStore(result))
      this.fetcherPages.actions.setPageStatus(slug, 'loaded')
    } catch (error) {
      this.fetcherPages.actions.setPageStatus(slug, 'error')
      throw error
    }
  }

  public prefetch(name: TEPrismicPageType, options: TPageFetcherProps = {}) {
    this.refetch(name, options)

    return {
      tags: ['page'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
