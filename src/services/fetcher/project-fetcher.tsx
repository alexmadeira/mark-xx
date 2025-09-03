import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TProjectFetcherProps } from '@/services/fetcher/project'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export class ProjectFetcher implements IFetcher<TProjectFetcherProps> {
  private readonly projectActions = useFetcherProjects.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new ProjectFetcher(api)
  }

  public async fetch(slug: string, options: TProjectFetcherProps = {}) {
    try {
      this.projectActions.setProjectPageStatus(slug, 'loading')

      const result = await this.api.query('mark-xx:project', ['mark-xx:project', slug], {}, { slug })

      if (options.callback) options.callback()

      this.projectActions.setProjectPage(slug, result)
      this.projectActions.setProjectPageStatus(slug, 'loaded')
    } catch (error) {
      this.projectActions.setProjectPageStatus(slug, 'error')
      throw error
    }
  }

  public prefetch(name: string, options: TProjectFetcherProps = {}) {
    return {
      tags: ['project'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
