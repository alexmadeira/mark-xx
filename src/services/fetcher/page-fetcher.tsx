import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { TEPrismicPageType } from '@/enums/prismic'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TPageFetcherProps } from '@/services/fetcher/page'

import { PageMapper } from '_SRV/mapper/page-mapper.ts'

import { useFetcherPages } from '_STR/useFetcherPages'

export class PageFetcher implements IFetcher<TPageFetcherProps, TEPrismicPageType> {
  private readonly pagesActions = useFetcherPages.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(slug: TEPrismicPageType, options: TPageFetcherProps = {}) {
    try {
      this.pagesActions.setPageStatus(slug, 'loading')
      const result = await this.api.query('mark-xx:page', ['mark-xx:page', slug], { type: slug, return: 'one' })

      if (options.callback) options.callback()

      this.pagesActions.setPage(slug, PageMapper.toStore(result))
      this.pagesActions.setPageStatus(slug, 'loaded')
    } catch (error) {
      this.pagesActions.setPageStatus(slug, 'error')
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
