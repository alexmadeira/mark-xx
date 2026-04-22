import type { TProjectRaw } from '_TEST/utils/factories/fetcher/make-project-raw'
import type { IProjectMapper } from '@/interfaces/mapper/project'
import type { TStoreFetcherProject } from '@/services/store/fetcher-projects'

import _ from 'lodash'

export class ProjectMapperMock implements IProjectMapper {
  private readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TProjectRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TProjectRaw): TStoreFetcherProject {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      slug: data.uid,
      name: data.data.name,
      role: data.data.role,
      content: String(data.data.content),
      description: data.data.description,
      date: new Date(data.data.start_date),
      tags: data.data.tags,
      teamSize: data.data.team_size,
      highlight: data.data.highlight,
      status: 'loaded',
      timeline: {
        start: new Date(data.data.start_date),
        end: new Date(data.data.end_date),
      },
      thumbnailColor: '#000',
      logoColor: null,
      bannerClass: null,
      thumbnailClass: null,
      company: {
        id: 'company-id',
        slug: 'company-slug',
        name: 'Company',
        role: 'Role',
        start: new Date(data.data.start_date),
        end: new Date(data.data.end_date),
        description: 'Description',
      },
      contents: {},
      logo: { blur: null, original: null },
      banner: { blur: null, original: null },
      thumbnail: { blur: null, original: null },
      technologies: [],
    }
  }

  public set override(data: Partial<TProjectRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }

  public toMasonry(raw: TStoreFetcherProject) {
    return {
      color: raw.thumbnailColor,
      link: `/project/${raw.slug}`,
      className: null,
      metaData: raw,
    }
  }
}
