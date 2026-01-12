import type { TMasonryContent } from '@/services/builder/masonry'
import type {
  TRawSchemaProject,
  TRawSchemaProjectContentFullImage,
  TRawSchemaProjectContentImagemGrid,
  TRawSchemaProjectContents,
  TSchemaProjectContentFullImage,
  TSchemaProjectContentImageGrid,
  TSchemaProjectContents,
} from '@/services/schema/project'
import type { TStoreFetcherProject } from '@/services/store/fetcher-projects'

import { asHTML } from '@prismicio/client'
import _ from 'lodash'

import { CompanyMapper } from './company-mapper'
import { TechnologyMapper } from './technology-mapper'

export class ProjectMapper {
  protected constructor() {}

  private static contentFullImage(raw: TRawSchemaProjectContentFullImage): TSchemaProjectContentFullImage {
    return {
      type: 'full_image',
      url: _.get(raw, 'primary.image.url'),
      size: raw.primary.size || 'full',
      color: _.get(raw, 'primary.color', '#FFFFFF'),
    }
  }

  private static contentImageGrid(raw: TRawSchemaProjectContentImagemGrid): TSchemaProjectContentImageGrid {
    return {
      type: 'image_grid',
      gap: _.get(raw, 'primary.grid_image_gap', true),
      columns: _.get(raw, 'primary.grid_image_columns', 4),
      hoverStyle: raw.primary.grid_image_hover_style,
      images: _.map(raw.items, (image) => ({
        id: _.get(image, 'grid_image_url.key', ''),
        url: _.get(image, 'grid_image_url.url'),
        name: _.toString(_.get(image, 'grid_image_name', '')),
        color: _.toString(_.get(image, 'grid_image_color', '#000000')),
        rows: _.toNumber(_.get(image, 'grid_image_rows', 1)),
        cols: _.toNumber(_.get(image, 'grid_image_cols', 1)),
      })),
    }
  }

  private static content(raw: TRawSchemaProjectContents[]): TSchemaProjectContents {
    return _.fromPairs(
      raw.map((slice) => {
        switch (slice.slice_type) {
          case 'bloco_full_image':
            return [slice.id, ProjectMapper.contentFullImage(slice)]
          case 'bloco_imagem_grid':
            return [slice.id, ProjectMapper.contentImageGrid(slice)]
          default:
            throw new Error(`Unknown project content slice type`)
        }
      }),
    )
  }

  public static toMasonry(raw: TStoreFetcherProject): TMasonryContent<TStoreFetcherProject> {
    return {
      className: 'bg-black',
      link: `/project/${raw.slug}`,
      color: raw.color,
      metaData: raw,
    }
  }

  public static toStore(raw: TRawSchemaProject): TStoreFetcherProject {
    if (!raw.data.company.length) throw new Error(`Project ${raw.id} has no company associated.`)
    if (raw.uid === 'drinkfinity') console.log(raw)
    return {
      status: 'loading',
      id: raw.id,
      slug: raw.uid,
      tags: raw.tags,
      date: new Date(_.get(raw, 'data.date', '')),
      name: _.presentsContent(_.get(raw, 'data.name')),
      role: _.get(raw, 'data.role', ''),
      logo: _.get(raw, 'data.logo.url'),
      color: _.get(raw, 'data.color', '#FFFFFF'),
      banner: _.get(raw, 'data.banner.url'),
      company: CompanyMapper.toStore(raw.data.company[0]),
      content: _.presentsContent(asHTML(_.get(raw, 'data.content'))),
      teamSize: _.get(raw, 'data.team_size', ''),
      logoColor: _.get(raw, 'data.logo_color', '#000000'),
      highlight: _.get(raw, 'data.highlight', false),
      thumbnail: _.get(raw, 'data.thumbnail.url'),
      bannerName: _.get(raw, 'data.banner_name', ''),
      bannerClass: _.get(raw, 'data.banner_class', ''),
      description: _.presentsContent(_.get(raw, 'data.description')),
      technologies: raw.data.technologies.map(TechnologyMapper.toStore),
      thumbnailClass: _.get(raw, 'data.banner_class', ''),
      contents: ProjectMapper.content(raw.data.blocks),
      timeline: {
        end: new Date(_.get(raw, 'data.end_date', '')),
        start: new Date(_.get(raw, 'data.start_date', '')),
      },
    }
  }
}
