import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TProjectFetcherProps } from '@/services/fetcher/project'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export class ProjectFetcher {
  private readonly projectActions = useFetcherProjects.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new ProjectFetcher(api)
  }

  public async fetch(slug: string, options: TProjectFetcherProps = {}) {
    try {
      this.projectActions.setProjectPageStatus(slug, 'loading')

      const pageData = await this.api.query('mark-xx:project', ['mark-xx:project', slug], {}, { slug })

      if (options.callback) options.callback()

      this.projectActions.setProjectPage(slug, pageData)
      this.projectActions.setProjectPageStatus(slug, 'loaded')

      return pageData
    } catch (error) {
      this.projectActions.setProjectPageStatus(slug, 'error')
      throw error
    }
  }
}
