import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TProjectFetcherProps } from '@/services/fetcher/project'

// import { PageMapper } from '_SRV/mapper/page-mapper.ts'
import { useFetcherProjects } from '_STR/useFetcherProjects'

export class ProjectFetcher implements IFetcher<TProjectFetcherProps> {
  private readonly projectActions = useFetcherProjects.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(slug: string, options: TProjectFetcherProps = {}) {
    try {
      this.projectActions.setProjectPageStatus(slug, 'loading')

      await this.api.query('mark-xx:project', ['mark-xx:project', slug], { slug })

      if (options.callback) options.callback()

      // this.projectActions.setProjectPage(slug, PageMapper.toStore(result))
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
