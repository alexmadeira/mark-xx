import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TProjectsFetcherProps } from '@/services/fetcher/projects'

import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export class ProjectsFetcher implements IFetcher<TProjectsFetcherProps> {
  private readonly projectsActions = useFetcherProjects.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TProjectsFetcherProps = {}) {
    const result = await this.api.query(
      'mark-xx:projects',
      ['mark-xx:projects', name, JSON.stringify(options.filter)],
      {
        return: 'all',
        type: 'project',
        fields: options.filter?.fields,
      },
    )

    this.projectsActions.setList(name, result.map(ProjectMapper.toStore))

    if (options.callback) options.callback()
  }

  public prefetch(name: string, options: TProjectsFetcherProps = {}) {
    return {
      tags: ['projects'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
