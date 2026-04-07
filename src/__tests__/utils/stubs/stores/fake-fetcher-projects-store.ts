import type { TStoreFetcherProject, TStoreFetcherProjectsData } from '@/services/store/fetcher-projects'

import _ from 'lodash'

export class FakeFetcherProjectsStore {
  public readonly data: TStoreFetcherProjectsData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setProjectPageSpy: ReturnType<typeof vi.fn>
  private readonly setProjectPageStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherProjectsData> = {}) {
    this.data = {
      list: props.list || {},
      pages: props.pages || {},
    }

    this.setListSpy = vi.fn(this.setList.bind(this))
    this.setProjectPageSpy = vi.fn(this.setProjectPage.bind(this))
    this.setProjectPageStatusSpy = vi.fn(this.setProjectPageStatus.bind(this))
  }

  private setList(name: string, projects: TStoreFetcherProject[]) {
    this.data.list[name] = [...projects]
  }

  private setProjectPage(slug: string, project: TStoreFetcherProject) {
    this.data.pages[slug] = project
  }

  private setProjectPageStatus(slug: string, status: TStoreFetcherProject['status']) {
    if (this.data.pages[slug]?.status === 'loaded') return
    _.set(this.data.pages, [slug, 'status'], status)
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setProjectPage: this.setProjectPageSpy,
      setProjectPageStatus: this.setProjectPageStatusSpy,
    }
  }
}
