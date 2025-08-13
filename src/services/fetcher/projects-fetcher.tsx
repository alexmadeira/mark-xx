import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TProjectsFetcherProps } from '@/services/fetcher/projects'

import { ApiRequester } from '_SRV/api/api-requester'

import { useProjects } from '_STR/fetcher/useProjects'

export class ProjectsFetcher {
  private readonly projectsActions = useProjects.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new ProjectsFetcher(api)
  }

  public async fetch(name: string, options: TProjectsFetcherProps) {
    const projects = await this.api.query(
      'mark-xx:projects',
      ['mark-xx:projects', name, JSON.stringify(options.filter)],
      {},
      options.filter,
    )

    this.projectsActions.setList(name, projects)

    if (options.callback) options.callback()
    return projects
  }
}
