import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { TEPrismicPageType } from '@/enums/prismic'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TPageFetcherProps } from '@/services/fetcher/page'

import { PageMapper } from '_SRV/mapper/page-mapper.ts'

import { useFetcherPages } from '_STR/useFetcherPages'
import { usePageConfigs } from '_STR/usePageConfigs'

export class PageFetcher implements IFetcher<TPageFetcherProps, TEPrismicPageType> {
  private readonly fetcherPagesActions = useFetcherPages.getState().actions
  private readonly pageConfigsActions = usePageConfigs.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(slug: TEPrismicPageType, options: TPageFetcherProps = {}) {
    try {
      this.fetcherPagesActions.setPageStatus(slug, 'loading')
      const result = await this.api.query('mark-xx:page', ['mark-xx:page', slug], { type: slug, return: 'one' })

      if (options.callback) options.callback()

      this.pageConfigsActions.setPageConfig(PageMapper.config(result.data.body))
      this.fetcherPagesActions.setPage(slug, PageMapper.toStore(result))
      this.fetcherPagesActions.setPageStatus(slug, 'loaded')
    } catch (error) {
      this.fetcherPagesActions.setPageStatus(slug, 'error')
      throw error
    }
  }

  public prefetch(name: TEPrismicPageType, options: TPageFetcherProps = {}) {
    return {
      tags: ['page'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
