import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TPageFetcherProps } from '@/services/fetcher/page'

import { ApiRequester } from '_SRV/api/api-requester'
import { PageMapper } from '_SRV/mapper/page-mapper.ts'

import { useFetcherPages } from '_STR/useFetcherPages'

export class PageFetcher implements IFetcher<TPageFetcherProps> {
  private readonly pagesActions = useFetcherPages.getState().actions

  constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public async fetch(slug: string, options: TPageFetcherProps = {}) {
    try {
      this.pagesActions.createPage(slug)
      this.pagesActions.setPageStatus(slug, 'loading')
      const result = await this.api.query('mark-xx:page', ['mark-xx:page', slug], {}, { slug })

      if (options.callback) options.callback()

      this.pagesActions.setPage(slug, PageMapper.toStore(result))
      this.pagesActions.setPageStatus(slug, 'loaded')
    } catch (error) {
      this.pagesActions.setPageStatus(slug, 'error')
      throw error
    }
  }

  public prefetch(name: string, options: TPageFetcherProps = {}) {
    return {
      tags: ['page'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
