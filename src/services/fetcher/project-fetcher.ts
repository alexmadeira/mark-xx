import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { TProjectFetcherProps } from '@/services/fetcher/project'

import _ from 'lodash'

import { PageMapper } from '_SRV/mapper/page-mapper'
import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { usePageConfigs } from '_STR/usePageConfigs'

import { Fetcher } from './fetcher'

export class ProjectFetcher extends Fetcher<TProjectFetcherProps> {
  private readonly fetcherProjectActions = useFetcherProjects.getState().actions
  private readonly pageConfigsActions = usePageConfigs.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {
    super()
  }

  public async fetch(slug: string, options: TProjectFetcherProps = {}) {
    try {
      this.fetcherProjectActions.setProjectPageStatus(slug, 'loading')

      const result = await this.api.query('mark-xx:project', ['mark-xx:project', slug], {
        type: 'project',
        return: 'one',
        uid: slug,
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.pageConfigsActions.setPageConfig(PageMapper.config(result.data.body))
      this.fetcherProjectActions.setProjectPage(slug, ProjectMapper.toStore(result))
      this.fetcherProjectActions.setProjectPageStatus(slug, 'loaded')
    } catch (error) {
      this.fetcherProjectActions.setProjectPageStatus(slug, 'error')
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
