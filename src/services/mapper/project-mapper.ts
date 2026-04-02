import type { IProjectMapper } from '@/interfaces/mapper/project'
import type { ITechnologyMapper } from '@/interfaces/mapper/technology'
import type { TMasonryContent } from '@/services/builder/masonry'
import type { IResize } from '@/services/lib/image/resize'
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

export class ProjectMapper implements IProjectMapper {
  constructor(
    private readonly image: IResize,
    private readonly technologyMapper: ITechnologyMapper,
    private readonly companyMapper: CompanyMapper,
  ) {
    _.bindAll(this, ['toStore', 'toMasonry'])
  }

  private contentFullImage(raw: TRawSchemaProjectContentFullImage): TSchemaProjectContentFullImage {
    return {
      type: 'full_image',
      url: this.image.resize(_.get(raw, 'primary.image.url')),
      size: raw.primary.size || 'full',
      color: _.get(raw, 'primary.color', '#FFFFFF'),
    }
  }

  private contentImageGrid(raw: TRawSchemaProjectContentImagemGrid): TSchemaProjectContentImageGrid {
    return {
      type: 'image_grid',
      gap: _.get(raw, 'primary.grid_image_gap', true),
      columns: _.get(raw, 'primary.grid_image_columns', 4),
      hoverStyle: raw.primary.grid_image_hover_style,
      images: _.map(raw.items, (image) => ({
        id: _.get(image, 'grid_image_url.key', ''),
        url: this.image.resize(_.get(image, 'grid_image_url.url')),
        name: _.toString(_.get(image, 'grid_image_name', '')),
        color: _.toString(_.get(image, 'grid_image_color', '#000000')),
        rows: _.toNumber(_.get(image, 'grid_image_rows', 1)),
        cols: _.toNumber(_.get(image, 'grid_image_cols', 1)),
      })),
    }
  }

  private content(raw: TRawSchemaProjectContents[]): TSchemaProjectContents {
    return _.fromPairs(
      raw.map((slice) => {
        switch (slice.slice_type) {
          case 'bloco_full_image':
            return [slice.id, this.contentFullImage(slice)]
          case 'bloco_imagem_grid':
            return [slice.id, this.contentImageGrid(slice)]
          default:
            throw new Error(`Unknown project content slice type`)
        }
      }),
    )
  }

  public toMasonry(raw: TStoreFetcherProject): TMasonryContent<TStoreFetcherProject> {
    return {
      className: raw.thumbnailClass,
      link: `/project/${raw.slug}`,
      color: raw.thumbnailColor,
      metaData: raw,
    }
  }

  public toStore(raw: TRawSchemaProject): TStoreFetcherProject {
    if (!raw.data.company.length) throw new Error(`Project ${raw.id} has no company associated.`)

    return {
      status: 'loading',
      id: raw.id,
      slug: raw.uid,
      tags: raw.tags,
      date: new Date(_.get(raw, 'data.date', '')),
      name: _.presentsContent(_.get(raw, 'data.name')),
      role: _.get(raw, 'data.role', ''),
      logo: this.image.resize(_.get(raw, 'data.logo.url')),
      content: _.presentsContent(asHTML(_.get(raw, 'data.content'))),
      teamSize: _.get(raw, 'data.team_size', ''),
      logoColor: _.get(raw, 'data.logo_color', '#000000'),
      highlight: _.get(raw, 'data.highlight', false),
      thumbnailColor: _.get(raw, 'data.thumbnail_color', '#FFFFFF'),
      bannerName: _.get(raw, 'data.banner_name', ''),
      bannerClass: _.get(raw, 'data.banner_class', ''),
      description: _.presentsContent(_.get(raw, 'data.description')),
      technologies: raw.data.technologies.map(this.technologyMapper.toStore),
      thumbnailClass: _.get(raw, 'data.banner_class', ''),
      company: this.companyMapper.toStore(raw.data.company[0]),
      banner: this.image.resize(_.get(raw, 'data.banner.url')),
      thumbnail: this.image.resize(_.get(raw, 'data.thumbnail.url')),
      contents: this.content(raw.data.blocks),
      timeline: {
        end: new Date(_.get(raw, 'data.end_date', '')),
        start: new Date(_.get(raw, 'data.start_date', '')),
      },
    }
  }
}
