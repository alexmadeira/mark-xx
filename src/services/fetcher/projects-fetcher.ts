import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IRequester } from '@/interfaces/api'
import type { IProjectMapper } from '@/interfaces/mapper/project'
import type { TProjectsFetcherProps } from '@/services/fetcher/projects'
import type { TStoreFetcherProjects } from '@/services/store/fetcher-projects'

import _ from 'lodash'

import { Fetcher } from './fetcher'

export class ProjectsFetcher extends Fetcher<TProjectsFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: IProjectMapper,
    private readonly fetcherProjects: TStoreFetcherProjects,
  ) {
    super()
  }

  public async fetch(name: string, options: TProjectsFetcherProps = {}) {
    const result = await this.api.query(
      'mark-xx:projects',
      _.compact(['mark-xx:projects', name, JSON.stringify(options.filter)]),
      {
        return: 'all',
        type: 'project',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      },
    )

    this.fetcherProjects.actions.setList(name, result.map(this.mapper.toStore))

    if (options.callback) options.callback()
  }

  public prefetch(name: string, options: TProjectsFetcherProps = {}) {
    this.refetch(name, options)

    return {
      tags: ['projects'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
