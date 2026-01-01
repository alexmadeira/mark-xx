import type { TMasonryContent } from '@/services/builder/masonry'
import type { TRawSchemaProject } from '@/services/schema/project'
import type { TStoreFetcherProject } from '@/services/store/fetcher-projects'

import _ from 'lodash'

import { TechnologyMapper } from './technology-mapper'

export class ProjectMapper {
  protected constructor() {}

  public static toMasonry(raw: TStoreFetcherProject): TMasonryContent<TStoreFetcherProject> {
    return {
      className: 'bg-black',
      link: `/project/${raw.slug}`,
      color: raw.color,
      metaData: raw,
    }
  }

  public static toStore(raw: TRawSchemaProject): TStoreFetcherProject {
    return {
      status: 'loading',
      id: raw.id,
      slug: raw.uid,
      tags: raw.tags,
      date: new Date(_.get(raw, 'data.date', '')),
      name: _.presentsContent(_.get(raw, 'data.name')),
      role: _.get(raw, 'data.role', ''),
      color: _.get(raw, 'data.color', '#FFFFFF'),
      teamSize: _.get(raw, 'data.team_size', ''),
      highlight: _.get(raw, 'data.highlight', false),
      banner: _.get(raw, 'data.banner.url'),
      thumbnail: _.get(raw, 'data.thumbnail.url'),
      bannerName: _.get(raw, 'data.banner_name', ''),
      bannerClass: _.get(raw, 'data.banner_class', ''),
      thumbnailClass: _.get(raw, 'data.banner_class', ''),
      description: _.presentsContent(_.get(raw, 'data.description')),
      timeline: {
        start: new Date(_.get(raw, 'data.start_date', '')),
        end: new Date(_.get(raw, 'data.end_date', '')),
      },
      technologies: raw.data.technologies.map(TechnologyMapper.toStore),
      company: 'Petland Brasil',
    }
  }
}
