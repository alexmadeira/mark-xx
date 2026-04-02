import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IRequester } from '@/interfaces/api'
import type { IPageMapper } from '@/interfaces/mapper/page'
import type { IProjectMapper } from '@/interfaces/mapper/project'
import type { TProjectFetcherProps } from '@/services/fetcher/project'
import type { TStoreFetcherProjects } from '@/services/store/fetcher-projects'
import type { TStorePageConfigs } from '@/services/store/page-configs'

import _ from 'lodash'

import { Fetcher } from './fetcher'

export class ProjectFetcher extends Fetcher<TProjectFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: IProjectMapper,
    private readonly pageMapper: IPageMapper,
    private readonly fetcherProject: TStoreFetcherProjects,
    private readonly pageConfigs: TStorePageConfigs,
  ) {
    super()
  }

  public async fetch(slug: string, options: TProjectFetcherProps = {}) {
    try {
      this.fetcherProject.actions.setProjectPageStatus(slug, 'loading')

      const result = await this.api.query('mark-xx:project', ['mark-xx:project', slug], {
        type: 'project',
        return: 'one',
        uid: slug,
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.pageConfigs.actions.setPageConfig(this.pageMapper.config(result.data.body))
      this.fetcherProject.actions.setProjectPage(slug, this.mapper.toStore(result))
      this.fetcherProject.actions.setProjectPageStatus(slug, 'loaded')
    } catch (error) {
      this.fetcherProject.actions.setProjectPageStatus(slug, 'error')
      throw error
    }
  }

  public prefetch(name: string, options: TProjectFetcherProps = {}) {
    this.refetch(name, options)

    return {
      tags: ['project'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
