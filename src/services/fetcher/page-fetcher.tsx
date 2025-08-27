import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TPageFetcherProps } from '@/services/fetcher/page'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherPages } from '_STR/useFetcherPages'

export class PageFetcher {
  private readonly pagesActions = useFetcherPages.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new PageFetcher(api)
  }

  public async fetch(slug: string, options: TPageFetcherProps = {}) {
    try {
      this.pagesActions.createPage(slug)
      this.pagesActions.setPageStatus(slug, 'loading')
      const pageData = await this.api.query('mark-xx:page', ['mark-xx:page', slug], {}, { slug })

      if (options.callback) options.callback()

      this.pagesActions.setPage(slug, pageData)
      this.pagesActions.setPageStatus(slug, 'loaded')

      return pageData
    } catch (error) {
      this.pagesActions.setPageStatus(slug, 'error')
      throw error
    }
  }
}
